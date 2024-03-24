import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthResponse, IAuthValues } from "../types";

const getUrl = (mode: "signUp" | "signInWithPassword") => {
  return `:${mode}?key=${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`;
};

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_AUTH_API_URL,
  }),
  endpoints: (builder) => ({
    fetchSignUp: builder.mutation<IAuthResponse, IAuthValues>({
      query: (data) => ({
        url: getUrl("signUp"),
        method: "POST",
        body: { ...data, returnSecureToken: true },
      }),
    }),
    fetchSignIn: builder.mutation<IAuthResponse, IAuthValues>({
      query: (data) => ({
        url: getUrl("signInWithPassword"),
        method: "POST",
        body: { ...data, returnSecureToken: true },
      }),
    }),
  }),
});
