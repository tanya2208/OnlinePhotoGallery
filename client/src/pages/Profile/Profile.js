import React, { useState, memo, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendRequest } from "../../services/fetch.service";
import { Constants } from "../../constants";
import Image from "../../components/Image";
import UserData from "../../components/UserData/UserData";
import './Profile.css'; 

function Profile() {
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);
  // const [link, setLink] = useState("");

  const params = useParams();

  //user who logged in
  // const userId = useSelector((state) => state.authReducer.userId);

  function getUserData() {
    sendRequest({
      url: Constants.http.url + Constants.path.user + "/" + params.userId,
      method: "GET",
    })
      .then((res) => {
        setUser(res.user);
        setImages(res.images);
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
      <UserData user={user}></UserData>
      <div className="image-container">
        {images.map((img) => {
          return <div key={img._id} className="image image-wrapper"><Image link={img.link}></Image></div>
        })}
      </div>
    </div>
  );
}

export default memo(Profile);
