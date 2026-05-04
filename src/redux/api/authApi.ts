/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Types
export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller" | "admin" | "both";
  phone?: string;
  company?: string;
  avatar?: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  data: IUserResponse;
}

// ✅ Signup Payload
export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  role: "customer" | "seller" | "admin" | "both";
  phone?: string;
  company?: string;
}

// ✅ Login Payload
export interface ILoginPayload {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  tagTypes: ["Auth"],

  endpoints: (builder) => ({

    // 🔐 Signup
    signupUser: builder.mutation<IAuthResponse, ISignupPayload>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // 🔐 Login
    loginUser: builder.mutation<IAuthResponse, ILoginPayload>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // 🔐 Logout
    logoutUser: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    // 📩 Forgot Password
    forgotPassword: builder.mutation<
      { success: boolean; message: string },
      { email: string }
    >({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // 🔁 Reset Password
    resetPassword: builder.mutation<
      { success: boolean; message: string },
      {
        email: string;
        otp: string;
        newPassword: string;
        confirmPassword: string;
      }
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "PUT",
        body,
      }),
    }),

    // ✅ Verify OTP
    verifyOtp: builder.mutation<
      { success: boolean; message: string },
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),

    // 🔄 Resend OTP
    resendOtp: builder.mutation<
      { success: boolean; message: string },
      { email: string }
    >({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} = authApi;