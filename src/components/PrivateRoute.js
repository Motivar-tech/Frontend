import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("motivar-token");

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/user-auth" replace />
  );
};

export default PrivateRoute;
