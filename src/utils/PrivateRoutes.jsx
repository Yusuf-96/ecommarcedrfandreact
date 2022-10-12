import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const PrivateRoutes = ({ children }) => {
  const auth = isAuthenticated();
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
