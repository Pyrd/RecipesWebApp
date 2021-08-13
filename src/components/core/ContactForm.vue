<template>
  <v-form ref="form" v-model="valid">
    <v-row>
      <v-col cols="12" md="6"
        ><v-text-field
          v-model="formData.firstname"
          :counter="10"
          :rules="firstNameRules"
          :label="$t('contactpage-contactform-firstname')"
          required
          outlined
        ></v-text-field
      ></v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="formData.lastname"
          :counter="10"
          :rules="lastNameRules"
          :label="$t('contactpage-contactform-lastname')"
          required
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="formData.email"
          :rules="emailRules"
          :label="$t('contactpage-contactform-email')"
          required
          outlined
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          auto-grow
          clearable
          clear-icon="mdi-close-circle"
          counter
          :rules="bodyRules"
          outlined
          :label="$t('contactpage-contactform-message')"
          v-model="formData.data"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-select
          outlined
          v-model="formData.reason"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          :label="$t('contactpage-contactform-reason')"
          required
        ></v-select>
      </v-col>
    </v-row>

    <recaptcha
      class="recaptcha"
      @error="onError"
      @success="onSuccess"
      @expired="onExpired"
    />
    <v-row justify="space-between">
      <v-col class="px-4" cols="12" sm="3">
        <v-btn
          block
          outlined
          color="error"
          class="mr-4"
          :disabled="!hasTyped"
          @click.native="reset()"
        >
          {{ $t('contactpage-contactform-cancel') }}
        </v-btn></v-col
      >
      <v-col class="px-4" cols="12" sm="3">
        <v-btn
          block
          outlined
          color="success"
          class="mr-4"
          :disabled="!valid || !formData.robot"
          @click.native="send()"
        >
          {{ $t('contactpage-contactform-send') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { sendContactMessage } from '~/services/api'
@Component({})
export default class ContactForm extends Vue {
  valid = false
  isSending = false
  formData = {
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    reason: undefined,
    data: undefined,
    robot: false,
  }
  firstNameRules = [
    (v: string) =>
      !!v || this.$t('contactpage-contactform-firstname-rule-required'),
    (v: string) =>
      (v && v.length <= 10) ||
      this.$t('contactpage-contactform-firstname-rule-length'),
  ]
  lastNameRules = [
    (v: string) =>
      !!v || this.$t('contactpage-contactform-lastname-rule-required'),
    (v: string) =>
      (v && v.length <= 10) ||
      this.$t('contactpage-contactform-lastname-rule-length'),
  ]
  emailRules = [
    (v: string) =>
      !!v || this.$t('contactpage-contactform-email-rule-required'),
    (v: string) =>
      /.+@.+\..+/.test(v) ||
      this.$t('contactpage-contactform-email-rule-length'),
  ]
  bodyRules = [
    (v: string) => !!v || this.$t('contactpage-contactform-body-rule-required'),
    (v: string) =>
      (v && v.length <= 500) ||
      this.$t('contactpage-contactform-body-rule-length'),
  ]
  get items() {
    return [
      this.$t('contactpage-contactform-reason-chat'),
      this.$t('contactpage-contactform-reason-improvement'),
      this.$t('contactpage-contactform-reason-hiring'),
    ]
  }

  get hasTyped() {
    return (
      this.formData.firstname ||
      this.formData.lastname ||
      this.formData.email ||
      this.formData.reason ||
      this.formData.data
    )
  }

  async send() {
    if (this.valid && this.formData.robot) {
      this.isSending = true

      this.$notifyInfo(this.$t('contactpage-contactform-message-sending'))
      try {
        setTimeout(() => {
          if (this.isSending) {
            this.$notifyInfo(this.$t('contactpage-contactform-message-sleep1'))
            setTimeout(() => {
              if (this.isSending) {
                this.$notifyInfo(
                  this.$t('contactpage-contactform-message-sleep2')
                )
              }
            }, 5000)
          }
        }, 5000)
        await sendContactMessage({
          firstname: this.formData.firstname || 'error',
          lastname: this.formData.lastname || 'error',
          origin: this.formData.email || 'error',
          reason: this.formData.reason || 'error',
          body: this.formData.data || 'error',
        })
      } catch (err) {
        this.$notifyError(this.$t('contactpage-contactform-message-error'))
        return
      } finally {
        this.isSending = false
      }
      this.$notifySuccess(this.$t('contactpage-contactform-message-success'))
      await this.reset()
    }
  }
  async reset() {
    const form: any = this.$refs.form
    form.reset()
    await this.$recaptcha.reset()
    this.formData.robot = false
  }

  onError(error: any) {
    console.log('Error happened:', error)
    this.formData.robot = false
  }
  async onSubmit() {
    try {
      const token = await this.$recaptcha.getResponse()
      await this.$recaptcha.reset()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login error:', error)
      this.formData.robot = false
    }
  }
  onSuccess(token: any) {
    this.formData.robot = true
  }
  onExpired() {
    console.log('Expired')
    this.formData.robot = false
  }
}
</script>
<style lang="scss" scoped>
.recaptcha {
  height: 100px;
}
</style>
