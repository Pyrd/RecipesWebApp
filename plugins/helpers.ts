const helpers = (context: any, inject: any) => {
  inject('isMobile', (): boolean => {
    return context.$vuetify.breakpoint.mobile
  })

  inject('notifySuccess', (text: string): any => {
    return context.$toast.show(text, {
      theme: 'none',
      className: 'success-snackbar v-snackbar',
      position: 'top-right',
      duration: 3000,
      action: {
        text: 'Close',
        onClick: (e: any, toastObject: any) => {
          toastObject.goAway(0)
        },
        class: 'sucess-snackbar-action',
      },
    })
  })

  inject('notifyInfo', (text: string): any => {
    return context.$toast.show(text, {
      theme: 'none',
      className: 'info-snackbar',
      position: 'top-right',
      duration: 3000,
      action: {
        text: 'Close',
        onClick: (e: any, toastObject: any) => {
          toastObject.goAway(0)
        },
        class: 'sucess-snackbar-action',
      },
    })
  })

  inject('notifyWarn', (text: string): any => {
    return context.$toast.show(text, {
      theme: 'none',
      className: 'warn-snackbar',
      position: 'top-right',
      duration: 3000,
      action: {
        text: 'Close',
        onClick: (e: any, toastObject: any) => {
          toastObject.goAway(0)
        },
        class: 'sucess-snackbar-action',
      },
    })
  })

  inject('notifyError', (text: string): any => {
    return context.$toast.show(text, {
      theme: 'none',
      className: 'error-snackbar',
      position: 'top-right',
      duration: 3000,
      action: {
        text: 'Close',
        onClick: (e: any, toastObject: any) => {
          toastObject.goAway(0)
        },
        class: 'sucess-snackbar-action',
      },
    })
  })
}

export default helpers
