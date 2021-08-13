import Vue from 'vue'

const generateErrorMessage = (msg: Error) => {
  if (process.env.NODE_ENV === 'local') return msg
  return 'An error occured ! Please try again later.'
}

Vue.config.errorHandler = (err: Error, vm: Vue, info: string) => {
  console.log('Error handler', err)
  // vm.$store.dispatch('modules/notification/notify', {
  //   payload: {
  //     message: generateErrorMessage(err),
  //     level: INotifyLevel.ERROR,
  //   },
  // })
}

window.onunhandledrejection = (event: PromiseRejectionEvent) => {
  console.log('Logged in window.onunhandledrejection', event)
  event.stopImmediatePropagation()
}
