export default function ({ redirect, store }) {
  const isAuth = store.getters['auth/loggedIn']
  if (!store.state.auth.loggedIn) {
    return redirect("/login");
  }
}