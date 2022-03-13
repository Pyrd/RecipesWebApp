<template >
  <div>
    <v-card outlined class="mb-12 py-4" width="100%">
      <v-card-actions class="fwidth fheight px-12">
        <div>
          <v-form ref="form" v-model="form" lazy-validation>
            <v-row class="d-flex flex-column mb-2">
              <span class="font-weight-bold">Nom</span>
              <p>
                <b class="primary--text font-weight-bold">{{ value.name }}</b>
              </p>
            </v-row>
            <!-- Type de recette -->
            <v-row class="d-flex flex-column mb-2">
              <span class="font-weight-bold">Types de recette</span>
              <v-row class="my-2">
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

                        <span :class="value.type == e.id ? 'primary--text font-weight-bold' : ''">{{ e.label }}</span>
                      </v-card>
                    </template>
                  </v-hover>
                </v-col>
              </v-row>
              <v-alert v-if="errors.type" dense outlined type="error">Indiquer le type de recette</v-alert>
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
                    required
                    :rules="[rules.required]"
                    onkeypress="if ( isNaN(this.value + String.fromCharCode(event.keyCode) )) return false;"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    class="d-inline"
                    v-model="value.person_count_unit"
                    placeholder="Personnes"
                    solo
                    required
                    :rules="[rules.required]"
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
                    type="number"
                    v-model.number="value.estimated_preparation_time.hour"
                    placeholder="Heures"
                    solo
                    onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
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
                    :rules="[rules.minutes]"
                    onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-alert v-if="errors.preparation" dense outlined type="error">Indiquer le temps de préparation</v-alert>
            </v-row>
            <!-- Temps de cuisson -->
            <v-row class="d-flex flex-column mb-2">
              <span class="font-weight-bold">Temps de cuisson</span>
              <v-row class="mt-2">
                <v-col cols="3">
                  <v-text-field
                    type="number"
                    v-model.number="value.estimated_cook_time.hour"
                    placeholder="Heures"
                    solo
                    onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
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
                    :rules="[rules.minutes]"
                    onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-alert v-if="errors.cook" dense outlined type="error">Indiquer le temps de cuisson</v-alert>
            </v-row>
            <!-- Temps de repos -->
            <v-row class="d-flex flex-column mb-2">
              <span class="font-weight-bold">Temps de repos</span>
              <v-row class="mt-2">
                <v-col cols="3">
                  <v-text-field
                    type="number"
                    v-model.number="value.estimated_rest_time.hour"
                    placeholder="Heures"
                    solo
                    onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
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
                    :rules="[rules.minutes]"
                    onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-alert v-if="errors.rest" dense outlined type="error">Indiquer le temps de repos</v-alert>
            </v-row>
            <!-- Types de cuisson -->
            <v-row class="d-flex flex-column mb-2">
              <span class="font-weight-bold">Types de cuisson</span>
              <v-row class="my-2">
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
                        <span :class="value.cook_type == e.id ? 'primary--text font-weight-bold' : ''">{{
                          e.label
                        }}</span>
                      </v-card>
                    </template>
                  </v-hover>
                </v-col>
              </v-row>
              <v-alert v-if="errors.cook_type" dense outlined type="error">Indiquer le type de cuisson</v-alert>
            </v-row>
            <!-- Difficulty -->
            <v-row class="d-flex flex-column mb-2">
              <span class="font-weight-bold">Difficulté</span>
              <v-row class="mt-2 mb-3 d-flex">
                <v-rating v-model="value.difficulty" class="d-flex ml-2" length="4">
                  <template v-slot:item="props">
                    <div
                      @click="props.click"
                      class="rounded-circle circle mr-2"
                      :class="props.isFilled ? 'primary' : 'grey lighten-1'"
                    ></div>
                  </template>
                </v-rating>
                <div v-if="value.difficulty" class="centered">{{ getDifficultyLabel }}</div>
              </v-row>
              <v-alert v-if="errors.difficulty" dense outlined type="error">Indiquer la difficulté</v-alert>
            </v-row>
            <!-- Cost -->
            <v-row class="d-flex flex-column mb-2">
              <span class="font-weight-bold">Coûts</span>
              <v-row class="mt-2 mb-2 d-flex">
                <v-rating v-model="value.cost" class="d-flex ml-2" length="3" required>
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
              <v-alert v-if="errors.cost" class="mt-4" dense outlined type="error">Indiquer le coût</v-alert>
            </v-row>
            <!-- Photos -->
            <v-row class="d-flex flex-column mb-12">
              <span class="font-weight-bold">Photos</span>
              <v-row class="mt-8 d-flex">
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
    <v-btn color="primary" @click="submit">Continuer</v-btn>
    <v-btn text @click="$emit('back')">Retour</v-btn>
  </div>
</template>


<script>
import PhotoInput from '~/components/common/PhotoInput.vue'
import { recepie_types, cook_types } from '~/configs/shared/recepie-types.constants'

export default {
  props: {
    value: {
      type: Object
    }
  },
  components: {
    PhotoInput
  },
  data() {
    return {
      recepie_types,
      cook_types,
      form: true,
      input_photo: null,
      photo_count: 0,
      photos: [null],
      photo_lock: false,
      errors: {
        cost: false,
        difficulty: false,
        type: false,
        cook_type: false,
        preparation: false,
        cook: false,
        rest: false
      },
      rules: {
        required: (v) => !!v || 'Ce champs est obligatoire',
        minutes: (v) => (v >= 0 && v <= 59) || 'La valeur doit être comprise entre 0 et 59'
      }
    }
  },
  watch: {
    photos(val, old) {
      if (!this.photo_lock) {
        this.photo_lock = true
        let count = 0
        for (let i = 0; i < val.length; i++) {
          const e = val[i]
          if (e != null) {
            count++
          } else {
            val.splice(i, 1)
          }
        }
        if (count <= 15) {
          val.push(null)
        }
        this.photo_count = count
        this.value.images = val.filter((e) => e != null).map((e) => ({ url: e.image, filename: e.name, type: e.type }))
        setTimeout(() => {
          this.photo_lock = false
        }, 100)
      }
    },
    value: {
      deep: true,
      handler(val, old) {
        this.checkFormCorrection()
      }
    }
  },
  computed: {
    // getCanSubmit() {
    // return this.value.difficulty && this.value.cost && this.value.cook_type && this.value.type && this.
    // },
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
  },
  methods: {
    submit() {
      this.$refs.form.validate()
      if (this.form && this.checkFormValidity()) {
        this.$emit('next')
      }
    },
    checkFormValidity() {
      this.errors = {
        cost: false,
        difficulty: false,
        type: false,
        cook_type: false,
        preparation: false,
        cook: false,
        rest: false
      }
      if (!this.value.type) {
        this.errors.type = true
      }
      if (!this.value.difficulty) {
        this.errors.difficulty = true
      }
      if (!this.value.cost) {
        this.errors.cost = true
      }
      if (!this.value.cook_type) {
        this.errors.cook_type = true
      }
      if (
        !this.value.estimated_cook_time.min &&
        !this.value.estimated_cook_time.hour &&
        this.value.estimated_cook_time.min != '0' &&
        this.value.estimated_cook_time.hour != '0'
      ) {
        this.errors.cook = true
      }
      if (
        !this.value.estimated_preparation_time.min &&
        !this.value.estimated_preparation_time.hour &&
        this.value.estimated_preparation_time.min != '0' &&
        this.value.estimated_preparation_time.hour != '0'
      ) {
        this.errors.preparation = true
      }
      if (
        !this.value.estimated_rest_time.min &&
        !this.value.estimated_rest_time.hour &&
        this.value.estimated_rest_time.min != '0' &&
        this.value.estimated_rest_time.hour != '0'
      ) {
        this.errors.rest = true
      }
      console.log(
        Object.keys(this.errors).map((e) => this.errors[e]),
        Object.keys(this.errors)
          .map((e) => this.errors[e])
          .reduce((prev, curr, i) => {
            return prev && curr
          })
      )
      for (let key of Object.keys(this.errors)) {
        const e = this.errors[key]
        if (e) {
          return false
        }
      }
      return true
    },
    checkFormCorrection() {
      if (this.value.type) {
        this.errors.type = false
      }
      if (this.value.difficulty) {
        this.errors.difficulty = false
      }
      if (this.value.cost) {
        this.errors.cost = false
      }
      if (this.value.cook_type) {
        this.errors.cook_type = false
      }

      if (this.value.estimated_cook_time.min || this.value.estimated_cook_time.hour) {
        this.errors.cook = false
      }
      if (this.value.estimated_preparation_time.min || this.value.estimated_preparation_time.hour) {
        this.errors.preparation = false
      }
      if (this.value.estimated_rest_time.min || this.value.estimated_rest_time.hour) {
        this.errors.rest = false
      }

      return Object.keys(this.errors).reduce((prev, curr, i) => {
        return prev && curr
      })
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
</style>