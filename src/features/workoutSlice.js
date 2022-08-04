import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  workout: null
};

export const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    getWorkout: (state, action) => {

      state.workout = action.payload;
    },

    createWorkout: (state, action ) => {
      state.workout = [action.payload, ...state.workout]
    }
    // logout: (state) => {
    //   state.user = null;
    // },
    
  },
});

export const { getWorkout, createWorkout } = workoutSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectWorkout = (state) => state.workout.workout;

export default workoutSlice.reducer;
