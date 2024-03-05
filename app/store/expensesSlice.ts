import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import expenses from "./../../data/expenses.json";
import { IExpense } from "../../types";

const initialState = {
  expenses: expenses as Array<IExpense> | null,
  currentExpense: null as IExpense | null,
};

export type expenseSliceReducerType = typeof initialState;

export const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<IExpense>) => {
      state.expenses = state.expenses
        ? [action.payload, ...state.expenses]
        : [action.payload];
    },
    removeExpense: (state, action: PayloadAction<{ id: number }>) => {
      if (state.expenses)
        state.expenses = state.expenses?.filter(
          (item) => item.id !== action.payload.id
        );
    },
    editExpense: (state, action: PayloadAction<IExpense>) => {
      if (state.expenses) {
        state.expenses = state.expenses.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      }
    },
    deleteExpense: (state, action: PayloadAction<{ id: number }>) => {
      state.expenses = state.expenses
        ? state.expenses?.filter((item) => item.id !== action.payload.id)
        : null;
    },
    setCurrentExpense: (state, action: PayloadAction<IExpense | null>) => {
      state.currentExpense = action.payload;
    },
  },
});

export const {
  addExpense,
  removeExpense,
  editExpense,
  deleteExpense,
  setCurrentExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;

export const getExpenseSlice = (state: RootState): expenseSliceReducerType =>
  state.expenseSlice;
