<template>
  <!-- <v-img
    :src="require('~/assets/svgs/logos/logo_light_normal.svg')"
    v-if="getTheme === true"
    alt="logo"
  />
  <v-img
    :src="require('~/assets/svgs/logos/logo_dark_normal.svg')"
    alt="logo in dark"
    v-else
  /> -->
  <div>Logo</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

import ThemeSwitch from '~/components/core/ThemeSwitch.vue'

@Component({})
export default class Logo extends Vue {
  get getTheme() {
    let theme = this.$store.getters['modules/theme/isLight']()
    console.log(`[getTheme] ${theme} ${typeof theme}`)
    return theme
  }
}
</script>
