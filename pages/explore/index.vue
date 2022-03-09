<template>
  <div class="d-flex flex-column flex-grow-1">
    <h1>Explore new recepies</h1>
    <div class="d-flex">
      <v-row>
        <v-col v-for="(e, i) in showcase" :key="'showcase-' + i" cols="3">
          <!-- <v-card solo elevation="6">
            <v-card-title>
              {{ e.name }}
            </v-card-title>
            <v-card-subtitle>
              {{ e.total_duration }} - {{ e.person_count }} {{ e.person_count_unit }} - {{ e.difficulty }} -
              {{ e.cost }}
            </v-card-subtitle>
            <v-card-text> </v-card-text>
          </v-card> -->

          <v-card :loading="loading" class="mx-auto my-12" max-width="">
            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>

            <v-img height="150" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

            <v-card-title class="primary--text text-h6 font-weight-medium word-keep-all pb-0">{{
              e.name
            }}</v-card-title>

            <v-card-text>
              <!-- <v-row align="center" class="mx-0">
                <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                <div class="grey--text ms-4">4.5 (413)</div>
              </v-row> -->

              <div class="my-4 text-subtitle-1">
                <div v-for="(chip, j) in getChips(e)" :key="`chip-${i}-${j}`" class="d-inline ml-1">
                  <v-chip :color="chip.color" dark>{{ chip.label }}</v-chip
                  ><span class="ml-1" v-if="j != getChips(e).length - 1">•</span>
                </div>
              </div>

              <div v-if="e.description">
                {{ e.description }}
              </div>
            </v-card-text>

            <v-card-text>
              <v-hover v-slot="{ hover }">
                <v-btn icon :color="hover ? 'error' : ''">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-hover>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const { showcase } = await $axios.$get('/api/recepie/explore')
    return {
      showcase
    }
  },
  data() {
    return {
      showcase: [],
      loading: false,
      selection: 1
    }
  },
  methods: {
    getChips(item) {
      const tags = []
      tags.push({
        label: '$'.repeat(item.cost),
        color: 'success'
      })
      const { label, color } = this.getDifficultyLabel(item.difficulty)
      tags.push({
        label: label,
        color: color
      })

      const time = this.getTotalTime(item.total_duration)
      tags.push({
        label: time,
        color: 'primary'
      })

      return tags
    },
    getDifficultyLabel(difficulty) {
      switch (difficulty) {
        case 1:
          return { label: 'Facile', color: '#59c982' }
        case 2:
          return { label: 'Moyen', color: '#1fbcf4' }
        case 3:
          return { label: 'Difficile', color: '#a84900' }
        case 4:
          return { label: 'Très difficle', color: '#a80035' }

        default:
          return { label: '', color: '' }
      }
    },
    getTotalTime(duration) {
      const delta_hour = duration / 60
      const hours = Math.floor(delta_hour)
      const mins = duration % 60
      return `${hours > 0 ? hours + 'h' : ''}${mins <= 9 ? '0' + mins : mins}`
    },
    getTypeLabel(type) {
      if (!type) {
        return ''
      }
      return this.recepie_types.find((e) => e.id == type).label
    }
  }
}
</script>
