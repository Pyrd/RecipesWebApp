<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        @click="changeTheme"
        :class="getBtnClass"
        icon
        :aria-label="$t('theme-switch-label')"
      >
        <v-icon>{{ getIcon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ getToolTipText }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

import { Themes } from '~/shared/themes'
import { mdiWhiteBalanceSunny, mdiWeatherNight } from '@mdi/js'
@Component({})
export default class ThemeSwitch extends Vue {
  get getToolTipText() {
    return this.theme
      ? this.$t('theme-switch-tooltip-day')
      : this.$t('theme-switch-tooltip-night')
  }

  get getIcon() {
    return this.theme == true ? mdiWhiteBalanceSunny : mdiWeatherNight
  }

  get theme() {
    // console.log(`[theme] ${this.$store.getters['modules/theme/isLight']()}`)
    return this.$store.getters['modules/theme/isLight']()
  }

  get getBtnClass() {
    return this.theme == true ? 'day' : ''
  }

  changeTheme() {
    this.$store.dispatch('modules/theme/setTheme', {
      payload: {
        theme: this.theme ? Themes.DARK : Themes.LIGHT,
        vm: this,
      },
    })
  }
}
</script>

<style lang="scss" scoped>
.day {
  color: #ffac33 !important;
}
</style>
