<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Edit Recepie <copy-label :text="'#' + recepie.id + ''" /></div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click="refresh">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
    <v-row>
      <v-col>
        <v-card outlined class="mb-12 py-4" width="100%">
          <v-card-actions>
            <PhotoGallery :images="recepie.images" class="fwidth fheigth" />
          </v-card-actions>
          <v-card-actions class="fwidth fheight px-12">
            <v-form v-model="form" class="fwidth py-4">
              <v-row class="mb-2">
                <v-col cols="12" md="6">
                  <v-row>
                    <v-col cols="12">
                      <span class="font-weight-bold">Nom</span>
                      <div class="d-flex align-center">
                        <b class="primary--text font-weight-bold">{{ recepie.name }}</b>
                        <v-chip class="ml-2" color="primary">{{ recepie.access == 0 ? 'Publique' : 'Privée' }}</v-chip>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <p class="font-weight-bold">Ingrédients</p>
                      <v-row>
                        <v-list class="fwidth pr-8">
                          <div v-for="(e, i) in recepie.items" :key="i">
                            <v-list-item outlined class="fwidth outlined-list-item mb-2">
                              <v-list-item-avatar>
                                <!-- <img :src="e.images[0].url" /> -->
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title class="font-weight-bold subtitle"
                                  >{{ e.count }} {{ e.unit }} {{ e.item.label_fr }}
                                  {{ e.complement }}</v-list-item-title
                                >
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
                        <b class="primary--text font-weight-bold">{{ recepie.total_duration }}</b>
                      </p>
                    </v-col>
                    <v-col cols="4">
                      <span class="font-weight-bold">Portions</span>
                      <p>
                        <b class="primary--text font-weight-bold"
                          >{{ recepie.person_count }} {{ recepie.person_count_unit }}</b
                        >
                      </p>
                    </v-col>
                    <v-col cols="4">
                      <span class="font-weight-bold">Type de cuisson</span>
                      <p>
                        <b class="primary--text font-weight-bold">{{ getCookTypeLabel }}</b>
                      </p>
                    </v-col>
                    <v-col cols="4">
                      <span class="font-weight-bold">Difficulté</span>
                      <p>
                        <b class="primary--text font-weight-bold">{{ getDifficultyLabel }}</b>
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
                        <v-list class="fwidth pr-8" v-if="recepie.instructions && recepie.instructions.length > 0">
                          <v-list-item
                            v-for="(e, i) in recepie.instructions"
                            :key="i"
                            outlined
                            class="fwidth outlined-list-item mb-2"
                          >
                            <v-list-item-content>
                              <v-list-item-title class="subtitle">
                                <span class="font-weight-bold">{{ i + 1 }}.</span>
                                {{ e }}
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
      </v-col>
    </v-row>

    <!-- <div class="mb-4">
      <div class="d-flex">
        <span class="font-weight-bold">Email</span>
        <span class="mx-1">
          <copy-label :text="user.email" />
        </span>
      </div>
      <div class="d-flex">
        <span class="font-weight-bold">ID</span>
        <span class="mx-1">
          <copy-label :text="user.id + ''" />
        </span>
      </div>
    </div> -->
  </div>
</template>

<script>
import CopyLabel from '~/components/common/CopyLabel'
import { recepie_types, cook_types } from '~/configs/shared/recepie-types.constants'
import PhotoGallery from '~/components/common/PhotoGallery.vue'
export default {
  middleware: 'admin',
  components: {
    CopyLabel,
    PhotoGallery
  },
  async asyncData({ $axios, route }) {
    const resp = await $axios.$get(`/api/recepie/${route.query.id}`, {
      params: {
        addItems: true
      }
    })
    return {
      id: route.query.id,
      recepie: resp
    }
  },
  methods: {
    async refresh() {
      this.recepie = await this.$axios.$get(`/api/recepie/${this.id}`)
      this.$notifySuccess('Data refresh successfully')
    }
  },
  data() {
    return {
      tab: null,
      breadcrumbs: [
        {
          text: 'Recepies',
          to: '/recepie',
          exact: true
        },
        {
          text: 'Edit Recepie'
        }
      ],
      form: true,
      recepie_types,
      cook_types
    }
  },
  computed: {
    total_time() {
      const preparation = this.recepie.estimated_preparation_time
      const cook = this.recepie.estimated_cook_time
      const rest = this.recepie.estimated_rest_time
      const total_min = parseInt('0' + preparation.min) + parseInt('0' + cook.min) + parseInt('0' + rest.min)
      const total_hour = parseInt('0' + preparation.hour) + parseInt('0' + cook.hour) + parseInt('0' + rest.hour)
      const delta_hour = total_min / 60
      const hours = Math.floor(delta_hour) + total_hour
      const mins = total_min % 60
      return `${hours > 0 ? hours + 'h' : ''}${mins <= 9 ? '0' + mins : mins}`
    },
    getTypeLabel() {
      if (!this.recepie.type) {
        return ''
      }
      return this.recepie_types.find((e) => e.id == this.recepie.type).label
    },
    getCookTypeLabel() {
      if (!this.recepie.cook_type) {
        return ''
      }
      return this.cook_types.find((e) => e.id == this.recepie.cook_type).label
    },
    getDifficultyLabel() {
      switch (this.recepie.difficulty) {
        case 1:
          return 'Facile'
        case 2:
          return 'Moyen'
        case 3:
          return 'Difficile'
        case 4:
          return 'Très difficle'

        default:
          return ''
      }
    },
    getCostLabel() {
      switch (this.recepie.cost) {
        case 1:
          return 'Bon marché'
        case 2:
          return 'Coût moyen'
        case 3:
          return 'Assez cher'

        default:
          return ''
      }
    }
  }
}
</script>
