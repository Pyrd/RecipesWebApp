import { Middleware } from '@nuxt/types'
const unauthentified: Middleware = (context) => {
  const { app, store, redirect } = context
  const loggedIn = store.getters['auth/isLoggedIn']
  // console.log("guest middleware", loggedIn)
  if (!process.server) {
  // console.log("not server - guest middleware", loggedIn)

  }
  if (loggedIn) {
    return redirect('/dashboard/analytics/')
  }
}

export default unauthentified
