import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  workout: null,
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    getWorkout: (state, action) => {
      state.workout = action.payload;
    },

    createWorkout: (state, action) => {
      state.workout = [action.payload, ...state.workout];
    },

    deleteWorkout: (state, action) => {
      state.workout = state.workout.filter(
        (workout) => workout._id !== action.payload._id
      );
    },

    updateWorkout: (state, action) => {
      state.workout = state.workout.filter(
        (workout) => workout._id !== action.payload._id
      );
      state.workout = [action.payload, ...state.workout];
    },
  },
});

export const { getWorkout, createWorkout, deleteWorkout, updateWorkout } =
  workoutSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectWorkout = (state) => state.workout.workout;

export default workoutSlice.reducer;
