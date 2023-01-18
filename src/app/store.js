import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./features/workoutSlice";

export const store = configureStore({
  reducer: {
    workout: workoutReducer,
  },
});
