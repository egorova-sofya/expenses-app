import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  token: null as string | null,
};

export type authSliceReducerType = typeof initialState;

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      AsyncStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      AsyncStorage.removeItem("token");
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export default authSlice.reducer;

export const getAuthSlice = (state: RootState): authSliceReducerType =>
  state.authSlice;
