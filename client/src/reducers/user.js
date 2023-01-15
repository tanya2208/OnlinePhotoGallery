import { ADD_IMAGE, UPDATE_USER } from "../actions/types";

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, user: action.user, images: action.images };
    case ADD_IMAGE:
      return {
        ...state,
        user: state.user,
        images: [...state.images, action.image],
      };
    default:
      return state;
  }
};

export default userReducer;
