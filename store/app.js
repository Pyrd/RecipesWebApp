import pkg from '~/package.json'
import configs from '../configs'

let vuetify = null

const { time, theme, currencies } = configs

const { currency, availableCurrencies } = currencies
export const state = () => ({
  version: pkg.version,
  drawer: false,
  time,
  currency,
  availableCurrencies,
  theme,
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
    state.theme = theme
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
    console.log("STORE", state, "keys=", payload)
    payload.context.$vuetify.theme.dark = state.theme == 'dark'
    // vuetify.theme.dark = state.theme == 'dark'

  }
}