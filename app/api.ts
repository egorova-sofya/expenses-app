import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IExpense, IExtendedExpense, IFirebaseExpense } from "../types";

export const API = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    fetchAddExpense: builder.mutation<{ name: string }, IExpense>({
      query: (data) => ({
        url: `expenses.json`,
        method: "POST",
        body: data,
      }),
    }),

    fetchGetExpenses: builder.query<IExtendedExpense[], void>({
      query: () => "expenses.json",
      transformResponse: (response: IFirebaseExpense) => {
        return Object.keys(response)
          .map((key) => ({
            ...response[key as keyof IFirebaseExpense],
            id: key,
          }))
          .reverse();
      },
    }),

    fetchEditExpense: builder.mutation<void, { id: string; data: IExpense }>({
      query: (data) => ({
        url: `expenses/${data.id}.json`,
        method: "PUT",
        body: data.data,
      }),
    }),

    fetchDeleteExpenses: builder.mutation<void, { id: string }>({
      query: (data) => ({
        url: `expenses/${data.id}.json`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});
