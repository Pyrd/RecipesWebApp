<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        outlined
        label="Date"
        persistent-hint
        :prepend-inner-icon="calendarIcon"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, VModel } from 'vue-property-decorator'

import { mdiCalendar } from '@mdi/js'
@Component({})
export default class TimePicker extends Vue {
  @VModel({ type: String }) selectedDate!: string

  calendarIcon = mdiCalendar
  date = new Date().toISOString().substr(0, 10)
  dateFormatted = this.formatDate(new Date().toISOString().substr(0, 10))
  menu = false

  @Watch('date')
  handleDateChange(val: string) {
    // console.log('1. handleDateChange', val)
    this.dateFormatted = this.formatDate(val)
    this.selectedDate = val
    // console.log('1. handleDateChange formated:', this.selectedDate)
  }

  mounted() {
    if (
      this.selectedDate != null &&
      this.selectedDate.length > 0 &&
      this.selectedDate[0].length > 0
    )
      this.date = this.selectedDate
  }

  formatDate(date: string) {
    // console.log('FORMATDATE', date)
    if (!date) return ''

    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }
  parseDate(date: string) {
    if (!date) return ''

    const [month, day, year] = date.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }
}
</script>
<style lang="scss" scoped></style>
