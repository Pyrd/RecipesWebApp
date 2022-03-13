

export const state = () => ({
  user: null,
  authUser: null,
  authLoading: true
})

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.authUser !== null
    } catch {
      return false
    }
  },
  getUser: (state) => state.authUser,
  getMe: (state) => state.user,
  getRole: (state) => state.authUser?.role,
  getLoading: (state) => state.authLoading
}

export const mutations = {
  RESET_USER: (state) => {
    // console.log('reset')
    state.authUser = null;
  },

  SET_AUTH_USER: (state, authUser) => {
    // console.log('set user')
    state.authLoading = false
    state.authUser = {}
    state.authUser = { uid: authUser.uid, email: authUser.email, role: authUser.role, token: authUser.idToken }
  },
  SET_USER: (state, user) => {
    // console.log('set user')
    state.user = user
  },
}


export const actions = {
  async onAuthStateChanged({ commit }, { authUser, claims }) {
    // console.log("onAuthStateChanged", authUser)


    if (authUser) {
      try {
        // console.log(`onAuthStateChanged ${authUser.idToken}`)
        // const me = await API_GetMe(authUser.idToken ? authUser.idToken : undefined)
        const me = { role: 'ADMIN', }
        authUser.role = me.role
        commit('SET_USER', me)
      } catch (err) {
        console.error("Failed to fetch user data")
      }
      commit('SET_AUTH_USER', authUser)
    } else {
      commit('RESET_USER')
    }
  },

  async disconnect({ commit }) {
    commit('RESET_USER')
  }
}