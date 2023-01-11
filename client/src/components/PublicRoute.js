import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isLogin } from "../utils";

function PublicRoute({ component: Component, restricted, ...rest }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLogin());
  });

  return (
    (loggedIn && restricted) ?  <Navigate to="/" /> : <Component {...rest} />
  );
}

export default PublicRoute;
