import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import { userAuthSlice, selectUserAuth } from "../app/features/AuthContext";

function PrivateRoutes() {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return user ? (
    <Outlet />
  ) : (
    // navigate("/login")
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
