import {
  combineReducers,
  configureStore,
  Tuple,
  EnhancedStore,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import workoutReducer from "./features/workoutSlice";
import userAuthReducer from "./features/AuthContext";
import {
  setCookie,
  getCookie,
  removeCookie,
} from "../utils/helperAuthentication";

type ItemTypes = {
  auth?: any;
};

const CookieStore = {
  setItem: async (key: string, val: string, callback: (arg0: null) => void) => {
    key = key.replace(":", "_");
    const value = JSON.parse(val);
    const authVal = value.user;
    delete value.auth;
    localStorage.setItem(key, JSON.stringify(value));
    setCookie(key, JSON.stringify(authVal));
    if (callback) {
      callback(null);
    }
    return Promise.resolve(null);
  },
  getItem: async (
    key: string,
    callback: (arg0: null, arg1: string) => void
  ) => {
    key = key.replace(":", "_");
    const dataItem = localStorage.getItem(key);
    let item: ItemTypes = {};
    if (dataItem) item = JSON.parse(dataItem);
    const authItem = JSON.parse(getCookie(key));
    if (authItem) item.auth = authItem;
    if (callback) {
      callback(null, JSON.stringify(item));
    }
    return Promise.resolve(JSON.stringify(item));
  },
  removeItem: async (key: string, callback: (arg0: null) => void) => {
    removeCookie(key);
    localStorage.removeItem(key);
    if (callback) {
      callback(null);
    }
    return Promise.resolve(null);
  },
};

const persistAuthConfig = {
  key: "root",
  version: 1,
  storage: CookieStore,
};

const authXReducer = combineReducers({
  workout: workoutReducer,
  user: userAuthReducer,
});

const persistedReducer = persistReducer(persistAuthConfig, authXReducer);

// Declare and initialize preloadedState
const preloadedState: Partial<RootState> = {};

export const store: ReturnType<typeof configureStore> = configureStore({
  reducer: persistedReducer,
  preloadedState,
  devTools: true,
  middleware: () => new Tuple(thunk),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof authXReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export default authXReducer;
export type AppStore = EnhancedStore<RootState>;
export type AppDispatch = AppStore["dispatch"];
