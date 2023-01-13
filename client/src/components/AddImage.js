import React, { memo, useCallback, useState } from "react";
import './UserData/UserData.css'
import { sendRequest } from "../services/fetch.service";
import { Constants } from "../constants";

function AddImage(props) {
  const [link, setLink] = useState("");

  const handleAddImage = useCallback(() => {
    console.log(link);
    sendRequest({
      url: Constants.http.url + Constants.path.image,
      method: "POST",
      body: { link, user: props.userId },
    })
      .then((res) => {
        console.log(res);
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
      <button onClick={handleAddImage} className="add-image-btn">Add Image</button>
    </div>
  );
}

export default memo(AddImage);
