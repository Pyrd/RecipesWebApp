<template>
  <v-card>
    <v-card-title>XXX</v-card-title>
    <v-card-actions class="px-4"> </v-card-actions>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="cancel" text outlined color="error">Cancel</v-btn>
      <v-btn
        @click="agree"
        text
        outlined
        color="success"
        class="mr-4"
        :disabled="!valid"
        >Create</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Inject,
  Watch,
  Prop,
  InjectReactive,
} from 'nuxt-property-decorator'
@Component({ components: {} })
export default class ModalCard extends Vue {
  @Inject('agree') readonly agreeCallback!: (itemData: any) => void
  @Inject('cancel') readonly cancelCallback!: () => void
  @Inject('data') readonly dataCallback!: () => any
  @InjectReactive() dialogState!: boolean

  mounted() {
    this.init()
  }
  init() {
    this.reset()
    if (this.dataCallback !== null) {
      const data = this.dataCallback()
      if (data !== null) {
      }
    }
  }

  reset() {}

  @Watch('dialogState')
  handleDialogState(val: boolean, oldVal: boolean) {
    if (val) {
      this.init()
    }
  }

  agree() {
    this.agreeCallback(null)
    this.reset()
  }

  cancel() {
    this.cancelCallback()
    this.reset()
  }
}
</script>
<style lang="scss" scoped></style>
