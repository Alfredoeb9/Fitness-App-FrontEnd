import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectUserAuth } from "../app/features/AuthContext";

function PrivateRoutes() {
  const location = useLocation();
  const user = useAppSelector(selectUserAuth);
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return user ? (
    <Outlet />
  ) : isMobile ? (
    <Navigate
      to="/welcome"
      state={{
        from: location,
      }}
      replace={true}
    />
  ) : (
    // navigate("/welcome", { replace: true })
    <Navigate
      to="/login"
      state={{
        from: location,
      }}
      replace={true}
    />
  );
}

export default PrivateRoutes;
