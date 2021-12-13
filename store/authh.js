import pkg from '~/package.json'

export const state = () => ({
    user: null,
    jwt: false,
})

export const getters = {
    isAuth: state => state.jwt,
    getUser: state => state.user

}

export const mutations = {
    setUser(state, user) {
        console.log("Setting user")
        state.user = user
    },
    setJWT(state) {
        console.log("Setting JWT")
        state.jwt = true
    }

}
export const actions = {
    async initUser({ commit }) {
        console.log("Init user !")
        const user = await this.$axios.$get('user/me');
        commit('setJWT', true)
        console.log(`USER ${JSON.stringify(user)}`)

        commit('setUser', user)

    },
}
