import pkg from '~/package.json'
import configs from '../configs'

let vuetify = null

const { time, theme, currencies } = configs

const { currency, availableCurrencies } = currencies

let context;
export const state = () => ({
  version: pkg.version,
  drawer: true,
  time,
  currency,
  availableCurrencies,
  theme,
  color: theme.light.primary,
  toast: {
    show: false,
    color: 'black',
    message: '',
    timeout: 3000
  }
})

export const getters = {
  getVersion: state => state.version,
  getDrawer: state => state.drawer,

}

export const mutations = {
  setDrawer(state, drawer) {
    state.drawer = drawer
  },
  setTheme: (state, theme) => {
    // this.$vuetify.framework.theme.dark = theme === 'dark'
    // console.log("SetTheme", "state=", state.theme, " - theme: ", theme, JSON.stringify(context.$vuetify.theme.dark));
    state.theme = theme
    context.$vuetify.theme.dark = theme == 'dark'
  },
  setColor: (state, color) => {
    // this.$vuetify.framework.theme.dark = theme === 'dark'
    state.color = color
    context.$vuetify.theme.themes.dark.primary = color
    context.$vuetify.theme.themes.light.primary = color
  },

  setTimeZone: (state, zone) => {
    state.time.zone = zone
  },
  setTimeFormat: (state, format) => {
    state.time.format = format
  },
  setCurrency: (state, currency) => {
    state.currency = currency
  },
  showToast: (state, toast) => {
    const { color, timeout, message } = toast

    state.toast = {
      message,
      color,
      timeout,
      show: true
    }
  },
  hideToast: (state) => {
    state.toast.show = false
  },
  resetToast: (state) => {
    state.toast = {
      show: false,
      color: 'black',
      message: '',
      timeout: 3000
    }
  },
  initTheme(state, payload) {
    // console.log("[initTheme] start")

    context = payload.context
    // context.$vuetify.theme.dark = state.theme == 'dark'
    // context.$vuetify.theme.themes.dark.primary = state.color
    // context.$vuetify.theme.themes.light.primary = state.color


    // payload.context.$vuetify.theme.dark = state.theme == 'dark'
    // console.log("[initTheme] state theme", state.theme == 'dark')
    // console.log("[initTheme] state color", state.color)
  },
  initCoreTheme(state, payload) {
    // console.log("[initCoreTheme] start")
    state.drawer = true
    // vuetify = payload.context.vuetify;
    // let app = payload.context
    // vuetify.preset.theme.themes.light.primary = state.color
    // vuetify.preset.theme.themes.dark.primary = state.color
    // console.log("1.", vuetify.preset.theme.themes.light.primary);

    // console.log("2.", vuetify.userPreset.theme.themes.light.primary);
    // vuetify.userPreset.theme.themes.light.primary = state.color
    // vuetify.userPreset.theme.themes.dark.primary = state.color
    // console.log("2.", vuetify.userPreset.theme.themes.light.primary);

    // console.log("3.", vuetify.framework.theme.themes.light.primary);
    // vuetify.framework.theme.themes.light.primary = state.color
    // vuetify.framework.theme.themes.dark.primary = state.color
    // console.log("3.", vuetify.framework.theme.themes.light.primary);
  }
}