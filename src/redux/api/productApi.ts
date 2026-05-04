import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  status: "Low Stock" | "Published" | "Draft" | "Out of Stock";
  createdAt?: string;
  updatedAt?: string;
}

// Create / Update payload
export interface IProductPayload {
  name: string;
  description: string;
  price: number;
  images?: File[]; // frontend থেকে file যাবে
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // 🔥 CREATE PRODUCT (image upload সহ)
    createProduct: builder.mutation<IProduct, FormData>({
      query: (formData) => ({
        url: "/create/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    // 🔥 GET ALL PRODUCTS
    getProducts: builder.query<IProduct[], void>({
      query: () => "/all/products",
      transformResponse: (response: { data: IProduct[] }) => response.data,
      providesTags: ["Products"],
    }),

    // single product details
    getProductById: builder.query<IProduct, string>({
      query: (id) => `/product/${id}`,
      transformResponse: (response: { data: IProduct }) => response.data,
      providesTags: ["Products"],
    }),

    // 🔥 APPROVE PRODUCT
    approveProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Products"],
    }),

    // 🔥 REJECT PRODUCT
    rejectProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["Products"],
    }),

    // 🔥 UPDATE PRODUCT (image optional)
    updateProduct: builder.mutation<IProduct, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/product/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    // 🔥 DELETE PRODUCT
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useApproveProductMutation,
  useRejectProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
