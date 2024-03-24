import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  token: null as string | null,
  isAuth: false,
};

export type authSliceReducerType = typeof initialState;

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export default authSlice.reducer;

export const getAuthSlice = (state: RootState): authSliceReducerType =>
  state.authSlice;
