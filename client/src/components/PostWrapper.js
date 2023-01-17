import React, { memo, useEffect } from "react";
import { UPDATE_POST } from "../actions/types";
import { getUser } from "../services/user.service";
import store from "../store";
import PostView from "./PostView";

function PostWrapper(props) {
  useEffect(() => {
    getUser(props.post.user);
    store.dispatch({ type: UPDATE_POST, post: props.post });
  }, [props.post]);
  return <PostView></PostView>;
}

export default memo(PostWrapper);
