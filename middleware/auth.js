export default function ({ redirect, store }) {
  const isAuth = store.getters['auth/isAuth']
  console.log(`Auth middleware state: ${isAuth}`)
  if (!isAuth) {
    redirect({ name: 'login' })
  }
}