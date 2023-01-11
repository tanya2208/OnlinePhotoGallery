import { Constants } from "../constants";
import store from '../store'
import {decodeToken} from 'react-jwt'
import {
    SIGN_OUT,
    SIGN_IN
  } from "../actions/types";


export const setToken = (token) => {
    localStorage.setItem(Constants.localStorage.authToken, token);
    const userId = decodeToken(token)._id
    store.dispatch({type: SIGN_IN, userId})
};

export const deleteToken = (token) => {
    localStorage.removeItem(Constants.localStorage.authToken);
    store.dispatch({type: SIGN_OUT})
};