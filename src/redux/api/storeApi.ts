/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ================= TYPES ================= */

export interface Store {
  _id?: string;
  name: string;
  category: string;
  shopCode?: string;
  location?: string;
  email?: string;
  phone?: string;
}

export interface StoreStats {
  itemsStock: number;
  sells: number;
  happyClient: number;
  revenue: number;
}

/* ================= API ================= */

export const storeApi = createApi({
  reducerPath: "storeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),

  tagTypes: ["Store", "StoreStats"],

  endpoints: (builder) => ({

    /* ================= GET STORE ================= */
    getStore: builder.query<Store | null, void>({
      query: () => "/store",

      // 🔥 FIX: safe unwrap
      transformResponse: (response: any) => {
        return response?.data ?? null;
      },

      providesTags: ["Store"],
    }),

    /* ================= SAVE STORE ================= */
    saveStore: builder.mutation<Store, Partial<Store>>({
      query: (body) => ({
        url: "/store",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Store"],
    }),

    /* ================= STORE STATS ================= */
    getStoreStats: builder.query<StoreStats, void>({
      query: () => "/stats",

      // 🔥 FIX: always safe fallback
      transformResponse: (response: any) => {
        return (
          response?.data ?? {
            itemsStock: 0,
            sells: 0,
            happyClient: 0,
            revenue: 0,
          }
        );
      },

      providesTags: ["StoreStats"],
    }),
  }),
});

/* ================= HOOKS ================= */

export const {
  useGetStoreQuery,
  useSaveStoreMutation,
  useGetStoreStatsQuery,
} = storeApi;