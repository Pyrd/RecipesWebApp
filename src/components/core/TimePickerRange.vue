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
      range
      no-title
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, VModel } from 'vue-property-decorator'

import { mdiCalendar } from '@mdi/js'
@Component({})
export default class TimePickerRange extends Vue {
  @VModel() selectedDate!: Array<string>

  calendarIcon = mdiCalendar
  date = [new Date().toISOString().substr(0, 10)]
  menu = false
  isMounted = false

  mounted() {
    this.isMounted = true
    if (
      this.selectedDate != null &&
      this.selectedDate.length > 0 &&
      this.selectedDate[0].length > 0
    )
      this.date = this.selectedDate
  }

  @Watch('date')
  handleDateChange(val: Array<string>) {
    // console.log('1. handleDateChange', val)

    this.selectedDate = [...this.date].sort() //this.formatDate(this.date)
    // console.log('1. handleDateChange', this.selectedDate)
  }

  formatDate(date: Array<string>) {
    if (!date || date.length == 0) return ['']

    return [...this.date].sort().map((e) => this.formatOneDate(e))
  }

  formatOneDate(date: string) {
    // console.log('FORMATDATE', date)
    if (!date) return ''

    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  get dateFormatted() {
    let parsed = ''
    const data = [...this.date].sort()
    for (let d of data) {
      parsed += `${parsed.length == 0 ? '' : ' to '}${this.formatOneDate(d)}`
    }

    return parsed
  }
}
</script>
<style lang="scss" scoped></style>
