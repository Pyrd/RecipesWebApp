import { API_GetMe } from '../services/apis/user.api'

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
    console.log('set user', JSON.stringify(user))
    state.user = user
  },
}


export const actions = {
  async onAuthStateChanged({ commit }, { authUser, claims }) {
    authUser = JSON.parse(JSON.stringify(authUser))
    let token = null
    if (authUser && authUser.idToken != null) {
      token = authUser.idToken

    } else if (authUser && authUser.stsTokenManager) {
      token = authUser.stsTokenManager.accessToken

    }
    if (token) {
      try {
        const me = await API_GetMe(token)
        authUser.role = me.role
        commit('SET_USER', me)
      } catch (err) {
        console.error("Failed to fetch user data:", err)
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