import {decodeToken} from 'react-jwt'
import {Constants} from '../constants'
import store from '../store'
import {
    SIGN_OUT,
    SIGN_IN
  } from "../actions/types";

export const isLogin = () => {
    const token = localStorage.getItem(Constants.localStorage.authToken)
    if(token) {
        const user = decodeToken(token)
        if (!user) {
            localStorage.removeItem(Constants.localStorage.authToken)
            store.dispatch({type: SIGN_OUT})
            return false
        } 
        const userId = user._id
        store.dispatch({type: SIGN_IN, userId})
        return true
    } else {
        return false
    }
}
