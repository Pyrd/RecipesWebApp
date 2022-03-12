export default function ({ $auth, redirect, next }) {
    // console.log($auth.hasScope('ADMIN'))
    // console.log($auth.user.role)
    if ($auth.user.role != 'ADMIN') {
        return redirect('/')
    }
    next()
}