import pkg from '~/package.json'
import configs from '../configs'

const { time, theme, currencies } = configs

const { currency, availableCurrencies } = currencies
export const state = () => ({
  version: pkg.version,
  drawer: false,

  time,

  // currency
  currency,
  availableCurrencies,

  // themes and layout configurations
  theme,
})

export const getters = {
  getVersion: state => state.version,
  getDrawer: state => state.drawer,

}

export const mutations = {
  setDrawer(state, drawer) {
    state.drawer = drawer
  },
  setGlobalTheme: (state, theme) => {
    this.$vuetify.framework.theme.dark = theme === 'dark'
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

}
