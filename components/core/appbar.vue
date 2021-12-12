<template>
    <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Receipes</v-toolbar-title>
        <span
            class="ml-2 mt-1 py-1 px-2 font-weight-medium items-center d-inline-flex rounded-pill white--text primary version"
            v-font="$getFont('DM Mono', 400)"
        >{{ version }}</span>

        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-filter</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => {
        return {
        }
    },
    computed: {
        ...mapGetters({
            version: 'app/getVersion',
            drawer: 'app/getDrawer'
        })
    },
    methods: {
        toggleDrawer() {
            this.$store.commit('app/setDrawer', !this.drawer)

        }
    }
}
</script>

<style scoped>
.version {
    font-size: 0.75rem;
    line-height: 0.8rem;
}
</style>