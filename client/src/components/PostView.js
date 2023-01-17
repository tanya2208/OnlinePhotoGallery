import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Constants } from "../constants";
import { sendRequest } from "../services/fetch.service";
import Image from "./Image";
import { useSelector } from "react-redux";
import { getAdminAccess } from "../services/user.service";
import Comment from "./Comment";
import AddComment from "./AddComment";

function PostView(props) {
  const userId = useSelector((state) => state.authReducer.userId);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [adminAccess, setAdminAccess] = useState(false);

  function getUser(userId) {
    sendRequest({
      url: Constants.http.url + Constants.path.user + "/" + userId,
      method: "GET",
    })
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    getUser(props.post.user);
  },[props.post.user]);

  const navigateToUser = useCallback(() => {
    navigate("/users/" + user._id);
  }, [user]);

  useEffect(() => {
    setAdminAccess(getAdminAccess(userId, user._id));
  }, [userId, user]);

  const deleteHandler = useCallback(() => {
    props.onDelete(props.post._id);
  }, [props]);

  return (
    <div className="post-container">
      <div className="image image-wrapper">
        {props.post && <Image link={props.post.link}></Image>}
      </div>
      <div className="post-data">
        <div className="flex align-spread vertical-align-center">
          {user && (
            <div className="link" onClick={navigateToUser}>
              {user.nickname}
            </div>
          )}
          {adminAccess && <button onClick={deleteHandler}>Delete</button>}
        </div>
        <div className="comments-container">
          {props.post &&
            props.post.comments &&
            props.post.comments.map((comment) => {
              return (
                <Comment key={comment._id} comment={comment.comment}></Comment>
              );
            })}
          {props.post && userId && (
            <AddComment postId={props.post._id}></AddComment>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(PostView);
