import React, { useState, memo, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendRequest } from "../../services/fetch.service";
import { Constants } from "../../constants";
import Image from "../../components/Image";
import UserData from "../../components/UserData/UserData";
import "./Profile.css";
import store from "../../store";
import { UPDATE_USER } from "../../actions/types";

function Profile() {

  const params = useParams();

  const userState = useSelector((state) => state.userReducer);

  function getUserData() {
    sendRequest({
      url: Constants.http.url + Constants.path.user + "/" + params.userId,
      method: "GET",
    })
      .then((res) => {
        store.dispatch({
          type: UPDATE_USER,
          user: res.user,
          images: res.images,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="profile-wrapper">
      {userState.user && <UserData user={userState.user}></UserData>}
      <div className="image-container">
        {userState.images &&
          userState.images.map((img) => {
            return (
              <div key={img._id} className="image image-wrapper">
                <Image link={img.link}></Image>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default memo(Profile);
