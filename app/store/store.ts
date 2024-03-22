import { combineReducers, configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expensesSlice";
import { API } from "../api";

const combinedReducer = combineReducers({
  expenseSlice,
  [API.reducerPath]: API.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
