<template>
  <div class="reset-pwd-background fill-height fill-width centered">
    <v-card class="text-center mx-4">
      <v-card-title class="justify-center display-1 mb-2">{{ $t('forgot.title') }}</v-card-title>
      <v-card-subtitle>{{ $t('forgot.subtitle') }}</v-card-subtitle>

      <!-- reset form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" @submit.prevent="submit">
          <v-text-field
            v-model="email"
            :validate-on-blur="false"
            :error="error"
            :error-messages="errorMessages"
            :label="$t('forgot.email')"
            name="email"
            outlined
            @change="resetErrors"
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="!email || email.length == 0"
            block
            x-large
            color="primary"
            @click="submit"
          >{{ $t('forgot.button') }}</v-btn>
        </v-form>
      </v-card-text>
      <v-card-text class="mt-0">
        <div class="text-center">
          <router-link :to="localePath('/auth/login')">{{ $t('forgot.backtosign') }}</router-link>
        </div>
      </v-card-text>
    </v-card>
    <Keypress key-event="keyup" :key-code="13" @success="submit" />
    <!-- 
    <div class="text-center mt-6">
      <router-link :to="localePath('/auth/login')">{{ $t('forgot.backtosign') }}</router-link>
    </div>-->
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Forgot Page Component
|---------------------------------------------------------------------
|
| Template to send email to remember/replace password
|
*/
export default {
  components: { Keypress: () => import('vue-keypress') },
  layout: 'empty',
  auth: 'guest',
  data() {
    return {
      // reset button
      isLoading: false,

      // form
      isFormValid: true,
      email: '',

      // form error
      error: false,
      errorMessages: '',

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  methods: {
    async submit(e) {
      if (this.email && this.email.length > 0 && !this.isLoading) {
        this.isLoading = true
        await this.resetEmail(this.email)
        this.isLoading = false

      }
    },
    async resetEmail(email) {
      console.log("Before")
      const resp = await this.$axios.$post('/api/user/resetpassword', { email }).catch(err => {
        if (err.message == "ERROR.USER_NOT_CONFIRMED") {
          this.$notifyError("Email not confirmed, check your emails")
        } else {
          this.$notifyError(`Error: ${err}`)
        }
      })
      this.email = ""
      this.$notifySuccess('If your e-mail is valid, you should received an e-mail to reset your password !')
    },
    resetErrors() {
      this.error = false
      this.errorMessages = ''
    }
  }
}
</script>

<style lang="scss">
.reset-pwd-background {
  background: linear-gradient(
    45deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(218, 1, 58, 1) 0%,
    rgba(0, 213, 255, 1) 100%
  );
}
</style>