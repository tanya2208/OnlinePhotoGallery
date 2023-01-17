import { DELETE_POST, UPDATE_USER } from "../actions/types";
import { Constants } from "../constants";
import store from "../store";
import { sendRequest } from "./fetch.service";

export function deletePost(postId, isHome) {
  sendRequest({
    url: Constants.http.url + Constants.path.post + "/" + postId,
    method: "DELETE",
  })
    .then((res) => {
      if(isHome) {
        store.dispatch({ type: DELETE_POST, postId });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
