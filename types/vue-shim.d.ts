import Vue from 'vue'

/* This file simply imports the needed types from firebase and forwards them */
declare module 'vue/types/vue' {
  interface Vue {
    $fire: any
    $fireModule: any
    $isMobile: Function
    _i18n: any
    $anime: any
    $notifyWarn: Function
    $notifySuccess: Function
    $notifyError: Function
    $notifyInfo: Function
    $recaptcha: any
  }
}
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
