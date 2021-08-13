<template>
  <div v-if="!isLoggedIn">
    <nuxt-link :to="localePath('login')">Login</nuxt-link>
  </div>
  <div v-else>
    <v-btn @click="disconnectUser" text>Log out</v-btn>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class LoginSwitch extends Vue {
  get isLoggedIn() {
    console.log(this.$store.getters['modules/auth/isLoggedIn'])
    return this.$store.getters['modules/auth/isLoggedIn']
  }

  async disconnectUser() {
    console.log('Disconnect')
    await this.$fire.auth.signOut()
  }
}
</script>
<style lang="scss" scoped></style>
