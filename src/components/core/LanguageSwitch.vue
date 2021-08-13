<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <nuxt-link
        class="nuxt-link"
        :to="switchLocalePath(availableLocales.code)"
      >
        <span v-bind="attrs" v-on="on" class="subtitle text-uppercase">{{
          currentLocale.code
        }}</span>
      </nuxt-link>
    </template>
    <span>{{ $t('language-switch-tooltip') }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class LanguageSwitch extends Vue {
  get currentLocale() {
    return this._i18n.locales.filter(
      (i: any) => i.code === this.$i18n.locale
    )[0]
  }

  get availableLocales() {
    return this._i18n.locales.filter(
      (i: any) => i.code !== this.$i18n.locale
    )[0]
  }
}
</script>
