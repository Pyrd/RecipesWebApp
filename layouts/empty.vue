<template>
    <v-app v-font="$getFont('Poppins', 300)">
        <Nuxt />
    </v-app>
</template>


<script>
import { mapState, mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations({
            initTheme: 'app/initTheme'
        }),
    },
    computed: {
        ...mapState('app', {
            theme: state => state.theme,
            color: state => state.color
        }),
    },
    mounted() {
        console.log("[EMPTY] Mounted ")
        // this.initTheme({
        //     context: this,
        // },
        // )
        console.log("Empty: mounted => ", this.theme, this.color)
        this.$vuetify.theme.dark = this.theme == 'dark'
        this.$vuetify.theme.themes.light.primary = this.color
        this.$vuetify.theme.themes.dark.primary = this.color
    },
    beforeMount() {
        console.log("[EMPTY] BeforeMount ")
        console.log("V: BeforeMount => ", this.$vuetify.theme.themes.light.primary, this.$vuetify.theme.themes.dark.primary)
        // this.initTheme({
        //     context: this,
        // },
        // )
        console.log("Empty: BeforeMount => ", this.theme, this.color)

        this.$vuetify.theme.dark = this.theme == 'dark'
        this.$vuetify.theme.themes.light.primary = this.color
        this.$vuetify.theme.themes.dark.primary = this.color
    },
    created() {
        console.log("[EMPTY] Created ")
        this.$vuetify.theme.themes.light.primary = this.color
        this.$vuetify.theme.themes.dark.primary = this.color
        console.log("V: Created => ", this.$vuetify.theme.themes.light.primary, this.$vuetify.theme.themes.dark.primary)
        console.log("Empty: Created => ", this.theme, this.color)

        this.initTheme({
            context: this,
        },
        )
        console.log("V: Created => ", this.$vuetify.theme.themes.light.primary, this.$vuetify.theme.themes.dark.primary)
        console.log("Empty: Created => ", this.theme, this.color)
        this.$vuetify.theme.dark = this.theme == 'dark'
        this.$vuetify.theme.themes.light.primary = this.color
        this.$vuetify.theme.themes.dark.primary = this.color
    }
}
</script>
