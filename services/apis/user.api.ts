
import { axiosConfig, userService} from '../api'


export const API_GetMe = async (token: string | undefined = undefined) => {

    let res
    try {
        res = await userService.get(`/me`, await axiosConfig(token))
    } catch (err) {
        console.error("API_GetMe", err)
        throw err
    } finally {

    }
    return res.data
}
