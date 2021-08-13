<template>
  <v-footer app absolute padless class="footer text-ellipse">
    <v-row
      class="mt-4"
      align="center"
      justify="center"
      justify-sm="space-between"
    >
      <v-col cols="12" sm="3" class="box px-2">
        <span>© Mathieu CAILLY 2020</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 2em;
  background: transparent !important;
}
</style>
