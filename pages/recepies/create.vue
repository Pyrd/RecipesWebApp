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
                        <CreateRecepieStep1 v-model="entity" @next="step = 2" @back="goBack" />
                    </v-stepper-content>

                    <v-stepper-step :complete="step > 2" step="2">Informations de la recette</v-stepper-step>

                    <v-stepper-content step="2">
                        <CreateRecepieStep2 v-model="entity" @next="step = 3" @back="step = 1" />
                    </v-stepper-content>

                    <v-stepper-step :complete="step > 3" step="3">Les ingrédients et étapes</v-stepper-step>

                    <v-stepper-content step="3">
                        <CreateRecepieStep3 v-model="entity" @next="step = 4" @back="step = 2" />
                    </v-stepper-content>

                    <v-stepper-step step="4">Récapitulatif</v-stepper-step>
                    <v-stepper-content step="4">
                        <CreateRecepieStep4 v-model="entity" @next="create" @back="step = 3" />
                    </v-stepper-content>
                </v-stepper>
            </v-card-actions>
            <v-card-actions>
                <v-btn color="error" class="mr-2" to="/recepies/">Annuler</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" class="mr-2" @click="create">Create</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import CreateRecepieStep1 from '../../components/recepies/CreateRecepieStep1.vue'
import CreateRecepieStep2 from '../../components/recepies/CreateRecepieStep2.vue'
import CreateRecepieStep3 from '../../components/recepies/CreateRecepieStep3.vue'
import CreateRecepieStep4 from '../../components/recepies/CreateRecepieStep4.vue'
export default {
    middleware: "is_admin",

    components: {
        CreateRecepieStep1,
        CreateRecepieStep2,
        CreateRecepieStep3,
        CreateRecepieStep4
    },
    data() {
        return {
            step: 2,
            breadcrumbs: [{
                text: 'Recepies',
                disabled: false,
                href: '#'
            }, {
                text: 'Create'
            }],
            entity: {
                name: "Recette Poulet croustillant",
                access: 0,
                type: 'main_dish',
                cook_type: 'oven',
                person_count: "4",
                person_count_unit: "personnes",
                estimated_preparation_time: {
                    hour: '',
                    min: '20',
                },
                estimated_cook_time: {
                    hour: '1',
                    min: '',
                },
                estimated_rest_time: {
                    hour: '',
                    min: '50',
                },
                difficulty: 2,
                cost: 1,
                items: [{
                    "item": {
                        "id": 4,
                        "label_en": null,
                        "label_fr": "Abricot",
                        "code": "abricot",
                        "letter": "A",
                        "ingredient_url": "/recettes/index/ingredient/abricot",
                        "created": "2022-01-23T02:44:20.193Z",
                        "updated": "2022-01-23T02:44:20.193Z",
                        "images": [
                            {
                                "id": "eb135134-3b3b-4faa-854f-15557d799a79",
                                "mimetype": "jpg",
                                "url": "https://assets.afcdn.com/recipe/20170607/67622_w200h200cx256cy192cxt0cyt0cxb700cyb700.jpg",
                                "created": "2022-01-23T02:44:20.193Z",
                                "updated": "2022-01-23T02:44:20.193Z"
                            }
                        ],
                        "Description": "Abricot"
                    },
                    "count": "1",
                    "unit": {
                        "value": "CENTILITER",
                        "label": "centilitre",
                        "abbr": "cl"
                    },
                    "complement": null
                },
                {
                    "item": {
                        "id": 7,
                        "label_en": null,
                        "label_fr": "Absinthe",
                        "code": "absinthe",
                        "letter": "A",
                        "ingredient_url": "/recettes/index/ingredient/absinthe",
                        "created": "2022-01-23T02:44:20.210Z",
                        "updated": "2022-01-23T02:44:20.210Z",
                        "images": [
                            {
                                "id": "20c8d094-8bea-4f59-b448-99ebda1674e3",
                                "mimetype": "jpg",
                                "url": "https://assets.afcdn.com/recipe/20100101/ingredient_default_w200h200c1.jpg",
                                "created": "2022-01-23T02:44:20.210Z",
                                "updated": "2022-01-23T02:44:20.210Z"
                            }
                        ],
                        "Description": "Absinthe"
                    },
                    "count": "12",
                    "unit": {
                        "value": "MILLILITER",
                        "label": "millimetre",
                        "abbr": "ml"
                    },
                    "complement": null
                },],
                instructions: [],
                images: []
            },

        }
    },
    methods: {
        async create() {

        },
        goBack() {
            this.$router.push('/recepies')
        }
    }
}
</script>

<style lang="scss">
.outlined-list-item {
    border: 1px solid #ebe5e3;
    border-radius: 8px;
    width: 100%;
}
</style>