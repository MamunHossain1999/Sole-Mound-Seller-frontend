/* ================= BANK ================= */
export interface IBank {
  _id?: string;
  userId?: string;

  bankName: string;
  accountNumber: string;
  swiftCode?: string;
  country?: string;
  accountName?: string;
  email?: string;

  createdAt?: string;
  updatedAt?: string;
}

/* ================= WITHDRAW ================= */
export type WithdrawStatus = "pending" | "approved" | "rejected";

export interface IWithdraw {
  _id: string;
  userId: string;
  amount: number;
  status: WithdrawStatus;

  createdAt: string;
  updatedAt: string;
}

/* ================= API RESPONSE ================= */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const bankApi = createApi({
  reducerPath: "financeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),

  tagTypes: ["Bank", "Withdraw"],

  endpoints: (builder) => ({
    /* ================= BANK ================= */

    // ✅ Get Bank Info
    getBankInfo: builder.query<IBank | null, void>({
      query: () => "/bank",
      transformResponse: (res: ApiResponse<IBank>) => res.data ?? null,
      providesTags: ["Bank"],
    }),

    // ✅ Save / Update Bank
    saveBankInfo: builder.mutation<IBank, Partial<IBank>>({
      query: (body) => ({
        url: "/bank",
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiResponse<IBank>) => res.data,
      invalidatesTags: ["Bank"],
    }),

    /* ================= WITHDRAW ================= */

    // ✅ Create Withdraw
    createWithdraw: builder.mutation<IWithdraw, { amount: number }>({
      query: (body) => ({
        url: "/withdraw",
        method: "POST",
        body,
      }),
      transformResponse: (res: ApiResponse<IWithdraw>) => res.data,
      invalidatesTags: ["Withdraw"],
    }),

    // ✅ Get Withdraw List
    getWithdraws: builder.query<IWithdraw[], void>({
      query: () => "/withdraw",
      transformResponse: (res: ApiResponse<IWithdraw[]>) =>
        res.data ?? [],
      providesTags: ["Withdraw"],
    }),

    // ✅ Update Withdraw Status (Admin/Seller)
    updateWithdrawStatus: builder.mutation<
      IWithdraw,
      { id: string; status: WithdrawStatus }
    >({
      query: ({ id, status }) => ({
        url: `/withdraw/${id}`,
        method: "PATCH",
        body: { status },
      }),
      transformResponse: (res: ApiResponse<IWithdraw>) => res.data,
      invalidatesTags: ["Withdraw"],
    }),
  }),
});

export const {
  useGetBankInfoQuery,
  useSaveBankInfoMutation,

  useCreateWithdrawMutation,
  useGetWithdrawsQuery,
  useUpdateWithdrawStatusMutation,
} = bankApi;