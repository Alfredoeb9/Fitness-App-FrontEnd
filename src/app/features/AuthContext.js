// import { createContext, useReducer } from 'react';

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {

// }

// export const AuthContextProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(authReducer, {
//         user: null
//     });

// }
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

// const ParseUser = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (user) {
//       dispatch(login(user));
//     }
//   }, []);
// };

// ParseUser();

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userAuthSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserAuth = (state) => state.user.user;

export default userAuthSlice.reducer;
