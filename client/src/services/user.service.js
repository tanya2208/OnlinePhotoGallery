import { UPDATE_USER } from "../actions/types";
import { Constants } from "../constants";
import store from "../store";
import { sendRequest } from "./fetch.service";

export function getUser(userId){
    sendRequest({
        url: Constants.http.url + Constants.path.user + "/" + userId,
        method: "GET",
      })
        .then((res) => {
          store.dispatch({
            type: UPDATE_USER,
            user: res.user,
            images: res.images,
          });
          return res.user
        })
        .catch((err) => {
          console.log(err.message);
        });
}

export function getAdminAccess(loggedUserId, ownerId){
    if(loggedUserId === ownerId) return true
}