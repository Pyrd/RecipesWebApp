import { Middleware } from '@nuxt/types'
const authentification: Middleware = (context) => {
  const { app, store, redirect } = context

  if (!store.getters['modules/auth/isLoggedIn']) {
    return redirect(app.localePath('/login'))
  }
}

export default authentification
