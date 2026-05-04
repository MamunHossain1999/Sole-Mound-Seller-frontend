import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ================= TYPES ================= */

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  sold: number;
  isBestSeller: boolean;
}

export interface TopCategory {
  _id: string; // category name
  total: number;
}

/* ================= API ================= */

export const topCategoryApi = createApi({
  reducerPath: "topCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", 
    credentials: "include", // 🔐 auth cookie
  }),

  tagTypes: ["BestSeller", "TopCategory"],

  endpoints: (builder) => ({
    /* ===== BEST SELLERS ===== */
    getBestSellers: builder.query<Product[], void>({
      query: () => "/best-sellers",
      providesTags: ["BestSeller"],
    }),

    /* ===== TOP CATEGORIES ===== */
    getTopCategories: builder.query<TopCategory[], void>({
      query: () => "/top-categories",
      providesTags: ["TopCategory"],
    }),
  }),
});

/* ================= EXPORT HOOKS ================= */

export const {
  useGetBestSellersQuery,
  useGetTopCategoriesQuery,
} = topCategoryApi;