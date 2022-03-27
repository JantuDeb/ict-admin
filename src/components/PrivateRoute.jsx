import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();
  console.log("FROM PRIVATE",authState);
  return authState?.isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
