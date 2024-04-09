import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { AuthApi } from "../authApi";
import { rtkQueryErrorLogger } from "../ErrorsHandler";

const combinedReducer = combineReducers({
  authSlice,
  [AuthApi.reducerPath]: AuthApi.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
