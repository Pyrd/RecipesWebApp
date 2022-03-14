<template>
  <v-row justify-center align-center class>
    <v-col cols="12" class="fill-height d-flex justify-center align-center login-background">
      <v-card width="600px " class="pa-4">
        <v-card-title class="text-h4 font-weight-black centered">Bienvenue sur Recepies</v-card-title>
        <v-card-subtitle class="centered" style="color: black !important"
          >L'application qui va te simplifier la cuisine 👩‍🍳🔥</v-card-subtitle
        >
        <v-card-actions class="px-4 centered">
          <v-form
            ref="form"
            v-model="formValid"
            lazy-validation
            class="d-flex justify-center align-center flex-column fwidth"
          >
            <v-text-field
              class="fwidth"
              solo
              v-model="user.email"
              :rules="[rules.required, rules.isemail]"
              :error="error"
              @change="resetErrors"
              :label="$t('login.email')"
            ></v-text-field>
            <v-text-field
              class="fwidth"
              solo
              v-model="user.displayname"
              :error="error"
              @change="resetErrors"
              label="Nom d'affichage"
            ></v-text-field>
            <div class="fwidth d-flex align-start justify-center flex-column">
              <div class="text-title font-weight-bold">Genre</div>
              <v-radio-group v-model="user.gender" row>
                <v-radio label="Ne pas préciser" value="NONE"> </v-radio>
                <v-radio label="Homme" value="MALE">
                  <template v-slot:label>
                    <div>Homme ♂️</div>
                  </template>
                </v-radio>
                <v-radio label="Femmme" value="FEMALE">
                  <template v-slot:label>
                    <div>Femme ♀️</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>

            <v-text-field
              class="fwidth"
              solo
              v-model="user.password"
              :error="error"
              hide-details
              :label="$t('login.password')"
              :type="showPassword ? 'text' : 'password'"
              @change="resetErrors"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <div class="fwidth px-4 mt-2 d-flex" v-if="user.password">
              <div style="width: 80%">
                <password-meter :password="user.password" @score="onScore" />
              </div>
              <span class="ml-2 text-caption">{{ getPasswordStrengh }}</span>
            </div>
            <v-text-field
              class="fwidth mt-2"
              solo
              v-model="confirmpassword"
              :error="error"
              :error-messages="errorMessages"
              :hide-details="!error"
              label="Confirmation du mot de passe"
              :type="showConfirmationPassword ? 'text' : 'password'"
              @change="resetErrors"
              :append-icon="showConfirmationPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmationPassword = !showConfirmationPassword"
            ></v-text-field>
            <div v-if="user.password && confirmpassword" class="fwidth d-flex align-start justify-center mt-1">
              <span v-if="getPasswordMatching" class="success--text">Les mots de passe correspondent 👍</span>
              <span v-else class="error--text">❌ Les mots de passe ne correspondent pas </span>
            </div>
            <v-btn
              class="mt-4"
              :loading="isLoading"
              :disabled="
                isSignInDisabled ||
                !user.email ||
                !user.password ||
                !user.displayname ||
                !getPasswordMatching ||
                password_strength <= 2
              "
              block
              x-large
              color="primary"
              @click="submit"
              v-on:keyup.enter="submit"
              >S'incrire</v-btn
            >
          </v-form>
        </v-card-actions>
      </v-card>
    </v-col>
    <Keypress key-event="keyup" :key-code="13" @success="submit" />
  </v-row>
</template>

<script>
import passwordMeter from '~/components/common/PasswordStrengthMeter'
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export default {
  components: { Keypress: () => import('vue-keypress'), passwordMeter },
  layout: 'empty',
  middleware: 'guest',
  data: () => ({
    user: {
      email: '',
      password: '',
      displayname: '',
      gender: 'NONE'
    },
    formValid: true,
    password_strength: 0,
    confirmpassword: '',
    error: false,
    errorMessages: '',
    showPassword: false,
    showConfirmationPassword: false,
    isSignInDisabled: false,
    isLoading: false,
    rules: {
      required: (value) => (value && Boolean(value)) || 'Requis',
      isemail: (value) => (value && emailRegex.test(value)) || 'Format incorrect'
    }
  }),
  computed: {
    loggedin() {
      return this.$store.getters['auth/isLoggedIn']
    },
    getPasswordStrengh() {
      switch (this.password_strength) {
        case 0:
          return 'Risqué'
        case 1:
          return 'Devinable'
        case 2:
          return 'Faible'
        case 3:
          return 'Suffisant'
        case 4:
          return 'Sécurisé'
      }
    },
    getPasswordMatching() {
      return this.user.password == this.confirmpassword
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isSignInDisabled = true
        await this.signup(this.user)
        this.isLoading = false
        this.isSignInDisabled = false
      }
    },
    displayErrors(errorCode) {
      switch (errorCode) {
        // case 'auth/invalid-email':
        //   this.handleBadformat()
        //   break
        default:
          console.error(err)
          this.$notifyError('Un problème est survenu !')
      }
    },
    async signup(user) {
      // Checks

      // Preparing package
      const pkg = user
      // API Call
      try {
        const authUser = await this.$axios.$post('/api/user/signup', pkg).catch((err) => {
          console.error(err)
          return
        })
        if (authUser.name == 'FirebaseError') {
          this.error = true
          this.displayErrors(authUser.code)
          this.password = ''
        }
      } catch (err) {
        console.error(err)
      }
    },

    onScore({ score, strength }) {
      console.log(score) // from 0 to 4
      console.log(strength) // one of : 'risky', 'guessable', 'weak', 'safe' , 'secure'
      this.password_strength = score
    },
    resetErrors() {
      this.error = false
      this.errorMessages = ''

      this.errorProvider = false
      this.errorProviderMessages = ''
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

.bar {
  width: 100%;
  color: white;
  border-radius: 10px;
}

.bar-strong {
  background-color: green;
}
.bar-medium {
  background-color: orange;
}
.bar-weak {
  background-color: red;
}
</style>