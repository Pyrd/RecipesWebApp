<template>
  <v-row justify-center align-center class>
    <v-col cols="12" md="6" class="fill-height d-none d-md-flex justify-center align-center py-8 px-16">
      <img style="height: 66%; width: 100%" src="~/assets/images/login.svg" alt="Login" />
    </v-col>
    <v-col cols="12" md="6" class="fill-height d-flex justify-center align-center login-background">
      <v-card width="400">
        <v-card-title class="text-h3 font-weight-black d-flex justify-center align-center">Recepies</v-card-title>
        <v-card-actions class="px-4">
          <v-form ref="form" v-model="formValid" lazy-validation class="d-flex justify-center align-center flex-column">
            <!-- :rules="[rules.required]" -->
            <v-text-field
              class="fwidth"
              solo
              v-model="email"
              :error="error"
              @change="resetErrors"
              :label="$t('login.email')"
            ></v-text-field>
            <v-text-field
              class="fwidth"
              solo
              v-model="password"
              :error="error"
              :error-messages="errorMessages"
              name="password"
              :label="$t('login.password')"
              type="password"
              :type="showPassword ? 'text' : 'password'"
              @change="resetErrors"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-alert
              class="mx-4 text-subtitle d-flex justify-end"
              v-if="displayConfirmationEmailActivator"
              border="left"
              colored-border
              type="info"
              elevation="2"
            >
              <div>Do you wish to resend a confirmation e-mail ?</div>
              <v-btn small color="success" @click="resendConfirmationEmail">Re-send</v-btn>
            </v-alert>
            <div class="d-flex flex-row justify-left align-center fwidth">
              <v-checkbox v-model="stay_logged_in"></v-checkbox>Rester connecté
            </div>

            <v-btn
              :loading="isLoading"
              :disabled="isSignInDisabled || !email || !password"
              block
              x-large
              color="primary"
              @click="submit"
              v-on:keyup.enter="submit"
              >{{ $t('login.button') }}</v-btn
            >
            <div class="mt-5">
              <router-link :to="localePath('/auth/forgot-password')">{{ $t('login.forgot') }}</router-link>
            </div>
          </v-form>
        </v-card-actions>
        <v-card-actions class="d-flex justify-center align-center">
          <div class="text-center mt-6">
            {{ $t('login.noaccount') }}
            <router-link :to="localePath('/auth/signup')" class="font-weight-bold">{{
              $t('login.create')
            }}</router-link>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
    <Keypress key-event="keyup" :key-code="13" @success="login" />
  </v-row>
</template>

<script>
export default {
  components: { Keypress: () => import('vue-keypress') },
  layout: 'empty',
  middleware: 'guest',

  mounted() {
    const query = this.$route.query.signupsuccess
    if (query) {
      this.$notifySuccess('🎉 Bienvenue sur Recepies 🎉')
    }
  },
  data: () => ({
    stay_logged_in: false,
    formValid: true,
    email: '',
    password: '',
    error: false,
    errorMessages: '',
    showPassword: false,
    isSignInDisabled: false,
    confirmationEmail: '',
    displayConfirmationEmailActivator: false,
    displayConfirmationEmailModal: false,
    isLoading: false,
    rules: {
      required: (value) => (value && Boolean(value)) || 'Required'
    }
  }),
  watch: {
    stay_logged_in(val, oldVal) {
      if (val) {
        this.$fire.auth.setPersistence(this.$fireModule.auth.Auth.Persistence.LOCAL)
      } else {
        this.$fire.auth.setPersistence(this.$fireModule.auth.Auth.Persistence.SESSION)
      }
    },
    loggedin(val, oldVal) {
      if (!val) {
        return
      }
      this.$router.push('/dashboard/analytics')
    }
  },
  computed: {
    loggedin() {
      return this.$store.getters['auth/isLoggedIn']
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isSignInDisabled = true
        await this.login(this.email, this.password)
        this.isLoading = false
        this.isSignInDisabled = false
      }
    },
    async signInWithGoogle() {
      var provider = new this.$fireModule.auth.GoogleAuthProvider()
      try {
        const authUser = await this.$fire.auth.signInWithPopup(provider)
      } catch (err) {
        console.log(err)
      }
    },
    resendConfirmationEmail() {
      this.$axios
        .$post(`api/user/sendconfirmationemail`, {
          email: this.email
        })
        .then(() => {
          this.$notifySuccess('Verification Email sent successfully')
        })
        .catch((err) => {
          this.$notifyError(`Error: ${err.message}`)
          return
        })
    },
    displayErrors(errorCode) {
      switch (errorCode) {
        case 'auth/wrong-password':
          this.handleBadPassword()
          break
        case 'auth/user-not-found':
          this.handleNotFound()
          break
        case 'auth/too-many-requests':
          this.handleToomanyRequests()
          break
        case 'auth/invalid-email':
          this.handleBadformat()
          break
        default:
          console.error(errorCode)
          this.$notifyError('Un problème est survenu !')
      }
    },
    async login(email, password) {
      try {
        const authUser = await this.$fire.auth.signInWithEmailAndPassword(email, password).catch((err) => {
          this.error = true
          this.displayErrors(err.code)
          this.password = ''
          return
        })
        // console.log(authUser)
        if (authUser && authUser.name == 'FirebaseError') {
          this.error = true
          this.displayErrors(authUser.code)
          this.password = ''
        }
      } catch (err) {
        console.error(err)
      }
    },
    resetErrors() {
      this.error = false
      this.errorMessages = ''

      this.errorProvider = false
      this.errorProviderMessages = ''
    },
    handleNotFound() {
      this.password = ''
      this.email = ''
      this.error = true
      this.errorMessages = 'Cette adresse e-mail est introuvable !'
    },
    handleToomanyRequests() {
      this.password = ''
      this.email = ''
      this.error = true
      this.errorMessages =
        'Vous avez tenté de vous connectez à de trop nombreuses reprises !\nVotre compte est temporairement bloqué ! Réessayer plus tard ou changez votre mot de passe !'
    },
    handleBadformat() {
      this.password = ''
      this.email = ''
      this.error = true
      this.errorMessages = "L'adresse e-mail est mal formattée"
    },
    handleBadPassword() {
      this.password = ''
      this.email = ''
      this.error = true
      this.errorMessages = 'Mot de passe incorrect'
    }
  }
}
</script>

<style scoped>
.login-background {
  background: rgb(2, 0, 36);
  /* background: linear-gradient(
        45deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(9, 121, 102, 1) 0%,
        rgba(0, 212, 255, 1) 100%
    ); */

  background: linear-gradient(45deg, rgba(2, 0, 36, 1) 0%, rgba(218, 1, 58, 1) 0%, rgba(0, 213, 255, 1) 100%);
}
</style>