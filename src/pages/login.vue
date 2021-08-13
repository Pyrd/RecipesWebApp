<template>
  <div class="login-wrapper d-flex align-center justify-center">
    <v-card
      outlined
      class="sign-in-card d-flex flex-column align-center justify-center"
    >
      <v-card-title class="headline"> Sign In </v-card-title>
      <v-card-actions>
        <v-form ref="loginform" v-model="valid">
          <v-row>
            <v-text-field
              label="Email"
              v-model="login.email"
              :rules="emailRules"
              type="email"
              outlined
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              label="Password"
              :rules="pwdRules"
              v-model="login.password"
              outlined
              :append-icon="showPwd ? eyeIcon : eyeCloseIcon"
              :type="showPwd ? 'text' : 'password'"
              @click:append="showPwd = !showPwd"
            ></v-text-field>
          </v-row>

          <v-row align="center" justify="end">
            <nuxt-link :to="localePath('/forgotpassword')"
              >Forgot password ?</nuxt-link
            >
          </v-row>
          <v-row align="center" justify="start">
            <v-checkbox v-model="stayConnected"></v-checkbox
            ><span>Stay connected</span>
          </v-row>
          <v-row class="mt-4" align="center" justify="center">
            <v-btn
              rounded
              block
              color="success"
              @click="signInWithEmailPassword"
              :disabled="!valid"
              >Login</v-btn
            >
          </v-row>
        </v-form>
      </v-card-actions>
      <v-card-actions> </v-card-actions>
      <v-row align="center" class="sign-in-divider">
        <v-divider></v-divider><span class="mx-4">Or sign-in with Google</span
        ><v-divider></v-divider>
      </v-row>
      <v-card-actions>
        <v-btn @click="signInWithGoogle" color="primary" class="ma-2" outlined>
          <!-- <v-img :src="require('~/assets/svgs/search.svg')" alt="logo" /> -->
          Sign in with Google
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-row align="center" justify="center">
          <span
            >Don't have an account ?
            <nuxt-link :to="localePath('/signup')">Sign up</nuxt-link></span
          >
        </v-row>
      </v-card-actions>
    </v-card>
    <!-- <Particles> </Particles> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { isEmail } from '~/shared/utils'
import { mdiEye, mdiEyeOff } from '@mdi/js'
@Component({ components: {}, layout: 'unauthentified' })
export default class Login extends Vue {
  private login = {
    email: '',
    password: '',
  }
  private valid = false
  private showPwd = false
  eyeIcon = mdiEye
  eyeCloseIcon = mdiEyeOff
  emailRules = [
    (value: string): string | boolean => !!value || 'Required.',
    (value: string): string | boolean =>
      (value && isEmail(value)) || 'Must be a valid email address',
  ]
  pwdRules = [(value: string): string | boolean => !!value || 'Required.']

  stayConnected = false

  @Watch('stayConnected')
  handleStayConnected(val: boolean, oldVal: boolean) {
    if (val) {
      this.$fire.auth.setPersistence(
        this.$fireModule.auth.Auth.Persistence.LOCAL
      )
    } else {
      this.$fire.auth.setPersistence(
        this.$fireModule.auth.Auth.Persistence.SESSION
      )
    }
  }

  signInSuccess() {
    console.log('signInSuccess')
    this.$router.push({
      path: this.localePath('/'),
    })
  }

  async signInWithGoogle() {
    var provider = new this.$fireModule.auth.GoogleAuthProvider()
    // You can add or remove more scopes here provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    try {
      const authUser = await this.$fire.auth.signInWithPopup(provider)
      console.log('signInWithGoogle')
    } catch (err) {
      console.log(err)
    }
  }

  async signInWithEmailPassword() {
    try {
      const authUser = await this.$fire.auth.signInWithEmailAndPassword(
        this.login.email,
        this.login.password
      )
      console.log('signInWithGoogle')
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
<style lang="scss" scoped></style>
<style scoped>
.sign-in-divider {
  width: 80%;
}

.sign-in-card {
  z-index: 3;
  padding: 2em;
  min-width: 33vw;
}

.login-img-wrapper {
  width: 80%;
  margin: auto;
}

.login-wrapper {
  height: 100%;
}

.login-background {
  position: absolute;
  height: 100%;
  width: 100%;
}
.login-image {
  height: 100vh;
  width: 100%;
  background: var(--v-primary-base);
}
</style>
