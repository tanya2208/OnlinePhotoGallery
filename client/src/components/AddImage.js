import React, { memo, useCallback, useState } from "react";
import "./UserData/UserData.css";
import { sendRequest } from "../services/fetch.service";
import { Constants } from "../constants";
import store from "../store";
import { ADD_IMAGE } from "../actions/types";

function AddImage(props) {
  const [link, setLink] = useState("");

  const handleAddImage = useCallback(() => {
    sendRequest({
      url: Constants.http.url + Constants.path.image,
      method: "POST",
      body: { link, user: props.userId },
    })
      .then((res) => {
        store.dispatch({ type: ADD_IMAGE, image: res.image });
        setLink('')
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return (
    <div className="add-image-wrapper">
      <input
        type="string"
        onChange={useCallback((event) => setLink(event.target.value))}
        value={link}
      />
      <button onClick={handleAddImage} className="add-image-btn">
        Add Image
      </button>
    </div>
  );
}

export default memo(AddImage);
