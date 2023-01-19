import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { userAuthSlice, selectUserAuth } from "../app/features/AuthContext";

function PrivateRoutes() {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{
        from: location,
      }}
      replace
    />
  );
}

export default PrivateRoutes;
