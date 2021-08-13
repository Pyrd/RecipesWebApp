import { Themes } from '~/shared/themes'
import { CURRENT_THEME } from '~/shared/localstorage'

import {
  VuexModule,
  Module,
  action,
  getter,
  mutation,
} from 'vuex-class-component'

const themeSwitcher = (theme: Themes, vm: any) => {
  vm.$vuetify.theme.dark = theme === Themes.DARK
}

@Module({ namespacedPath: 'modules/theme/', target: 'nuxt' })
export class ThemeModule extends VuexModule {
  @getter isLight: boolean = true

  @mutation
  SET_THEME(payload: { name: Themes; vm: any }) {
    this.isLight = payload.name === Themes.LIGHT
    themeSwitcher(payload.name, payload.vm)
    payload.vm.$cookies.set(CURRENT_THEME, payload.name, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
    })
  }

  @action()
  setTheme(payload: any) {
    console.log(`[setTheme] ${payload.theme}`)
    this.SET_THEME({
      name: payload.theme,
      vm: payload.vm,
    })
  }

  @action()
  async initTheme(payload: any) {
    let storedTheme: any = payload.context.$cookies.get(CURRENT_THEME)
    if (!storedTheme || storedTheme.length == 0) {
      console.log(`initTheme: applying default theme`)
      storedTheme = `${Themes.LIGHT}` // Default
    } else {
      console.log(`initTheme: fetching store theme : ${storedTheme}`)
    }
    const new_payload = {
      name: storedTheme,
      vm: payload.context,
    }
    this.SET_THEME(new_payload)
  }
}

export default ThemeModule.ExtractVuexModule(ThemeModule)
