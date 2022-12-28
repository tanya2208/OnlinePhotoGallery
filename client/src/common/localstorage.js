import { Constants } from "../constants";

export const setToken = (token) => {
    localStorage.setItem(Constants.localStorage.authToken, token);
};