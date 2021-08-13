export const state = () => ({
  authUser: null,
})

export const getters = {
  isLoggedIn: (state: any) => {
    console.log('isLoggedIn', state.authUser !== null)
    try {
      return state.authUser !== null
    } catch {
      return false
    }
  },
  getUser: (state: any) => state.authUser,
}

export const mutations = {
  RESET_STORE: (state: any) => {
    console.log('reset')
    Object.assign(state, {})
  },

  SET_AUTH_USER: (state: any, authUser: any) => {
    console.log('set user')
    state.authUser = {}
    state.authUser = { uid: authUser.uid, email: authUser.email }
  },
}

export const actions = {
  async onAuthStateChanged({ commit }: any, { authUser, claims }: any) {
    if (authUser) {
      commit('SET_AUTH_USER', authUser)
    } else {
      commit('RESET_STORE')
    }
  },

  // async setUser({ commit }: any, { authUser, claims }: any) {
  //   if (authUser) {
  //     commit('SET_AUTH_USER', authUser)
  //   } else {
  //     commit('RESET_STORE')
  //   }
  // },
}
