import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { isLogin } from "../utils";

function PrivateRoute({ component: Component, ...rest }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLogin());
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
}

export default PrivateRoute;
