<template>
  <div class="centered flex-column fheight">
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">
        {{ $t('register.title') }}
      </v-card-title>
      <v-card-subtitle>
        Hi {{ displayName }} ! Please verify your email address by visiting the link below !
      </v-card-subtitle>

      <!-- sign up form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-btn :loading="isLoading" :disabled="isSignUpDisabled" block x-large color="primary" @click="submit"
            >Verify</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      {{ $t('register.account') }}
      <router-link :to="localePath('/auth/signin')" class="font-weight-bold">{{ $t('register.signin') }}</router-link>
    </div>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Sign Up Page Component
|---------------------------------------------------------------------
|
| Template for user sign up with external providers buttons
|
*/
export default {
  layout: 'empty',
  middleware: 'guest',
  async asyncData({ route, $axios, redirect }) {
    const token = route.query.token
    if (token == null) {
      console.error('Token')

      redirect('/auth/login')
    }
    const user = await $axios.$get(`/api/user/confirmed/${route.query.token}`).catch((err) => {
      console.error('Error: ' + err)
      redirect('/auth/login')
    })
    if (!user) {
      redirect('/auth/login')
    }
    return {
      email: user.email,
      token: token,
      displayName: user.displayname
    }
  },
  data() {
    return {
      user: {},
      // sign up buttons
      isLoading: false,
      isSignUpDisabled: false,

      // form
      token: '',
      isFormValid: true,
      email: '',
      password: '',

      // form error
      errorPassword: false,
      errorPasswordMessage: '',

      // show password field
      showPassword: false,

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isSignUpDisabled = true
        this.signUp(this.token, this.password)
      }
    },
    async signUp(token, password) {
      await this.$axios.post('/api/user/confirm-email', { token: token }).catch((err) => {
        this.$notifyError(`Error while confirming your inscription ! Error: ${err}`)
      })
      this.isLoading = false
      this.$router.replace('/auth/login')
    },
    signInProvider(provider) {},
    resetErrors() {
      this.errorName = false
      this.errorEmail = false
      this.errorPassword = false
      this.errorNameMessage = ''
      this.errorEmailMessage = ''
      this.errorPasswordMessage = ''

      this.errorProvider = false
      this.errorProviderMessages = ''
    }
  }
}
</script>
