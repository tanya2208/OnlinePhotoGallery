import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin } from "../utils";

function PublicRoute({ component: Component, restricted, ...rest }) {
  return (
    (isLogin() && restricted) ?  <Navigate to="/" /> : <Component {...rest} />
  );
}

export default PublicRoute;
