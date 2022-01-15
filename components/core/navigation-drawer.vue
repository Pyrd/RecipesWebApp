<template>
    <v-navigation-drawer v-model="drawer" app clipped>
        <v-list nav dense>
            <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
                <v-list-item
                    v-for="(nav, i) in getNavigation"
                    :key="'nav' + i"
                    link
                    @click="goTo(nav.to)"
                >
                    <!-- <v-list-item-icon>

                    </v-list-item-icon>
                    <v-list-item-title>{{ nav.title }}</v-list-item-title>-->
                    <v-list-item-icon class="mr-4">
                        <client-only>
                            <unicon :name="nav.icon" fill></unicon>
                        </client-only>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="line-height: 1.125rem;" class="centered">
                            <span>{{ nav.title }}</span>
                            <v-spacer></v-spacer>
                            <v-chip class x-small v-if="nav.role" color="primary">{{ nav.role }}</v-chip>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    v-if="$auth.user.role == 'ADMIN'"
                    v-for="(nav, i) in getAdmin"
                    :key="'admin' + i"
                    link
                    @click="goTo(nav.to)"
                >
                    <v-list-item-icon class="mr-4">
                        <client-only>
                            <unicon :name="nav.icon" fill></unicon>
                        </client-only>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="line-height: 1.125rem;" class="centered">
                            <span>{{ nav.title }}</span>
                            <v-spacer></v-spacer>
                            <v-chip class x-small color="primary">Admin</v-chip>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import navigation from '~/configs/navigation'
export default {
    data: () => ({
        group: null,
        navigation: [
            { title: "Dashboard", icon: 'dashboard', to: "/dashboard/analytics", },
            { title: "Users", icon: 'tachometer-fast-alt', to: "/users", role: "ADMIN" }
        ]
    }),
    computed: {
        // ...mapGetters({
        //     drawer: 'app/getDrawer'
        // }),
        getNavigation() {
            return navigation.menu
        },
        getAdmin() {
            return navigation.admin
        },
        drawer: {
            get() {
                return this.$store.getters['app/getDrawer']
            },
            set(value) {
                this.$store.commit('app/setDrawer', value)
            }
        }
    },
    watch: {
        group() {
            this.$store.commit('app/setDrawer', false)
        },
    },
    methods: {
        goTo(path) {
            this.$router.push(path)
        }
    }
}
</script>