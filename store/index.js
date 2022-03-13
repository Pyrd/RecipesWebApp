
export const actions = {
    async nuxtServerInit({ commit, dispatch
    }, { req, app, res }) {
        if (res && res.locals && res.locals.user) {
            const { allClaims: claims, ...authUser } = res.locals.user

            await dispatch('auth/onAuthStateChanged', {
                authUser,
                claims,
            })
        }
        commit('app/initCoreTheme', {
            context: app,
        })
    }
}