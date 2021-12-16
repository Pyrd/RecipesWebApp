<template>
    <div class="my-2">
        <v-card>
            <!-- <v-card-title class="d-flex align-center py-1 mt-2 text-h6 font-weight-black">
                <client-only>
                    <unicon class="d-flex align-center mr-2" name="setting" fill></unicon>
                </client-only>Settings
            </v-card-title>-->
            <div class="d-flex align-center pa-2">
                <client-only>
                    <unicon
                        class="d-flex align-center mr-2"
                        name="setting"
                        fill="--v-contrast-base"
                    ></unicon>
                </client-only>
                <div class="title">Settings</div>
            </div>

            <v-divider></v-divider>
            <v-card-text>
                <v-list dense>
                    <v-list-item>
                        <v-list-item-content class="font-weight-medium">Choice of currency</v-list-item-content>
                        <v-list-item-action>
                            <Currency />
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>Language</v-list-item-content>
                        <v-list-item-action>
                            <Language />
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>Time Format</v-list-item-content>
                        <v-list-item-action>
                            <v-menu offset-y left transition="slide-y-transition">
                                <template v-slot:activator="{ on }">
                                    <v-btn text v-on="on">{{ (new Date()) | formatDate }}</v-btn>
                                </template>
                                <v-list dense nav>
                                    <v-list-item
                                        v-for="format in availableFormats"
                                        :key="format.format"
                                        @click="setTimeFormat(format.format)"
                                    >
                                        <v-list-item-title>{{ format.label }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>Theme</v-list-item-content>
                        <v-list-item-action>
                            <v-btn-toggle v-model="theme" color="primary" mandatory class="mb-2">
                                <v-btn x-large>Light</v-btn>
                                <v-btn x-large>Dark</v-btn>
                            </v-btn-toggle>
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>Color</v-list-item-content>
                        <v-list-item-action>
                            <ColorPicker v-model="color" :swatches="swatches" />
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Currency from "~/components/utilities/Currency.vue"
import Language from "~/components/utilities/Language.vue"
import ColorPicker from "~/components/utilities/ColorPicker.vue"
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        Currency,
        Language,
        ColorPicker

    },
    props: {
        user: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            right: false,
            theme: 0,
            color: '#0096c7',
            swatches: [
                ['#0096c7', '#31944f'],
                ['#EE4f12', '#46BBB1'],
                ['#ee44aa', '#55BB46']
            ],
            // timezones
            availableTimezones: ['America/Los_Angeles', 'America/New_York', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney'],
            // time formats
            availableFormats: [{
                label: '07/31/2020',
                format: 'L'
            }, {
                label: 'Jul 31, 2020',
                format: 'll'
            }, {
                label: '20200731',
                format: 'YYYYMMDD'
            }]
        }
    },
    computed: {
        ...mapState('app', ['time', 'currency', 'availableCurrencies'])
    },
    watch: {
        color(val) {
            const { isDark } = this.$vuetify.theme

            this.$vuetify.theme.themes.dark.primary = val
            this.$vuetify.theme.themes.light.primary = val
        },
        theme(val) {
            this.setGlobalTheme((val === 0 ? 'light' : 'dark'))
        },

    },
    methods: {
        ...mapMutations('app', ['setTheme', 'setTimeZone', 'setTimeFormat', 'setCurrency',]),
        setGlobalTheme(val) {
            this.$vuetify.theme.dark = val === 'dark'
            this.setTheme(val)
        },
    }
}
</script>
