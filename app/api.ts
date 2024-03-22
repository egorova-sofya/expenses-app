import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IExpense } from "../types";

export const API = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    fetchAddExpense: builder.mutation<void, IExpense>({
      query: (data) => ({
        url: `expenses.json`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
