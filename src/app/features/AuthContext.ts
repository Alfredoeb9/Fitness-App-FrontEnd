import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type UserState = {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: UserState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = "USER_SIGNED_IN";
    },

    logout: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUser } = userAuthSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserAuth = (state: RootState) => state.user.user;

export default userAuthSlice.reducer;
