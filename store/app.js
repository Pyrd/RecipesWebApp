import pkg from '~/package.json'

export const state = () => ({
  version: pkg.version,
  drawer: false
})

export const getters = {
  getVersion: state => state.version,
  getDrawer: state => state.drawer,

}

export const mutations = {
  setDrawer(state, drawer) {
    state.drawer = drawer
  }
}
