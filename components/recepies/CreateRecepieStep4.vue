<template >
    <div>
        <v-card outlined class="mb-12 py-4" width="100%">
            <v-card-actions>
                <PhotoGallery :images="value.images" class="fwidth fheigth" />
            </v-card-actions>
            <v-card-actions class="fwidth fheight px-12">
                <v-form v-model="form" class="fwidth py-4">
                    <v-row class="mb-2">
                        <v-col cols="12" md="6">
                            <v-row>
                                <v-col cols="12">
                                    <span class="font-weight-bold">Nom</span>
                                    <p>
                                        <b class="primary--text font-weight-bold">{{ value.name }}</b>
                                        <v-chip
                                            color="primary"
                                        >{{ value.access == 0 ? 'Publique' : 'Privée' }}</v-chip>
                                    </p>
                                </v-col>
                                <v-col cols="12">
                                    <p class="font-weight-bold">Ingrédients</p>
                                    <v-row>
                                        <v-list class="fwidth pr-8">
                                            <div v-for="(e, i) in value.items" :key="i">
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
                                                        >{{ e.count }} {{ e.unit.label }} {{ e.item.label_fr }} {{ e.complement }}</v-list-item-title>
                                                        <v-list-item-subtitle v-html="e.code"></v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </div>
                                        </v-list>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-row>
                                <v-col cols="4">
                                    <span class="font-weight-bold">Type</span>
                                    <p>
                                        <b class="primary--text font-weight-bold">{{ getTypeLabel }}</b>
                                    </p>
                                </v-col>
                                <v-col cols="4">
                                    <span class="font-weight-bold">Durée</span>
                                    <p>
                                        <b class="primary--text font-weight-bold">{{ total_time }}</b>
                                    </p>
                                </v-col>
                                <v-col cols="4">
                                    <span class="font-weight-bold">Portions</span>
                                    <p>
                                        <b
                                            class="primary--text font-weight-bold"
                                        >{{ value.person_count }} {{ value.person_count_unit }}</b>
                                    </p>
                                </v-col>
                                <v-col cols="4">
                                    <span class="font-weight-bold">Type de cuisson</span>
                                    <p>
                                        <b
                                            class="primary--text font-weight-bold"
                                        >{{ getCookTypeLabel }}</b>
                                    </p>
                                </v-col>
                                <v-col cols="4">
                                    <span class="font-weight-bold">Difficulté</span>
                                    <p>
                                        <b
                                            class="primary--text font-weight-bold"
                                        >{{ getDifficultyLabel }}</b>
                                    </p>
                                </v-col>
                                <v-col cols="4">
                                    <span class="font-weight-bold">Coûts</span>
                                    <p>
                                        <b class="primary--text font-weight-bold">{{ getCostLabel }}</b>
                                    </p>
                                </v-col>
                                <v-col cols="12">
                                    <p class="font-weight-bold">Instructions</p>
                                    <v-row>
                                        <v-list
                                            class="fwidth pr-8"
                                            v-if="value.instructions && value.instructions.length > 0"
                                        >
                                            <v-list-item
                                                v-for="(e, i) in value.instructions"
                                                :key="i"
                                                outlined
                                                class="fwidth outlined-list-item mb-2"
                                            >
                                                <v-list-item-content>
                                                    <v-list-item-title class="subtitle">
                                                        <span class="font-weight-bold">{{ i + 1 }}.</span>
                                                        {{ e.description }}
                                                    </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                        <p v-else class="mt-4 ml-8">Pas d'instructions :(</p>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-actions>
        </v-card>
        <v-btn color="primary" @click="$emit('next')">Crée votre recette</v-btn>
        <v-btn text @click="$emit('back')">Annuler</v-btn>
    </div>
</template>


<script>
import {
    recepie_types,
    cook_types
} from '~/configs/shared/recepie-types.constants'
import PhotoGallery from '../common/PhotoGallery.vue'
export default {
    props: {
        value: {
            type: Object,
        },
    },
    data() {
        return {
            form: true,
            recepie_types,
            cook_types
        };
    },
    computed: {
        total_time() {
            const preparation = this.value.estimated_preparation_time;
            const cook = this.value.estimated_cook_time;
            const rest = this.value.estimated_rest_time;
            console.log(JSON.stringify({ preparation, cook, rest }));
            const total_min = parseInt("0" + preparation.min) + parseInt("0" + cook.min) + parseInt("0" + rest.min);
            const total_hour = parseInt("0" + preparation.hour) + parseInt("0" + cook.hour) + parseInt("0" + rest.hour);
            const delta_hour = total_min / 60;
            console.log(total_min, delta_hour);
            const hours = Math.floor(delta_hour) + total_hour;
            const mins = total_min % 60;
            return `${hours > 0 ? hours + "h" : ""}${mins <= 9 ? "0" + mins : mins}`;
        },
        getTypeLabel() {
            return this.recepie_types.find((e) => e.id == this.value.type).label;
        },
        getCookTypeLabel() {
            return this.cook_types.find((e) => e.id == this.value.cook_type).label;
        },
        getDifficultyLabel() {
            switch (this.value.difficulty) {
                case 1:
                    return "Facile";
                case 2:
                    return "Moyen";
                case 3:
                    return "Difficile";
                case 4:
                default:
                    return "Très difficle";
            }
        },
        getCostLabel() {
            switch (this.value.cost) {
                case 1:
                    return "Bon marché";
                case 2:
                    return "Coût moyen";
                case 3:
                default:
                    return "Assez cher";
            }
        }
    },
    components: { PhotoGallery }
}
</script>