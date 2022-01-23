<template >
    <div>
        <v-card outlined class="mb-12 py-4" width="100%">
            <v-card-actions class="fwidth fheight px-12">
                <div>
                    <v-form v-model="form">
                        <v-row class="d-flex flex-column mb-2">
                            <span class="font-weight-bold">Nom</span>
                            <p>
                                <b class="primary--text font-weight-bold">{{ value.name }}</b>
                            </p>
                        </v-row>
                        <!-- Type de recette -->
                        <v-row class="d-flex flex-column mb-2">
                            <span class="font-weight-bold">Types de recette</span>
                            <v-row class="mt-2">
                                <v-col cols="4" md="4" v-for="e in recepie_types" :key="e.id">
                                    <v-hover>
                                        <template v-slot:default="{ hover }">
                                            <v-card
                                                :elevation="hover ? 3 : 0"
                                                outlined
                                                class="centered grid-card flex-column"
                                                :class="{ 'grid-card-hover': hover, 'grid-card-selected': value.type == e.id }"
                                                @click.native="value.type = e.id"
                                            >
                                                <img
                                                    v-if="e.icon"
                                                    :src="`/images/${e.icon}${value.type == e.id ? '_color' : ''}.png`"
                                                    alt="cook-icon"
                                                    height="64px"
                                                    width="64px"
                                                />

                                                <span
                                                    :class="value.type == e.id ? 'primary--text font-weight-bold' : ''"
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
                                        v-model="value.person_count"
                                        placeholder="4"
                                        solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        class="d-inline"
                                        v-model="value.person_count_unit"
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
                                        v-model.number="value.estimated_preparation_time.hour"
                                        placeholder="Heures"
                                        solo
                                    ></v-text-field>
                                </v-col>
                                <div class="centered">:</div>
                                <v-col cols="3">
                                    <v-text-field
                                        class="d-inline"
                                        type="number"
                                        v-model.number="value.estimated_preparation_time.min"
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
                                        v-model.number="value.estimated_cook_time.hour"
                                        placeholder="Heures"
                                        solo
                                    ></v-text-field>
                                </v-col>
                                <div class="centered">:</div>
                                <v-col cols="3">
                                    <v-text-field
                                        class="d-inline"
                                        type="number"
                                        v-model.number="value.estimated_cook_time.min"
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
                                        v-model.number="value.estimated_rest_time.hour"
                                        placeholder="Heures"
                                        solo
                                    ></v-text-field>
                                </v-col>
                                <div class="centered">:</div>
                                <v-col cols="3">
                                    <v-text-field
                                        class="d-inline"
                                        type="number"
                                        v-model.number="value.estimated_rest_time.min"
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
                                <v-col cols="3" md="3" v-for="e in cook_types" :key="e.id">
                                    <v-hover>
                                        <template v-slot:default="{ hover }">
                                            <v-card
                                                :elevation="hover ? 3 : 0"
                                                outlined
                                                class="centered grid2-card flex-column"
                                                :class="{ 'grid-card-hover': hover, 'grid-card-selected': value.cook_type == e.id }"
                                                @click.native="value.cook_type = e.id"
                                            >
                                                <img
                                                    v-if="e.icon"
                                                    :src="`/images/${e.icon}${value.cook_type == e.id ? '_color' : ''}.png`"
                                                    alt="cook-icon"
                                                    height="64px"
                                                    width="64px"
                                                />
                                                <span
                                                    :class="value.cook_type == e.id ? 'primary--text font-weight-bold' : ''"
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
                                <v-rating v-model="value.difficulty" class="d-flex ml-2" length="4">
                                    <template v-slot:item="props">
                                        <div
                                            @click="props.click"
                                            class="rounded-circle circle mr-2"
                                            :class="props.isFilled ? 'primary' : 'grey lighten-1'"
                                        ></div>
                                    </template>
                                </v-rating>
                                <div
                                    v-if="value.difficulty"
                                    class="centered"
                                >{{ getDifficultyLabel }}</div>
                            </v-row>
                        </v-row>
                        <!-- Cost -->
                        <v-row class="d-flex flex-column mb-12">
                            <span class="font-weight-bold">Coûts</span>
                            <v-row class="mt-2 d-flex">
                                <v-rating v-model="value.cost" class="d-flex ml-2" length="3">
                                    <template v-slot:item="props">
                                        <div
                                            @click="props.click"
                                            class="rounded-circle circle mr-2"
                                            :class="props.isFilled ? 'primary' : 'grey lighten-1'"
                                        ></div>
                                    </template>
                                </v-rating>
                                <div v-if="value.cost" class="centered">{{ getCostLabel }}</div>
                            </v-row>
                        </v-row>
                        <!-- Photos -->
                        <v-row class="d-flex flex-column mb-12">
                            <span class="font-weight-bold">Photos</span>
                            <v-row class="mt-2 d-flex">
                                <draggable v-model="photos" class="d-flex">
                                    <transition-group class="grid">
                                        <div v-for="(element, i) in photos" :key="'photo' + i">
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
        <v-btn color="primary" @click="$emit('next')">Continuer</v-btn>
        <v-btn text @click="$emit('back')">Annuler</v-btn>
    </div>
</template>


<script>
import PhotoInput from '../../components/common/PhotoInput.vue'
import {
    recepie_types,
    cook_types
} from '~/configs/shared/recepie-types.constants'

export default {
    props: {
        value: {
            type: Object,
        },
    },
    components: {
        PhotoInput,
    },
    data() {
        return {
            recepie_types,
            cook_types,
            form: true,
            input_photo: null,
            photo_count: 0,
            photos: [null,],
            photo_lock: false,
        }
    },
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
                if (count <= 15) {
                    val.push(null)
                }
                this.photo_count = count
                console.log(JSON.stringify(val, null, 2), typeof val)
                this.value.images = val.filter((e) => e != null).map((e) => ({ url: e.image, filename: e.name, type: e.type }))
                setTimeout(() => {
                    this.photo_lock = false
                }, 100)
            }

        },
    },
    computed: {
        getDifficultyLabel() {
            switch (this.value.difficulty) {
                case 1:
                    return 'Facile'
                case 2:
                    return 'Moyen'
                case 3:
                    return 'Difficile'
                case 4:
                default:
                    return 'Très difficle'
            }
        },
        getCostLabel() {
            switch (this.value.cost) {
                case 1:
                    return 'Bon marché'
                case 2:
                    return 'Coût moyen'
                case 3:
                default:
                    return 'Assez cher'

            }
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
.circle {
    height: 35px;
    width: 35px;
}
</style>