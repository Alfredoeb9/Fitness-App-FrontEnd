import { logout } from "../app/features/AuthContext";
import { getWorkout } from "../app/features/workoutSlice";
import { useAppDispatch } from "app/hooks";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout2 = () => {
    // remove user from storage
    localStorage.removeItem("user");

    dispatch(logout(null));
    dispatch(getWorkout(null));
  };

  return { logout2 };
};
