<template>
  <div>
    <v-dialog
      v-model="dialog"
      :width="options.width"
      v-bind:style="{ zIndex: options.zIndex }"
    >
      <slot @agree="agree" @cancel="cancel" @data="dialogData"></slot>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Provide,
  Watch,
  ProvideReactive,
} from 'nuxt-property-decorator'
@Component({})
export default class Modal extends Vue {
  dialog = false
  options = {
    width: 400,
    zIndex: 200,
  }

  dialogData!: any

  resolve: any = null
  reject: any = null

  @Watch('dialog')
  handleDialog(val: boolean, oldVal: boolean) {
    this.dialogState = val
  }

  open(options: any = {}) {
    this.dialog = true
    this.options = Object.assign(this.options, options)
    if (options.data !== null) {
      this.dialogData = options.data
    }

    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
  agree(data: any) {
    this.resolve(data)
    this.dialog = false
  }
  cancel() {
    this.reject()
    this.dialog = false
  }
  dataTransfer() {
    return this.dialogData
  }

  @Provide('data') dataTransferCallback = this.dataTransfer
  @Provide('agree') agreeCallback = this.agree
  @Provide('cancel') cancelCallback = this.cancel
  @ProvideReactive() dialogState = this.dialog
}
</script>
<style lang="scss" scoped></style>
