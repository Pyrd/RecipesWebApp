<template>
    <div class="d-flex flex-column flex-grow-1">
        <div class="d-flex align-center py-3">
            <div>
                <div class="display-1">Recepies</div>
                <v-breadcrumbs :recepie="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
            </div>
            <v-spacer></v-spacer>
        </div>

        <v-card flat>
            <v-card-actions>
                <v-stepper v-model="step" vertical class="fwidth" flat>
                    <v-stepper-step :complete="step > 1" step="1">Choissez un nom pour votre recette</v-stepper-step>

                    <v-stepper-content step="1">
                        <v-card outlined class="mb-12" height="200px" width="100%">
                            <v-card-actions class="fwidth fheight px-12">
                                <v-form v-model="step1form" class="fwidth">
                                    <v-text-field
                                        solo
                                        class="fwidth"
                                        label="Nom"
                                        v-model="entity.name"
                                    ></v-text-field>
                                </v-form>
                            </v-card-actions>
                        </v-card>
                        <v-btn color="primary" @click="step = 2">Continuer</v-btn>
                        <v-btn text @click="step = 1">Retour</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="step > 2" step="2">Informations de la recette</v-stepper-step>

                    <v-stepper-content step="2">
                        <v-card color="grey lighten-1" class="mb-12" height="200px">
                            <v-form v-model="step2form"></v-form>
                        </v-card>
                        <v-btn color="primary" @click="step = 3">Continuer</v-btn>
                        <v-btn text @click="step = 2">Retour</v-btn>
                    </v-stepper-content>

                    <v-stepper-step
                        :complete="step > 3"
                        step="3"
                    >Select an ad format and name ad unit</v-stepper-step>

                    <v-stepper-content step="3">
                        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                        <v-btn color="primary" @click="step = 4">Continuer</v-btn>
                        <v-btn text>Cancel</v-btn>
                    </v-stepper-content>

                    <v-stepper-step step="4">View setup instructions</v-stepper-step>
                    <v-stepper-content step="4">
                        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                        <v-btn color="primary" @click="step = 1">Continue</v-btn>
                        <v-btn text>Cancel</v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-card-actions>
            <v-card-actions>
                <v-btn color="error" class="mr-2" to="/recepies/">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" class="mr-2" @click="create">Create</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import CopyLabel from '../../components/common/CopyLabel'
import FileInputModal from '../../components/modals/file-input.vue'

export default {
    middleware: "is_admin",

    components: {
        CopyLabel,
        FileInputModal
    },
    async asyncData({ $axios }) {
        const resp = await $axios.$get('/api/recepie')
        console.log(resp)
        return {
            recepies: resp
        }
    },
    data() {
        return {
            step: 1,
            step1form: true,
            step2form: true,
            entity: {
                name: ""
            },
            isLoading: false,
            batchImportLoading: false,
            breadcrumbs: [{
                text: 'Recepies',
                disabled: false,
                href: '#'
            }, {
                text: 'Create'
            }],
            recepies: [],
            searchQuery: '',
            selectedRecepies: [],
            headers: [
                { text: 'Id', align: 'left', value: 'id' },
                // { text: 'Code', value: 'code' },
                { text: 'Title', value: 'title' },
                { text: 'Duration', align: 'left', value: 'duration' },
                { text: 'Tags', align: 'left', value: 'tags' },
                { text: 'Created', value: 'created' },
                { text: 'Updated', value: 'updated' },
                { text: 'Disabled', value: 'disable' },
                { text: '', sortable: false, align: 'right', value: 'action' }
            ],
        }
    },
    watch: {
        selectedRecepies(val) {

        }
    },
    methods: {
        async searchIngredients() {
            const query = this.searchQuery
            console.log(`SEARCH ${query}`)
            const resp = await this.$axios.$post('/api/recepie/search', {
                query: query
            })
            this.recepies = resp

        },
        async create() {

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
