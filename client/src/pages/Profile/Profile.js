import React, { memo, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../../components/Image";
import UserData from "../../components/UserData/UserData";
import "./Profile.css";
import { getUser } from "../../services/user.service";

function Profile() {

  const params = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    getUser(params.userId)
  }, [params.userId]);

  const openPostHandler = useCallback((event) => {
    let id = event.currentTarget.getAttribute('data-id')
    navigate('/posts/'+id) //fix hardcode
  });

  return (
    <div className="profile-wrapper">
      {userState.user && <UserData user={userState.user}></UserData>}
      <div className="image-container">
        {userState.images &&
          userState.images.map((img) => {
            return (
              <div key={img._id} data-id={img._id} className="image image-wrapper" onClick={openPostHandler}>
                <Image link={img.link}></Image>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default memo(Profile);
