<template>
  <v-row>
    <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4"> </v-col>
  </v-row>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class yourComponent extends Vue {}
</script>
<style lang="scss" scoped></style>
