import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IExtendedExpense } from "../../types";

const initialState = {
  expenses: null as Array<IExtendedExpense> | null,
};

export type expenseSliceReducerType = typeof initialState;

export const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Array<IExtendedExpense>>) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action: PayloadAction<IExtendedExpense>) => {
      state.expenses = state.expenses
        ? [action.payload, ...state.expenses]
        : [action.payload];
    },
    removeExpense: (state, action: PayloadAction<{ id: string }>) => {
      if (state.expenses)
        state.expenses = state.expenses?.filter(
          (item) => item.id !== action.payload.id
        );
    },
    editExpense: (state, action: PayloadAction<IExtendedExpense>) => {
      if (state.expenses) {
        state.expenses = state.expenses.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      }
    },
    deleteExpense: (state, action: PayloadAction<{ id: string }>) => {
      state.expenses = state.expenses
        ? state.expenses?.filter((item) => item.id !== action.payload.id)
        : null;
    },
  },
});

export const {
  setExpenses,
  addExpense,
  removeExpense,
  editExpense,
  deleteExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;

export const getExpenseSlice = (state: RootState): expenseSliceReducerType =>
  state.expenseSlice;
