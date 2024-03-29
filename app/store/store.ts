import { combineReducers, configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expensesSlice";
import authSlice from "./authSlice";
import { API } from "../api";
import { AuthApi } from "../authApi";
import { rtkQueryErrorLogger } from "../ErrorsHandler";

const combinedReducer = combineReducers({
  expenseSlice,
  authSlice,
  [API.reducerPath]: API.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(API.middleware)
      .concat(AuthApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
