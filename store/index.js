import { inspect } from 'util' // or directly
export const actions = {
    async nuxtServerInit({ commit, }, { req, app }) {
        const cookies = req.headers.cookie?.split(';')
        if (cookies) {
            console.log(">>>cookie>>>", cookies)
        }
        // if (cookies) {
        //     const jwt = cookies.find(() => "jwt")
        //     if (jwt) {
        //         // console.log(`Jwt found: ${jwt}`)
        //         dispatch('auth/initUser')
        //     }
        // }
        // console.log("ABC:", inspect(app.vuetify))
        // console.log("1.", app.vuetify.preset.theme.themes.light.primary);
        // app.vuetify.preset.theme.themes.light.primary = "#6F42C0"
        // app.vuetify.preset.theme.themes.dark.primary = "#6F42C0"
        // console.log("1.", app.vuetify.preset.theme.themes.light.primary);

        // console.log("2.", app.vuetify.userPreset.theme.themes.light.primary);
        // app.vuetify.userPreset.theme.themes.light.primary = "#6F42C0"
        // app.vuetify.userPreset.theme.themes.dark.primary = "#6F42C0"
        // console.log("2.", app.vuetify.userPreset.theme.themes.light.primary); console.log("3.", app.vuetify.framework.theme.themes.light.primary);
        // app.vuetify.framework.theme.themes.light.primary = "#6F42C0"
        // app.vuetify.framework.theme.themes.dark.primary = "#6F42C0"
        // console.log("3.", app.vuetify.framework.theme.themes.light.primary);

        commit('app/initCoreTheme', {
            context: app,
        })

    }
}