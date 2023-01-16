import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";
import useAuthStatus from "./useAuthsSatus";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Loading />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
