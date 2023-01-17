import { UPDATE_POST, UPDATE_POSTS } from "../actions/types";
import store from "../store";

const INITIAL_STATE = {};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_POST:
      return { ...state, post: action.post };
    default:
      return state;
  }
};

export default postReducer;
