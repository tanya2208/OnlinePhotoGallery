import React, { useState, memo } from "react";
import { useSelector } from "react-redux";

function Home() {
    // const { user: currentUser } = useSelector((state) => state.auth);
    // console.log(useSelector((state) => state.authReducer.userId))
  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export default memo(Home);