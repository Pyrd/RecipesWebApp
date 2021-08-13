<template>
  <div>Forgot password</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class ForgotPassword extends Vue {
  // layout() {
  //   return 'unauthentified'
  // }

  middleware() {
    return ['unauthentified']
  }
}
</script>
<style lang="scss" scoped></style>
