<template>
    <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title @click="goTo('/')">Receipes</v-toolbar-title>
        <span
            class="ml-2 mt-1 py-1 px-2 font-weight-medium items-center d-inline-flex rounded-pill white--text primary version"
            v-font="$getFont('DM Mono', 400)"
        >{{ version }}</span>

        <v-spacer></v-spacer>

        <v-menu bottom offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
                <v-avatar color="primary" size="56" v-bind="attrs" v-on="on">
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
            </template>

            <v-list>
                <v-list-item
                    v-for="(item, i) in navigation"
                    :key="i"
                    @click="navigationReducer(item)"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => {
        return {
            navigation: [
                { title: 'Profile', action: 'goto', data: '/profile' },
                { title: 'Sign out', action: 'signout', data: '' },
            ],
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

        },
        goTo(path) {
            this.$router.push(path)
        },
        signOut() {
            console.log("Good bye :)")
            this.$auth.logout()
        },
        navigationReducer(e) {
            switch (e.action) {
                case 'goto':
                    this.goTo(e.data)
                    break
                case 'signout':
                    this.signOut()
                    break
            }
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