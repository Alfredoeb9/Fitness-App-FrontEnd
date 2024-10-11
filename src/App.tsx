import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { login } from "./app/features/AuthContext";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import "./App.css";
import PrivateRoutes from "./components/PrivateRoutes";
import Welcome from "./pages/Welcome";
import { useAppDispatch } from "./app/hooks";
import WorkoutBuddy from "./pages/WorkoutBuddy";
import ChatPage from "./pages/ChatPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<PrivateRoutes />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workout-buddy" element={<WorkoutBuddy />} />
        <Route path="/workout-buddy/chat/:chatId" element={<ChatPage />} />
      </Route>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch(login(user));
    }
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
