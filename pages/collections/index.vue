<template>
  <div class="d-flex flex-column flex-grow-1">
    <h1>Explore new recepies</h1>
    <div class="d-flex">
      <v-row>
        <v-col v-for="(e, i) in showcase" :key="'showcase-' + i">
          <v-card>
            <v-card-title>
              {{ e.name }}
            </v-card-title>
            <v-card-text>
              {{ e.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  async asyncData({ $axios }) {
    const { showcase } = await $axios.$get('/api/recepie/explore')
    console.log(resp)
    return {
      showcase
    }
  },
  data() {
    return {
      showcase: []
    }
  }
}
</script>
