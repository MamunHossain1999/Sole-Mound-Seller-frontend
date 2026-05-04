import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getStats: builder.query<{ visitors: number }, void>({
      query: () => "/visitor",
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;