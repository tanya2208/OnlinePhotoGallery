import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddImage from "../AddImage";
import './UserData.css'

function UserData(props) {
  const [access, setAccess] = useState(false);
  const params = useParams();
  const userId = useSelector((state) => state.authReducer.userId);

  useEffect(() => {
    setAccess(userId === params.userId)
  })

  return (
    <div className="user-data-wrapper">
      <div className="avatar"></div>
      <div className="user-data">
        <h1 className="nickname">{props.user.nickname}</h1>
        <p>
          {props.user.name} {props.user.surname}
        </p>
        <p>{props.user.email}</p>
        <p>{props.user.occupation}</p>
        <p>{props.user.city}</p>
        {access && <AddImage userId={userId}></AddImage>}
      </div>
    </div>
  );
}

export default memo(UserData);
