<template >
  <div>
    <v-card outlined class="mb-12 py-4" width="100%">
      <v-card-actions class="fwidth fheight px-12">
        <v-form v-model="form" class="fwidth">
          <v-row class="d-flex flex-column mb-2">
            <span class="font-weight-bold">Nom</span>
            <p>
              <b class="primary--text font-weight-bold">{{ value.name }}</b>
            </p>
          </v-row>

          <!-- Ingrédients -->
          <v-row class="d-flex flex-column mb-2 fwidth">
            <span class="font-weight-bold">Ingrédients</span>
            <v-card outlined class="px-4 py-2 mt-2">
              <v-row class="mt-2 fwidth">
                <v-col cols="12" md="6">
                  <v-autocomplete
                    height="56px"
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
                        <v-list-item-title v-html="data.item.label_fr"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.code"></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                    <template v-slot:item="data">
                      <v-list-item-avatar>
                        <img :src="data.item.images[0].url" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-html="data.item.label_fr"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.code"></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="6" md="2">
                  <v-text-field
                    height="56px"
                    type="number"
                    v-model="ingredient_query_count"
                    placeholder="Quantité"
                    solo
                  ></v-text-field>
                </v-col>
                <v-col cols="6" md="4">
                  <v-autocomplete
                    height="56px"
                    solo
                    clearable
                    v-model="ingredient_query_unit"
                    :items="units"
                    :loading="unit_query_loading"
                    :search-input.sync="unit_query_search"
                    hide-no-data
                    hide-selected
                    item-text="label"
                    item-value="value"
                    placeholder="Unité"
                    return-object
                  >
                    <!-- prepend-icon="mdi-food" -->
                    <template v-slot:selection="{ item }">
                      <v-list-item-avatar v-if="item.abbr">{{ item.abbr }}</v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-html="item.label" style="height: 18px"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <template v-slot:item="{ item }">
                      <v-list-item-avatar v-if="item.abbr">{{ item.abbr }}</v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-html="item.label"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" class="d-flex">
                  <v-text-field solo v-model="ingredient_query_complement" placeholder="Compléments"></v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn solo color="success" :disabled="!instruction_valid" @click="add_ingredient">Ajouter</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-row>
          <v-row>
            <v-list class="fwidth">
              <div v-for="(e, i) in value.items" :key="i">
                <v-list-item outlined class="fwidth outlined-list-item mb-2">
                  <v-list-item-avatar>
                    <img :src="e.item.images[0].url" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold subtitle"
                      >{{ e.count }} {{ e.unit.label }} {{ e.item.label_fr }} {{ e.complement }}</v-list-item-title
                    >
                    <v-list-item-subtitle v-html="e.code"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="remove_ingredient(i)">
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </div>
            </v-list>
          </v-row>
          <v-row class="d-flex flex-column mb-2 fwidth">
            <span class="font-weight-bold">Instructions</span>
            <v-list class="fwidth">
              <draggable v-model="value.instructions" class="d-flex flex-column">
                <transition-group class="d-flex flex-column">
                  <div v-for="(e, i) in value.instructions" :key="'instruction' + i">
                    <v-list-item outlined class="fwidth outlined-list-item mb-2">
                      <v-list-item-content>
                        <v-list-item-title class="subtitle">
                          <span class="font-weight-bold">{{ i + 1 }}.</span>
                          {{ e.description }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon @click="remove_instruction(i)">
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </div>
                </transition-group>
              </draggable>
            </v-list>
            <v-card outlined class="px-4 py-2 mt-2">
              <v-row class="mt-2 fwidth">
                <v-col cols="12" md="10">
                  <v-container fluid>
                    <v-textarea
                      auto-grow
                      label="Instruction"
                      rows="2"
                      solo
                      clearable
                      v-model="instruction_model"
                      placeholder="Couper les oignons"
                      clear-icon="mdi-close-circle"
                      counter
                      :rules="instruction_rules"
                      hide-details
                    ></v-textarea>
                  </v-container>
                </v-col>
                <v-col cols="12" md="2" class="d-flex mb-2 centered">
                  <v-btn solo block color="success" :disabled="!instruction_model" @click="add_instruction"
                    >Ajouter</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-form>
      </v-card-actions>
    </v-card>
    <v-btn color="primary" @click="$emit('next')">Continuer</v-btn>
    <v-btn text @click="$emit('back')">Retour</v-btn>
  </div>
</template>


<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      form: true,
      ingredient_query_search: '',
      ingredient_query_model: null,
      ingredient_query_result: [],
      ingredient_query_loading: false,
      ingredient_query_count: null,
      unit_query_search: '',
      unit_query_loading: false,
      ingredient_query_unit: null,
      ingredient_query_complement: null,
      instruction_rules: [(v) => (v && v.length <= 300) || 'Max 300 characters'],
      instruction_model: '',
      units: [
        { value: 'LITER', label: 'litre', abbr: 'L' },
        { value: 'MILLILITER', label: 'millimetre', abbr: 'ml' },
        { value: 'DECILITER', label: 'décilitre', abbr: 'dl' },
        { value: 'CENTILITER', label: 'centilitre', abbr: 'cl' },
        { value: 'GALLONS', label: 'gallon', abbr: 'gal' },
        { value: 'OUNCE', label: 'ounce', abbr: 'oz' },
        { value: 'KILO', label: 'kilogramme', abbr: 'kg' },
        { value: 'GRAMS', label: 'gramme', abbr: 'g' },
        { value: 'SPOON', label: 'cuillère', abbr: 'sp' },
        { value: 'TEASPOON', label: 'cuillère à thé', abbr: 'tsp' },
        { value: 'TABLESPOON', label: 'cuillère à café', abbr: 'Tbs.' },
        { value: 'SOUPSPOON', label: 'cuillère à soupe', abbr: '' },
        { value: 'DESSERTSPOON', label: 'cuillère à dessert', abbr: '' },
        { value: 'CUP', label: 'coupe', abbr: 'c.' },
        { value: 'BAG', label: 'sac', abbr: '' },
        { value: 'POUCH', label: 'sachet', abbr: '' },
        { value: 'SMALL_POUCH', label: 'petit sachet', abbr: '' },
        { value: 'SALAD_BOWL', label: 'saladier', abbr: '' },
        { value: 'POUND', label: 'pount', abbr: 'lb' },
        { value: 'CUBE', label: 'cube', label_en: 'cube', abbr: '' },
        { value: 'SLAB', label: 'paveé', label_en: 'slab', abbr: '' },
        { value: 'SQUARE', label: 'carré', label_en: 'square', abbr: '' },
        { value: 'JAR', label: 'bocal', label_en: 'jar', abbr: '' },
        { value: 'BAR', label: 'barre', label_en: 'bar', abbr: '' },
        { value: 'FLASK', label: 'flacon', label_en: 'flask', abbr: '' },
        { value: 'PIECE', label: 'morceau', label_en: 'piece', abbr: '' },
        { value: 'GLASS', label: 'verre', label_en: 'glass', abbr: '' },
        { value: 'BOUQUET', label: 'bouquet', label_en: 'bouquet', abbr: '' },
        { value: 'CHIP', label: 'copeau', label_en: 'chip', abbr: '' },
        { value: 'PETAL', label: 'pétale', label_en: 'petal', abbr: '' },
        { value: 'PEBBLE', label: 'galet', label_en: 'pebble', abbr: '' },
        { value: 'SLICE', label: 'tranche', label_en: 'slice', abbr: '' },
        { value: 'LAMELLA', label: 'lamelle', label_en: 'lamella', abbr: '' },
        { value: 'DASH', label: 'lampée', label_en: 'dash', abbr: '' },
        { value: 'BUNCH', label: 'grappe', label_en: 'bunch', abbr: '' },
        { value: 'BATON', label: 'baton', label_en: 'baton', abbr: '' },
        { value: 'BATONNET', label: 'batonnet', label_en: 'batonnet', abbr: '' },
        { value: 'TRAY', label: 'barquette', label_en: 'tray', abbr: '' },
        { value: 'QUARTER', label: 'quartier', label_en: 'quarter', abbr: '' },
        { value: 'PACKET250', label: 'paquet (250g)', label_en: 'packet (250g)', abbr: '' },
        { value: 'PELLET', label: 'pastille', label_en: 'pellet', abbr: '' },
        { value: 'BLOCK', label: 'bloc', label_en: 'block', abbr: '' },
        { value: 'BOWL', label: 'bol', label_en: 'bowl', abbr: '' },
        { value: 'SHOT', label: 'dose', label_en: 'shot', abbr: '' },
        { value: 'POD', label: 'dosette', label_en: 'pod', abbr: '' },
        { value: 'JAR', label: 'pot', label_en: 'jar', abbr: '' },
        { value: 'NUT', label: 'noix', label_en: 'nut', abbr: '' },
        { value: 'BUNDLE1', label: 'fagot', label_en: 'bundle', abbr: '' },
        { value: 'BUNDLE2', label: 'botte', label_en: 'bundle', abbr: '' },
        { value: 'JAR350', label: 'pot (350g)', label_en: 'jar (350g)', abbr: '' },
        { value: 'CLOVE', label: 'gousse', label_en: 'clove', abbr: '' },
        { value: 'DROP', label: 'goutte', label_en: 'drop', abbr: '' },
        { value: 'LADLE', label: 'louche', label_en: 'ladle', abbr: '' },
        { value: 'CLUMP', label: 'touffe', label_en: 'clump', abbr: '' },
        { value: 'CAP', label: 'bouchon', label_en: 'cap', abbr: '' },
        { value: 'BALL', label: 'boule', label_en: 'ball', abbr: '' },
        { value: 'LAYER', label: 'couche', label_en: 'layer', abbr: '' },
        { value: 'BOTTLE', label: 'bouteille', label_en: 'bottle', abbr: '' },
        { value: 'POINT', label: 'pointe', label_en: 'point', abbr: '' },
        { value: 'KNIFE_POINT', label: 'pointe de couteau', label_en: 'knife point', abbr: '' },
        { value: 'HALF', label: 'moitié', label_en: 'half', abbr: '' },
        { value: 'LEAF', label: 'feuille', label_en: 'leaf', abbr: '' },
        { value: 'BOX', label: 'boite', label_en: 'box', abbr: '' },
        { value: 'PIECE', label: 'pièce', label_en: 'piece', abbr: '' },
        { value: 'EAR', label: 'épi', label_en: 'ear', abbr: '' },
        { value: 'FILET', label: 'filet', label_en: 'filet', abbr: '' },
        { value: 'THIGH', label: 'cuisse', label_en: 'thigh', abbr: '' },
        { value: 'STEM', label: 'tige', label_en: 'stem', abbr: '' },
        { value: 'HEAD', label: 'tête', label_en: 'head', abbr: '' },
        { value: 'PORTION', label: 'portion', label_en: 'portion', abbr: '' },
        { value: 'QUARTER', label: 'quartier', label_en: 'quarter', abbr: '' },
        { value: 'ROLL', label: 'rouleau', label_en: 'roll', abbr: '' },
        { value: 'LOG', label: 'bûche', label_en: 'log', abbr: '' },
        { value: 'STRAND', label: 'brin', label_en: 'strand', abbr: '' },
        { value: 'ZEST', label: 'zeste', label_en: 'zest', abbr: '' }
      ],
      errors: {}
    }
  },
  watch: {
    ingredient_query_search(val) {
      console.log(val)
      // Items have already been requested
      if (this.ingredient_query_loading) return

      this.ingredient_query_loading = true

      // Lazily load input items
      this.searchIngredients()
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.ingredient_query_loading = false))
    },
    unit_query_search(val) {
      console.log(val)
      // Items have already been requested
      if (this.unit_query_loading) return

      this.unit_query_loading = true

      // Lazily load input items
      this.searchIngredients()
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.unit_query_loading = false))
    }
  },
  computed: {
    instruction_valid() {
      return this.ingredient_query_model && this.ingredient_query_count && this.ingredient_query_unit
    },
    unit_query_items() {
      return this.unit_query_result.map((entry) => {
        const Description =
          entry.label_fr.length > this.descriptionLimit ? entry.label_fr.slice(0, 80) + '...' : entry.label_fr

        return Object.assign({}, entry, { Description })
      })
    },
    ingredient_query_items() {
      return this.ingredient_query_result.map((entry) => {
        const Description =
          entry.label_fr.length > this.descriptionLimit ? entry.label_fr.slice(0, 80) + '...' : entry.label_fr

        return Object.assign({}, entry, { Description })
      })
    }
  },
  methods: {
    async searchIngredients() {
      const query = this.ingredient_query_search
      if (query) {
        const resp = await this.$axios.$post('/api/items/search', {
          query: query
        })
        this.ingredient_query_result = resp
      }
    },
    add_ingredient() {
      this.value.items.push({
        item: this.ingredient_query_model,
        count: this.ingredient_query_count,
        unit: this.ingredient_query_unit,
        complement: this.ingredient_query_complement
      })
      this.ingredient_query_model = null
      this.ingredient_query_count = null
      this.ingredient_query_unit = null
      this.ingredient_query_complement = null
    },
    remove_ingredient(i) {
      this.value.items.splice(i, 1)
    },
    add_instruction() {
      this.value.instructions.push(this.instruction_model)
      this.instruction_model = ''
    },
    remove_instruction(i) {
      this.value.instructions.splice(i, 1)
    }
  }
}
</script>