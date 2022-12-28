import {decodeToken} from 'react-jwt'
import {Constants} from '../constants'

export const isLogin = () => {
    const token = localStorage.getItem(Constants.localStorage.authToken)
    if(token) {
        const user = decodeToken(token)
        if (!user) {
            localStorage.removeItem(Constants.localStorage.authToken)
            return false
        } 
        return true
    } else {
        return false
    }
}
