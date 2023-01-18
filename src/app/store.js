<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./features/workoutSlice";
=======
import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from '../features/workoutSlice';
>>>>>>> 7154eaf8395e3cde691727c07bd657214ecdb89b

export const store = configureStore({
  reducer: {
    workout: workoutReducer,
  },
});
