<template>
    <div class="d-flex flex-column flex-grow-1">
        <div class="d-flex align-center py-3">
            <div>
                <div class="display-1">{{ entity_label }}</div>
                <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mr-2" :to="`/${entity_key}/create`">Create</v-btn>
        </div>

        <v-card>
            <v-row dense class="pa-2 align-center">
                <v-col cols="6">
                    <!-- <v-menu offset-y left>
            <template v-slot:activator="{ on }">
              <transition name="slide-fade" mode="out-in">
                <v-btn v-show="selectedEntities.length > 0" v-on="on">
                  Actions
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </transition>
            </template>
            <v-list dense>
              <v-list-item @click>
                <v-list-item-title>Verify</v-list-item-title>
              </v-list-item>
              <v-list-item @click>
                <v-list-item-title>Disable</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
                    </v-menu>-->
                </v-col>
                <v-col cols="6" class="d-flex text-right align-center">
                    <v-text-field
                        v-model="searchQuery"
                        append-icon="mdi-magnify"
                        class="flex-grow-1 mr-md-2"
                        solo
                        hide-details
                        dense
                        clearable
                        placeholder="e.g. filter for id, email, name, etc"
                        @keyup.native="search"
                    ></v-text-field>
                    <v-btn :loading="isLoading" icon small class="ml-2" @click="fetch">
                        <v-icon>mdi-fetch</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-data-table
                v-model="selectedEntities"
                show-select
                :headers="headers"
                :items="entities"
                class="flex-grow-1"
            >
                <template v-slot:item.id="{ item }">
                    <div class="font-weight-bold">
                        #
                        <copy-label :text="item.id + ''" />
                    </div>
                </template>

                <template v-slot:item.code="{ item }">
                    <div>{{ item.code }}</div>
                </template>
                <template v-slot:item.label="{ item }">
                    <div>{{ item.label }}</div>
                </template>
                <template v-slot:item.created="{ item }">
                    <div>{{ item.created | formatDate('ll') }}</div>
                </template>
                <template v-slot:item.updated="{ item }">
                    <div>{{ item.created | formatDate('ll') }}</div>
                </template>
                <template v-slot:item.action="{ item }">
                    <div class="actions">
                        <v-btn icon :to="localePath(`/recepies/edit?id=${item.id}`)">
                            <v-icon>mdi-open-in-new</v-icon>
                        </v-btn>
                    </div>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import CopyLabel from '../../components/common/CopyLabel'
import FileInputModal from '../../components/modals/file-input.vue'

export default {
    middleware: "is_admin",
    props: {

        entity_key: {
            type: String,
            default: "dashboard",
        }
        ,
        api_route: {
            type: String,
            default: "dashboard",
        },
        entity_model: {
            type: Object,
            default: () => ({}),
        },
        additional_headers: {
            type: Array,
            default: () => ([]),
        },
        data_array: {
            type: Array,
            default: () => ([])
        }
    },
    components: {
        CopyLabel,
        FileInputModal
    },

    created() {
        this.entities = this.data_array
    },
    data() {
        return {
            isLoading: false,
            batchImportLoading: false,

            searchQuery: '',
            selectedEntities: [],
            entities: {}
        }
    },
    watch: {
        selectedEntities(val) {

        }
    },
    computed: {
        entity_label() {
            return this.capitalizeFirstLetter(this.entity_key)
        },
        breadcrumbs() {
            return [{
                text: "Home",
                disabled: false,
                href: "/"
            }, {
                text: this.entity_label,
                disabled: false,
                href: `/${this.entity_key}`
            }, {
                text: 'List'
            }]
        },
        headers() {
            return [
                { text: 'Id', align: 'left', value: 'id' },
                { text: 'Title', value: 'label' },
                ...this.additional_headers,
                { text: 'Created', value: 'created' },
                { text: 'Updated', value: 'updated' },
                { text: 'Disabled', value: 'disable' },
                { text: '', sortable: false, align: 'right', value: 'action' }
            ]
        }
    },
    methods: {
        async fetch() {
            const entities = await this.$axios.$get(`${this.api_route}`)
            this.entities = entities
        },
        async search() {
            const query = this.searchQuery
            console.log(`SEARCH ${query}`)
            const resp = await this.$axios.$post(`/api/${this.api_route}/search`, {
                query: query
            })
            this.entities = resp

        },
        open() { },
        async import(file) {
            const form = new FormData()
            form.append('file', file)
            try {
                this.batchImportLoading = true
                const resp = await this.$axios.$post(`/api/init/${this.api_route}`, form)
                this.batchImportLoading = false

                this.$notifySuccess(`Imported successfully ${resp.length} new recepies`)
                await this.fetch()
            } catch (err) {
                this.$notifyError(`An error occured: ${err}`)
            }
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
