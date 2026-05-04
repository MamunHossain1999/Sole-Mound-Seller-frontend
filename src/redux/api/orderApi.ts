/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* =========================
   TYPES
========================= */

export interface IOrderProduct {
  productId: string;
  quantity: number;
  price: number;
  name?: string;
  image?: string;
  sku?: string;
}
export interface IInvoice {
  invoiceNo: string;
  date: string;
  customer: IShippingAddress;
  items: IOrderProduct[];
  subtotal: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingMethod: string;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  email?: string;
  postalCode: string;
  address: string;
  city: string;
  country: string;
}

export type OrderStatus =
  | "pending"
  | "payment"
  | "processing"
  | "on_the_way"
  | "pickup"
  | "completed"
  | "cancelled";

export type PaymentStatus = "unpaid" | "paid" | "failed";

export type PaymentMethod = "stripe" | "sslcommerz" | "cash";

/* =========================
   ORDER TYPE (DB)
========================= */

export interface IOrder {
  _id: string;
  userId: string;

  products: IOrderProduct[];

  totalAmount: number;

  status: OrderStatus;
  paymentStatus: PaymentStatus;

  paymentMethod?: PaymentMethod;
  comment?:string;

  transactionId?: string | null;

  shippingAddress: IShippingAddress;
  shippingMethod?: "standard" | "express" | "pickup";

  returnStatus?: "requested" | "approved" | "rejected";

  createdAt: string;
  updatedAt: string;
}

/* =========================
   API RESPONSE
========================= */

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/* =========================
   FORMAT FOR UI
========================= */

export const formatOrder = (order: IOrder) => {
  return {
    id: order._id,
    userId: order.userId,

    status: order.status,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod ?? "unknown",
    comment: order.comment ?? "",

    shippingMethod: order.shippingMethod ?? "standard",
    transactionId: order.transactionId ?? "N/A",

    date: order.createdAt
      ? new Date(order.createdAt).toLocaleDateString()
      : "N/A",

    /* =========================
       PRODUCTS (SAFE + POPULATE SUPPORT)
    ========================= */
    products: (order.products ?? []).map((p: any) => ({
      productId:
        typeof p.productId === "object" ? p.productId._id : p.productId,

      name:
        typeof p.productId === "object" ? p.productId.name : p.name || "N/A",

      image:
        typeof p.productId === "object"
          ? p.productId.images?.[0]
          : p.image || "",

      price: typeof p.productId === "object" ? p.productId.price : p.price || 0,

      quantity: p.quantity,

      sku: typeof p.productId === "object" ? p.productId.sku : p.sku || "N/A",

      total:
        (typeof p.productId === "object" ? p.productId.price : p.price || 0) *
        p.quantity,
    })),

    total: order.totalAmount ?? 0,
    totalText: `$${order.totalAmount ?? 0}`,

    returnStatus: order.returnStatus ?? "none",

    steps: ["Ordered", "Processing", "Packaging", "Delivered"],

    shipping: {
      name: order.shippingAddress?.fullName ?? "N/A",
      email: order.shippingAddress?.email ?? "N/A",
      postalCode: order.shippingAddress?.postalCode ?? "N/A",
      address: order.shippingAddress?.address ?? "N/A",
      phone: order.shippingAddress?.phone ?? "N/A",
      city: order.shippingAddress?.city ?? "N/A",
      country: order.shippingAddress?.country ?? "N/A",
    },

    summary: {
      subtotal: order.totalAmount ?? 0,
      shipping: 0,
      tax: 0,
      total: order.totalAmount ?? 0,
    },
  };
};

/* =========================
   API SLICE
========================= */

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),

  tagTypes: ["Order"],

  endpoints: (builder) => ({
    /* ================= CREATE ORDER ================= */
    createOrder: builder.mutation<ApiResponse<IOrder>, any>({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),

    /* ================= GET ALL ORDERS ================= */
    getAllOrders: builder.query<
      ReturnType<typeof formatOrder>[],
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/orders?page=${page}&limit=${limit}`,

      transformResponse: (res: ApiResponse<IOrder[]>) =>
        (res?.data ?? []).map(formatOrder),

      providesTags: ["Order"],
    }),

    /* ================= GET SINGLE ORDER ================= */
    getOrderById: builder.query<ReturnType<typeof formatOrder> | null, string>({
      query: (id) => `/order/${id}`,

      transformResponse: (res: ApiResponse<IOrder>) =>
        res?.data ? formatOrder(res.data) : null,

      providesTags: ["Order"],
    }),

    /* ================= UPDATE STATUS ================= */
    updateOrderStatus: builder.mutation<
      ApiResponse<IOrder>,
      { id: string; status: OrderStatus }
    >({
      query: ({ id, status }) => ({
        url: `/order/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),

    /* ================= PAYMENT STATUS ================= */
    updatePaymentStatus: builder.mutation<
      ApiResponse<IOrder>,
      { id: string; paymentStatus: PaymentStatus }
    >({
      query: ({ id, paymentStatus }) => ({
        url: `/order/${id}/payment`,
        method: "PATCH",
        body: { paymentStatus },
      }),
      invalidatesTags: ["Order"],
    }),

    // get Invoice
    getInvoice: builder.query<ApiResponse<IInvoice>, string>({
      query: (id) => `/invoice/${id}`,

      providesTags: ["Order"],
    }),

    /* ================= DELETE ORDER ================= */
    deleteOrder: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

/* =========================
   EXPORT HOOKS
========================= */

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
  useDeleteOrderMutation,
  useGetInvoiceQuery,
} = orderApi;
