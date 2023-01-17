import React, { memo, useCallback, useEffect, useState } from "react";
import { sendRequest } from "../services/fetch.service";
import { Constants } from "../constants";
import store from "../store";
import { UPDATE_POST, UPDATE_POSTS } from "../actions/types";
import { useSelector } from "react-redux";

function AddComment(props) {
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState("");
  const userId = useSelector((state) => state.authReducer.userId);
  const postsState = useSelector((state) => state.postsReducer.posts);

  const handleAddComment = useCallback(() => {
    sendRequest({
      url:
        Constants.http.url +
        Constants.path.post +
        "/" +
        props.postId +
        "/comments",
      method: "POST",
      body: { comment, commentOwner: userId },
    })
      .then((res) => {
        store.dispatch({ type: UPDATE_POST, post: res.post });
        if(postsState){
          store.dispatch({ type: UPDATE_POSTS, post: res.post });
        }
        setComment("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  useEffect(()=> {
    setPosts(postsState)
  }, [postsState])

  return (
    <div className="add-comment-wrapper">
      <input
        type="string"
        onChange={useCallback((event) => setComment(event.target.value))}
        value={comment}
      />
      <button onClick={handleAddComment} className="add-comment-btn">
        Public
      </button>
    </div>
  );
}

export default memo(AddComment);
