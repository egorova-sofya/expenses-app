import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { logout } from "./store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      api.dispatch(logout());
      AsyncStorage.removeItem("token");
    }

    return next(action);
  };
