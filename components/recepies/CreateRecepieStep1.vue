<template >
  <div>
    <v-card outlined class="mb-12 py-4" height="300px" width="100%">
      <v-card-actions class="fwidth fheight px-12">
        <v-form v-model="form" class="fwidth py-4">
          <p>
            <b class="font-weight-bold">Nom</b>
          </p>
          <v-text-field solo class="fwidth" v-model="value.name" clearable></v-text-field>
          <p>
            <b class="font-weight-bold">Acccès</b>
          </p>
          <!-- // TODO: Category/Tag system based on name and ciaqules cat name -->

          <v-btn-toggle v-model="value.access" color="primary">
            <v-btn text>Publique</v-btn>

            <v-btn>Privée</v-btn>
          </v-btn-toggle>
        </v-form>
      </v-card-actions>
    </v-card>
    <v-btn color="primary" @click="$emit('next')">Continuer</v-btn>
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
      form: true
    }
  }
}
</script>