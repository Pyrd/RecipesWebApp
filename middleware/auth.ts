import { Middleware } from '@nuxt/types'
const authentification: Middleware = (context) => {
  const { app, store, redirect } = context
  const loggedIn = store.getters['auth/isLoggedIn']
  console.log("authentification middleware",loggedIn)
  if (!loggedIn) {
    return redirect('/auth/login')
  }
}

export default authentification
