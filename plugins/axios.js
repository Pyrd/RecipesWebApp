// plugins/axios.js
export default function ({ $axios, store, $cookies, error: nuxtError }) {
    // $axios.onError(error => {
    //     nuxtError({
    //         statusCode: error.response.status,
    //         message: error.message,
    //     });
    //     return Promise.resolve(false);
    // })
    // $axios.onRequest(config => {
    //     const jwt = $cookies.get('jwt')
    //     console.log('Making request to ' + config.url, `with jwt ${jwt}`)
    //     if (jwt) {
    //         $axios.setHeader('Authorization', `Bearer ${jwt}`)
    //     }
    // })


}