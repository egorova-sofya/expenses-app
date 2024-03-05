import { combineReducers, configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expensesSlice";

const combinedReducer = combineReducers({ expenseSlice });

export const store = configureStore({
  reducer: combinedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
