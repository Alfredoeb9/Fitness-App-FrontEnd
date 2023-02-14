import { useEffect } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./app/features/AuthContext";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import "./App.css";
import PrivateRoutes from "./components/PrivateRoutes";
import Welcome from "./pages/Welcome";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<PrivateRoutes />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch(login(user));
    }
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
