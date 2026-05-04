import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ================= TYPE ================= */
export interface Banner {
  _id: string;
  title: string;
  image: string;
  link?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/* ================= API ================= */
export const bannerApi = createApi({
  reducerPath: "bannerApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),

  tagTypes: ["Banner"],

  endpoints: (builder) => ({

    /* ================= GET ALL BANNERS ================= */
    getBanners: builder.query<Banner[], void>({
      query: () => "/banners",
      providesTags: ["Banner"],
    }),

    /* ================= CREATE BANNER (CLOUDINARY) ================= */
    createBanner: builder.mutation<Banner, FormData>({
      query: (formData) => ({
        url: "/banners",
        method: "POST",
        body: formData, // 👈 file upload support
      }),
      invalidatesTags: ["Banner"],
    }),

    /* ================= DELETE BANNER ================= */
    deleteBanner: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

/* ================= HOOKS ================= */
export const {
  useGetBannersQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;