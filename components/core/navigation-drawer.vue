<template>
    <v-navigation-drawer v-model="drawer" app clipped>
        <v-list nav dense>
            <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                <v-list-item>
                    <v-list-item-title>Foo</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>Bar</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>Fizz</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>Buzz</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        group: null,
    }),
    computed: {
        // ...mapGetters({
        //     drawer: 'app/getDrawer'
        // }),
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
}
</script>