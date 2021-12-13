export default function ({ redirect, store }) {
    const isAuth = store.getters['auth/isAuth']
    console.log(`CHECK AUTH middleware state: ${isAuth}`)
    if (isAuth) {
        redirect({ name: '/' })
    }
}