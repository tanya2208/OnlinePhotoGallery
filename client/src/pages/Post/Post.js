import React, { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Constants } from "../../constants";
import { sendRequest } from "../../services/fetch.service";
import "./Post.css";
import { getUser } from "../../services/user.service";
import store from "../../store";
import { UPDATE_POST } from "../../actions/types";
import PostView from "../../components/PostView";
import { useSelector } from "react-redux";
import { deletePost } from "../../services/post.service";

function Post() {
  const params = useParams();
  const postState = useSelector((state) => state.postReducer.post);
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    getImage();
  }, [params.postId]);

  function getImage() {
    sendRequest({
      url: Constants.http.url + Constants.path.post + "/" + params.postId,
      method: "GET",
    })
      .then((res) => {
        // getUser(res.post.user);
        store.dispatch({ type: UPDATE_POST, post: res.post });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const deleteHandler = useCallback(async (postId) => {
    deletePost(postId)
  })

  return (
    postState && <PostView post={postState} onDelete={deleteHandler}></PostView>
  );
}

export default memo(Post);
