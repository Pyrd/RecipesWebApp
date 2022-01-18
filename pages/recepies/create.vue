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
                                    <v-form v-model="step2form">
                                        <v-row class="d-flex flex-column mb-2">
                                            <span class="font-weight-bold">Nom</span>
                                            <p>
                                                <b
                                                    class="primary--text font-weight-bold"
                                                >{{ entity.name }}</b>
                                            </p>
                                        </v-row>
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
                                        <!-- Photos -->
                                        <v-row class="d-flex flex-column mb-12">
                                            <span class="font-weight-bold">Photos</span>
                                            <v-row class="mt-2 d-flex">
                                                <draggable v-model="photos" class="d-flex">
                                                    <transition-group class="grid">
                                                        <div
                                                            v-for="(element, i) in photos"
                                                            :key="'photo' + i"
                                                        >
                                                            <PhotoInput v-model="photos[i]" />
                                                        </div>
                                                    </transition-group>
                                                </draggable>
                                            </v-row>
                                        </v-row>
                                    </v-form>
                                </div>
                            </v-card-actions>
                        </v-card>
                        <v-btn color="primary" @click="step = 3">Continuer</v-btn>
                        <v-btn text @click="step = 1">Retour</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="step > 3" step="3">Les ingrédients et étapes</v-stepper-step>

                    <v-stepper-content step="3">
                        <v-card outlined class="mb-12 py-4" width="100%">
                            <v-card-actions class="fwidth fheight px-12">
                                <v-form v-model="step3form" class="fwidth">
                                    <v-row class="d-flex flex-column mb-2">
                                        <span class="font-weight-bold">Nom</span>
                                        <p>
                                            <b
                                                class="primary--text font-weight-bold"
                                            >{{ entity.name }}</b>
                                        </p>
                                    </v-row>

                                    <!-- Type de recette -->
                                    <v-row class="d-flex flex-column mb-2 fwidth">
                                        <span class="font-weight-bold">Ingrédients</span>
                                        <v-card outlined class="px-4 py-2 mt-2">
                                            <v-row class="mt-2 fwidth">
                                                <v-col cols="12" md="6">
                                                    <v-autocomplete
                                                        solo
                                                        clearable
                                                        v-model="ingredient_query_model"
                                                        :items="ingredient_query_items"
                                                        :loading="ingredient_query_loading"
                                                        :search-input.sync="ingredient_query_search"
                                                        hide-no-data
                                                        hide-selected
                                                        item-text="label_fr"
                                                        item-value="code"
                                                        placeholder="Ingrédient"
                                                        prepend-icon="mdi-food"
                                                        return-object
                                                    >
                                                        <template v-slot:selection="data">
                                                            <v-list-item-avatar>
                                                                <img :src="data.item.images[0].url" />
                                                            </v-list-item-avatar>
                                                            <v-list-item-content>
                                                                <v-list-item-title
                                                                    v-html="data.item.label_fr"
                                                                ></v-list-item-title>
                                                                <v-list-item-subtitle
                                                                    v-html="data.item.code"
                                                                ></v-list-item-subtitle>
                                                            </v-list-item-content>
                                                        </template>
                                                        <template v-slot:item="data">
                                                            <v-list-item-avatar>
                                                                <img :src="data.item.images[0].url" />
                                                            </v-list-item-avatar>
                                                            <v-list-item-content>
                                                                <v-list-item-title
                                                                    v-html="data.item.label_fr"
                                                                ></v-list-item-title>
                                                                <v-list-item-subtitle
                                                                    v-html="data.item.code"
                                                                ></v-list-item-subtitle>
                                                            </v-list-item-content>
                                                        </template>
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col cols="6" md="2">
                                                    <v-text-field
                                                        type="number"
                                                        v-model="ingredient_query_count"
                                                        placeholder="Quantité"
                                                        solo
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="6" md="4">
                                                    <v-text-field
                                                        class="d-inline"
                                                        v-model="ingredient_query_unit"
                                                        placeholder="Unité"
                                                        solo
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" class="d-flex">
                                                    <v-text-field
                                                        solo
                                                        v-model="ingredient_query_complement"
                                                        placeholder="Compléments"
                                                    ></v-text-field>
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                        solo
                                                        color="success"
                                                        @click="add_ingredient"
                                                    >Ajouter</v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-row>
                                    <v-row>
                                        <v-list class="fwidth">
                                            <div v-for="(e, i) in entity.items" :key="i">
                                                <v-list-item
                                                    outlined
                                                    class="fwidth outlined-list-item mb-2"
                                                >
                                                    <v-list-item-avatar>
                                                        <img :src="e.item.images[0].url" />
                                                    </v-list-item-avatar>
                                                    <v-list-item-content>
                                                        <v-list-item-title
                                                            class="font-weight-bold subtitle"
                                                        >{{ e.count }} {{ e.unit }} {{ e.item.label_fr }} {{ e.complement }}</v-list-item-title>
                                                        <v-list-item-subtitle v-html="e.code"></v-list-item-subtitle>
                                                    </v-list-item-content>
                                                    <v-list-item-actions>
                                                        <v-btn icon @click="remove_ingredient(i)">
                                                            <v-icon>mdi-close-circle</v-icon>
                                                        </v-btn>
                                                    </v-list-item-actions>
                                                </v-list-item>
                                            </div>
                                        </v-list>
                                    </v-row>
                                    <v-row class="d-flex flex-column mb-2 fwidth">
                                        <span class="font-weight-bold">Instructions</span>
                                        <v-list class="fwidth">
                                            <draggable
                                                v-model="entity.instructions"
                                                class="d-flex flex-column"
                                            >
                                                <transition-group class="d-flex flex-column">
                                                    <div
                                                        v-for="(e, i) in entity.instructions"
                                                        :key="'instruction' + i"
                                                    >
                                                        <v-list-item
                                                            outlined
                                                            class="fwidth outlined-list-item mb-2"
                                                        >
                                                            <v-list-item-content>
                                                                <v-list-item-title class="subtitle">
                                                                    <span
                                                                        class="font-weight-bold"
                                                                    >{{ i + 1 }}.</span>
                                                                    {{ e.description }}
                                                                </v-list-item-title>
                                                            </v-list-item-content>
                                                            <v-list-item-actions>
                                                                <v-btn
                                                                    icon
                                                                    @click="remove_instruction(i)"
                                                                >
                                                                    <v-icon>mdi-close-circle</v-icon>
                                                                </v-btn>
                                                            </v-list-item-actions>
                                                        </v-list-item>
                                                    </div>
                                                </transition-group>
                                            </draggable>
                                        </v-list>
                                        <v-card outlined class="px-4 py-2 mt-2">
                                            <v-row class="mt-2 fwidth">
                                                <v-col cols="12">
                                                    <v-container fluid>
                                                        <v-textarea
                                                            auto-grow
                                                            label="Instruction"
                                                            rows="2"
                                                            row-height="20"
                                                            solo
                                                            clearable
                                                            v-model="instruction_model"
                                                            placeholder="Couper les oignons"
                                                            clear-icon="mdi-close-circle"
                                                            counter
                                                            :rules="instruction_rules"
                                                        ></v-textarea>
                                                    </v-container>
                                                </v-col>
                                                <v-col cols="12" class="d-flex mb-2">
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                        solo
                                                        color="success"
                                                        @click="add_instruction"
                                                    >Ajouter</v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-row>
                                </v-form>
                            </v-card-actions>
                        </v-card>

                        <v-btn color="primary" @click="step = 4">Continuer</v-btn>
                        <v-btn text @click="step = 2">Retour</v-btn>
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
import PhotoInput from '../../components/common/PhotoInput.vue'

export default {
    middleware: "is_admin",

    components: {
        CopyLabel,
        FileInputModal,
        PhotoInput
    },
    data() {
        return {
            step: 3,
            step1form: true,
            step2form: true,
            step3form: true,
            step4form: true,
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
                cost: 0,
                items: [],
                instructions: []
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
            grid2_selected: '',
            input_photo: null,
            photo_count: 0,
            photos: [null,],
            photo_lock: false,
            // step3
            ingredient_query_search: "",
            ingredient_query_model: null,
            ingredient_query_result: [],
            ingredient_query_loading: false,
            ingredient_query_count: null,
            ingredient_query_unit: null,
            ingredient_query_complement: null,
            instruction_rules: [v => v.length <= 300 || 'Max 300 characters'],
            instruction_model: "",

        }
    }
    ,
    watch: {
        photos(val, old) {
            if (!this.photo_lock) {
                this.photo_lock = true
                let count = 0;
                for (let i = 0; i < val.length; i++) {
                    const e = val[i]
                    if (e != null) {
                        count++
                    }
                    else {
                        val.splice(i, 1)
                    }
                }
                if (count <= 6) {
                    val.push(null)
                }
                this.photo_count = count
                setTimeout(() => {
                    this.photo_lock = false
                }, 100)
            }

        },
        ingredient_query_search(val) {
            console.log(val)
            // Items have already been loaded

            // Items have already been requested
            if (this.ingredient_query_loading) return

            this.ingredient_query_loading = true

            // Lazily load input items
            this.searchIngredients()
                .catch(err => {
                    console.log(err)
                })
                .finally(() => (this.ingredient_query_loading = false))
        }
    },
    computed: {
        ingredient_query_items() {
            return this.ingredient_query_result.map(entry => {
                const Description = entry.label_fr.length > this.descriptionLimit
                    ? entry.label_fr.slice(0, 80) + '...'
                    : entry.label_fr

                return Object.assign({}, entry, { Description })
            })
        }
    },
    methods: {
        async searchIngredients() {
            const query = this.ingredient_query_search
            console.log(`SEARCH ${query}`)
            const resp = await this.$axios.$post('/api/items/search', {
                query: query
            })
            this.ingredient_query_result = resp

        },
        add_ingredient() {
            this.entity.items.push({
                item: this.ingredient_query_model,
                count: this.ingredient_query_count,
                unit: this.ingredient_query_unit,
                complement: this.ingredient_query_complement,
            })
            this.ingredient_query_model = null
            this.ingredient_query_count = null
            this.ingredient_query_unit = null
            this.ingredient_query_complement = null
        },
        remove_ingredient(i) {
            this.entity.items.splice(i, 1)
        },
        add_instruction() {
            this.entity.instructions.push({
                description: this.instruction_model,
            })
            this.instruction_model = ""
        },
        remove_instruction(i) {
            this.entity.instructions.splice(i, 1)
        },
        async create() {

        }
    }
}
</script>

<style lang="scss">
.grid {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: -12px;
}

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

.outlined-list-item {
    border: 1px solid #ebe5e3;
    border-radius: 8px;
    width: 100%;
}
</style>