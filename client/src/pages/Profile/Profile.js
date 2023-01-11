import React, { useState, memo, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendRequest } from "../../services/fetch.service";
import { Constants } from "../../constants";

function Home() {
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);
  const [link, setLink] = useState("");

  const params = useParams();

  //user who logged in
  const userId = useSelector((state) => state.authReducer.userId);

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

  const handleAddImage = useCallback(() => {
    console.log(link);
    sendRequest({
      url: Constants.http.url + Constants.path.image,
      method: "POST",
      body: { link, user: userId },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return (
    <>
      <h1>Profile</h1>
      <div className="user-data">
        <h2>{user.nickname}</h2>
        <p>
          {user.name} {user.surname}
        </p>
        <p>{user.email}</p>
        <p>{user.occupation}</p>
        <p>{user.city}</p>
      </div>
      <input
        type="string"
        onChange={useCallback((event) => setLink(event.target.value))}
        value={link}
      />
      <button onClick={handleAddImage}>Add Image</button>
      <div className="image-container">
        {images.map((img) => {
          return <img key={img._id} src={img.link} alt="" />;
        })}
      </div>
    </>
  );
}

export default memo(Home);
