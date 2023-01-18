import { useDispatch } from "react-redux";
import { logout } from "../app/features/AuthContext";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout2 = () => {
    // remove user from storage
    localStorage.removeItem("user");

    dispatch(logout(null));
  };

  return { logout2 };
};
