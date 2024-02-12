import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();
  if (authState.isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  return authState?.isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
