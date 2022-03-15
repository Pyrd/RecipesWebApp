import axios from 'axios'
import firebase from "@nuxtjs/firebase";

const BASE_URL = process.env.baseURL

export const userService = axios.create({
  baseURL: `${BASE_URL}/user`,
})

// export const getFirebaseToken = async () => {
//   return await firebase.auth().currentUser?.getIdToken()
// }


export const axiosConfig = async (token: string | undefined = undefined) => {
  const config: any = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      location: '',
    },
  }

  if (token == undefined) {
    // token = await getFirebaseToken()
    config.headers['Authorization'] = `Bearer ${token}`
  } else {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}

export const defaultService = axios.create()

