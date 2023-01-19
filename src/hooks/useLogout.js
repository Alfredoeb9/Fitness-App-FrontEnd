import { useDispatch } from "react-redux";
import { logout } from "../app/features/AuthContext";
import { getWorkout } from "../app/features/workoutSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout2 = () => {
    // remove user from storage
    localStorage.removeItem("user");

    dispatch(logout(null));
    dispatch(getWorkout(null));
  };

  return { logout2 };
};
