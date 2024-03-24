import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IExpense, IExtendedExpense, IFirebaseExpense } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, WebApi, extraOptions) => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  const authToken = await AsyncStorage.getItem("token");
  const modifiedArgs = args.toString() + `?auth=${authToken}`;
  const rawBaseQuery = fetchBaseQuery({ baseUrl });

  return rawBaseQuery(modifiedArgs, WebApi, extraOptions);
};

export const API = createApi({
  reducerPath: "API",

  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    fetchAddExpense: builder.mutation<{ name: string }, IExpense>({
      query: (data) => ({
        url: `expenses.json`,
        method: "POST",
        body: data,
      }),
    }),

    fetchGetExpenses: builder.query<IExtendedExpense[], void>({
      query: () => `expenses.json`,
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
