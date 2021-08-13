import { Middleware } from '@nuxt/types'
const unauthentified: Middleware = (context) => {
  const { app, store, redirect } = context

  if (store.getters['modules/auth/isLoggedIn']) {
    return redirect(app.localePath('/'))
  }
}

export default unauthentified
