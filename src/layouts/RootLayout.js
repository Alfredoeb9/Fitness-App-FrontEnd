import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <div className="app">
      <Navbar />
      <div className="app__pages">
        <Outlet />
      </div>
    </div>
  );
}
