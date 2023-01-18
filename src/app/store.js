import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./features/workoutSlice";
import userAuthReducer from "./features/AuthContext";

export const store = configureStore({
  reducer: {
    workout: workoutReducer,
    user: userAuthReducer,
  },
});
