import axios from 'axios'
export const contactService = axios.create({
  baseURL: `https://<host>/api/contact`,
})

const axiosConfig = () => {
  const token = ''
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      location: '',
    },
  }
}

export const sendContactMessage = async (data: any) => {
  console.time('sendContactMessage')
  let res
  try {
    res = await contactService.post(`/`, data, axiosConfig())
  } catch (err) {
    throw new Error('Failed to send messageaa')
  } finally {
    console.timeEnd('sendContactMessage')
  }
  return
}
