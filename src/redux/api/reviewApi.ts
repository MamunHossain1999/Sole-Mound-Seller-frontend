import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 🔥 Review Type
export interface IReview {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  product: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

// 🔥 Create Review Payload
export interface CreateReviewPayload {
  productId: string;
  data: {
    rating: number;
    comment?: string;
  };
}

// 🔥 API Response Type
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  tagTypes: ["Reviews"],

  endpoints: (builder) => ({
    // ✅ Create Review
    createReview: builder.mutation<ApiResponse<IReview>, CreateReviewPayload>({
      query: ({ productId, data }) => ({
        url: `/review/${productId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    // ✅ 🔥 Get ALL Reviews (NEW)
    getAllReviews: builder.query<ApiResponse<IReview[]>, void>({
      query: () => `/reviews`,
      providesTags: ["Reviews"],
    }),

    // ✅ Get Reviews
    getReviews: builder.query<ApiResponse<IReview[]>, string>({
      query: (productId) => `/review/${productId}`,
      providesTags: ["Reviews"],
    }),

    updateReview: builder.mutation<
      ApiResponse<IReview>,
      { id: string; data: { rating: number; comment?: string } }
    >({
      query: ({ id, data }) => ({
        url: `/review/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    // ✅ Delete Review
    deleteReview: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

// 🔥 Hooks Export
export const {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useGetReviewsQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = reviewApi;
