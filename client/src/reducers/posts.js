import { DELETE_POST, UPDATE_POSTS } from "../actions/types";

const INITIAL_STATE = [];

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_POSTS:
      let posts = [];
      if (action.post) {
        posts = state.posts.map((post) => {
          if (post._id == action.post._id) {
            return { ...post, comments: action.post.comments };
          }
        });
      } else {
        posts = [...action.posts];
      }
      return { ...state, posts: posts };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.postId),
      };
    default:
      return state;
  }
};

export default postsReducer;
