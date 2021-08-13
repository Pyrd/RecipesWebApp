<template>
  <v-card class="contact-info darkcard white--text pl-2" flat height="100%">
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { mdiEmailOutline, mdiCity, mdiLinkedin, mdiGithub } from '@mdi/js'
// const links = require('~/static/links.json')
@Component({})
export default class ContactInfo extends Vue {}
</script>
<style lang="scss" scoped>
.contact-info {
  overflow-wrap: break-word;
}
.contact-info-text {
  font-size: 1.125rem !important;
  line-height: 1.3;
}
.darkcard {
  background: #2f2f2f;
}
</style>
