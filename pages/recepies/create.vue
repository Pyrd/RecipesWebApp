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
                        <v-card outlined class="mb-12 py-4" height="300px" width="100%">
                            <v-card-actions class="fwidth fheight px-12">
                                <v-form v-model="step1form" class="fwidth py-4">
                                    <p>
                                        <b class="font-weight-bold">Nom</b>
                                    </p>
                                    <v-text-field
                                        solo
                                        class="fwidth"
                                        v-model="entity.name"
                                        clearable
                                    ></v-text-field>
                                    <p>
                                        <b class="font-weight-bold">Acccès</b>
                                    </p>

                                    <v-btn-toggle v-model="entity.access" color="primary">
                                        <v-btn text>Publique</v-btn>

                                        <v-btn>Privée</v-btn>
                                    </v-btn-toggle>
                                </v-form>
                            </v-card-actions>
                        </v-card>
                        <v-btn color="primary" @click="step = 2">Continuer</v-btn>
                        <v-btn text @click="step = 1">Retour</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="step > 2" step="2">Informations de la recette</v-stepper-step>

                    <v-stepper-content step="2">
                        <v-card outlined class="mb-12 py-4" width="100%">
                            <v-card-actions class="fwidth fheight px-12">
                                <div>
                                    <span class="font-weight-bold">Nom</span>

                                    <p>
                                        <b class="primary--text font-weight-bold">{{ entity.name }}</b>
                                    </p>
                                </div>
                            </v-card-actions>

                            <v-card-actions class="fwidth fheight px-12">
                                <div>
                                    <v-form v-model="step2form">
                                        <!-- Type de recette -->
                                        <v-row class="d-flex flex-column mb-2">
                                            <span class="font-weight-bold">Types de recette</span>
                                            <v-row class="mt-2">
                                                <v-col
                                                    cols="4"
                                                    md="4"
                                                    v-for="e in recepie_types"
                                                    :key="e.label"
                                                >
                                                    <v-hover>
                                                        <template v-slot:default="{ hover }">
                                                            <v-card
                                                                :elevation="hover ? 3 : 0"
                                                                outlined
                                                                class="centered grid-card"
                                                                :class="{ 'grid-card-hover': hover, 'grid-card-selected': grid_selected == e.label }"
                                                                @click.native="grid_selected = e.label"
                                                            >
                                                                <span
                                                                    :class="grid_selected == e.label ? 'primary--text font-weight-bold' : ''"
                                                                >{{ e.label }}</span>
                                                            </v-card>
                                                        </template>
                                                    </v-hover>
                                                </v-col>
                                            </v-row>
                                        </v-row>
                                        <!-- Nombre de portions -->
                                        <v-row class="d-flex flex-column mb-2">
                                            <span class="font-weight-bold">Nombre de portions</span>
                                            <v-row class="mt-2">
                                                <v-col cols="3">
                                                    <v-text-field
                                                        type="number"
                                                        v-model="entity.person_count"
                                                        placeholder="4"
                                                        solo
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        class="d-inline"
                                                        v-model="entity.person_count_unit"
                                                        placeholder="Personnes"
                                                        solo
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-row>
                                        <!-- Temps de préparation -->
                                        <v-row class="d-flex flex-column">
                                            <span class="font-weight-bold">Temps de préparation</span>
                                            <v-row class="mt-2">
                                                <v-col cols="3">
                                                    <v-text-field
                                                        hide-details
                                                        type="number"
                                                        v-model="entity.estimated_time.hour"
                                                        placeholder="Heures"
                                                        solo
                                                    ></v-text-field>
                                                </v-col>
                                                <div class="centered">:</div>
                                                <v-col cols="3">
                                                    <v-text-field
                                                        class="d-inline"
                                                        type="number"
                                                        v-model="entity.estimated_time.min"
                                                        placeholder="Minutes"
                                                        solo
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-row>
                                        <!-- Temps de cuisson -->
                                        <v-row class="d-flex flex-column mb-2">
                                            <span class="font-weight-bold">Temps de cuisson</span>
                                            <v-row class="mt-2">
                                                <v-col cols="3">
                                                    <v-text-field
                                                        hide-details
                                                        type="number"
                                                        v-model="entity.estimated_cook_time.hour"
                                                        placeholder="Heures"
                                                        solo
                                                    ></v-text-field>
                                                </v-col>
                                                <div class="centered">:</div>
                                                <v-col cols="3">
                                                    <v-text-field
                                                        class="d-inline"
                                                        type="number"
                                                        v-model="entity.estimated_cook_time.min"
                                                        placeholder="Minutes"
                                                        solo
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-row>
                                        <!-- Temps de repos -->
                                        <v-row class="d-flex flex-column mb-2">
                                            <span class="font-weight-bold">Temps de repos</span>
                                            <v-row class="mt-2">
                                                <v-col cols="3">
                                                    <v-text-field
                                                        hide-details
                                                        type="number"
                                                        v-model="entity.estimated_rest_time.hour"
                                                        placeholder="Heures"
                                                        solo
                                                    ></v-text-field>
                                                </v-col>
                                                <div class="centered">:</div>
                                                <v-col cols="3">
                                                    <v-text-field
                                                        class="d-inline"
                                                        type="number"
                                                        v-model="entity.estimated_rest_time.min"
                                                        placeholder="Minutes"
                                                        solo
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-row>
                                        <!-- Types de cuisson -->
                                        <v-row class="d-flex flex-column mb-2">
                                            <span class="font-weight-bold">Types de cuisson</span>
                                            <v-row class="mt-2">
                                                <v-col
                                                    cols="3"
                                                    md="3"
                                                    v-for="e in cook_types"
                                                    :key="e.label"
                                                >
                                                    <v-hover>
                                                        <template v-slot:default="{ hover }">
                                                            <v-card
                                                                :elevation="hover ? 3 : 0"
                                                                outlined
                                                                class="centered grid2-card"
                                                                :class="{ 'grid-card-hover': hover, 'grid-card-selected': grid2_selected == e.label }"
                                                                @click.native="grid2_selected = e.label"
                                                            >
                                                                <span
                                                                    :class="grid2_selected == e.label ? 'primary--text font-weight-bold' : ''"
                                                                >{{ e.label }}</span>
                                                            </v-card>
                                                        </template>
                                                    </v-hover>
                                                </v-col>
                                            </v-row>
                                        </v-row>
                                        <!-- Difficulty -->
                                        <v-row class="d-flex flex-column mb-12">
                                            <span class="font-weight-bold">Difficulté</span>
                                            <v-row class="mt-2 d-flex">
                                                <v-rating
                                                    v-model="entity.difficulty"
                                                    class="d-flex ml-2"
                                                    length="3"
                                                >
                                                    <template v-slot:item="props">
                                                        <div
                                                            @click="props.click"
                                                            class="rounded-circle circle mr-2"
                                                            :class="props.isFilled ? 'primary' : 'grey lighten-1'"
                                                        ></div>
                                                    </template>
                                                </v-rating>
                                            </v-row>
                                        </v-row>
                                        <!-- Cost -->
                                        <v-row class="d-flex flex-column mb-12">
                                            <span class="font-weight-bold">Coûts</span>
                                            <v-row class="mt-2 d-flex">
                                                <v-rating
                                                    v-model="entity.cost"
                                                    class="d-flex ml-2"
                                                    length="3"
                                                >
                                                    <template v-slot:item="props">
                                                        <div
                                                            @click="props.click"
                                                            class="rounded-circle circle mr-2"
                                                            :class="props.isFilled ? 'primary' : 'grey lighten-1'"
                                                        ></div>
                                                    </template>
                                                </v-rating>
                                            </v-row>
                                        </v-row>
                                    </v-form>
                                </div>
                            </v-card-actions>
                        </v-card>
                        <v-btn color="primary" @click="step = 3">Continuer</v-btn>
                        <v-btn text @click="step = 1">Retour</v-btn>
                    </v-stepper-content>

                    <v-stepper-step
                        :complete="step > 3"
                        step="3"
                    >Select an ad format and name ad unit</v-stepper-step>

                    <v-stepper-content step="3">
                        <v-card outlined class="mb-12 py-4" height="300px" width="100%"></v-card>
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
            step: 2,
            step1form: true,
            step2form: true,
            entity: {
                name: "Recette Poulet croustillant",
                access: 0,
                person_count: "",
                person_count_unit: "",
                estimated_time: {
                    hour: '',
                    min: '',
                },
                estimated_cook_time: {
                    hour: '',
                    min: '',
                },
                estimated_rest_time: {
                    hour: '',
                    min: '',
                },
                difficulty: 0,
                cost: 0
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
            recepie_types: [
                { label: "Entrée" },
                { label: "Plat Principale" },
                { label: "Dessert" },
                { label: "Accompagnement" },
                { label: "Apéritif / Tapas" },
                { label: "Sauce" },
                { label: "Boisson" },
                { label: "Confiserie" },
                { label: "Autres" },
            ],
            cook_types: [
                { label: "Four" },
                { label: "Plaques" },
                { label: "Sans-cuisson" },
                { label: "Autres" },
            ],
            grid_selected: '',
            grid2_selected: ''
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

<style lang="scss">
.grid-card-hover {
    border-color: var(--v-primary-base) !important;
}

.grid-card-selected {
    border-color: var(--v-primary-base) !important;
}

.grid-card {
    height: 100%;
    width: 100%;
    min-height: 100px;
    min-width: 200px;

    border-color: #ebe5e3 1px solid !important;
    border-radius: 15px !important;
}

.grid2-card {
    height: 100%;
    width: 100%;
    min-height: 100px;
    min-width: 100px;

    border-color: #ebe5e3 1px solid !important;
    border-radius: 15px !important;
}

.circle {
    height: 35px;
    width: 35px;
}
</style>
