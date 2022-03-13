import { Middleware } from '@nuxt/types'
const admin: Middleware = (context) => {
  const { app, store, redirect } = context
  // console.log("Admin middleware")
  const isLoggedIn = store.getters['auth/isLoggedIn']
  // console.log("isLoggedIn", isLoggedIn)

  if (!isLoggedIn) {
    return redirect('/')
  }
  const role = store.getters['auth/getRole']
  // console.log("role", role)

  if (!role || role != 'ADMIN') {
    return redirect('/')
  }
}

export default admin
