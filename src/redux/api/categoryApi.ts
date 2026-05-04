import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ================= TYPES ================= */

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  images?: string[];
  sold?: number;
  isBestSeller?: boolean;
}
export interface SingleCategoryResponse {
  success: boolean;
  data: Category;
}
/* 👉 Category */
export interface Category {
  id: string; // category name (clothing, beauty)
  name: string;

  image?: string;
  images?: string[];
  icon?: string;
  iconBg?: string;

  sales: number;
  added: number;
  stock: number;

  date?: string;
  status: "active" | "inactive";
}

/* ================= API ================= */

export const categoryApi = createApi({
  reducerPath: "categoryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),

  tagTypes: ["Category"],

  endpoints: (builder) => ({
    /* ================= BEST SELLERS ================= */
    getBestSellers: builder.query<Product[], void>({
      query: () => "/best-sellers",
      providesTags: ["Category"],
    }),

    /* ================= TOP CATEGORIES ================= */
    getTopCategories: builder.query<Category[], void>({
      query: () => "/top-categories",
      providesTags: ["Category"],
    }),

    /* ================= ALL CATEGORIES ================= */
    getAllCategories: builder.query<Category[], void>({
      query: () => "/all-categories",
      providesTags: ["Category"],
    }),

    /* ================= SINGLE CATEGORY ================= */
    getSingleCategory: builder.query<SingleCategoryResponse, string>({
      query: (name) => `/category/${name}`,
    }),

    /* ================= UPDATE STATUS ================= */
    updateCategoryStatus: builder.mutation<
      { message: string },
      { name: string; status: "active" | "inactive" }
    >({
      query: ({ name, status }) => ({
        url: `/category-status/${encodeURIComponent(name)}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Category"],
    }),

    /* ================= DELETE CATEGORY ================= */
    deleteCategory: builder.mutation<{ message: string }, { name: string }>({
      query: ({ name }) => ({
        url: `/category/${encodeURIComponent(name)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

/* ================= EXPORT HOOKS ================= */

export const {
 
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryStatusMutation,
  useDeleteCategoryMutation,
} = categoryApi;
