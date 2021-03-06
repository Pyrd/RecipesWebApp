// plugins/axios.js
export default function ({ $axios, store, $fireModule, error: nuxtError }) {

    $axios.onRequest(config => {
        const jwt = store.getters['auth/getUser']
        // console.log('Making request to ' + config.url, `with jwt ${jwt.token}`)
        if (jwt && jwt.token) {
            $axios.setHeader('Authorization', `Bearer ${jwt.token
                }`)
        }
    })

    // export default ({ $axios, env }) => {
    //     $axios.onRequest(config => {
    //         config.headers.common['Authorization'] = `Bearer ${env.WP_API_KEY}`;
    //     });
    // }


}