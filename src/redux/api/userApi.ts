/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 👤 User Type
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller" | "admin";
  phone?: string;
  company?: string;
  avatar?: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    // 👤 Get Profile (DIRECT USER — no wrapper)
    getProfile: builder.query<IUser, void>({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),

    // 👥 Get All Users
    getAllUsers: builder.query<IUser[], void>({
      query: () => "/all/users/profile",
      transformResponse: (res: { users: IUser[] }) => res.users,

      providesTags: ["User"],
    }),

    // 👤 Get Single User By ID
    getUserById: builder.query<IUser, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (res: { user: IUser }) => res.user,
      providesTags: ["User"],
    }),

    // ✏️ Update Profile
    updateProfile: builder.mutation<
      IUser,
      {
        name?: string;
        email?: string;
        password?: string;
        phone?: string;
        company?: string;
      }
    >({
      query: (body) => ({
        url: "/user/update-profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // 🖼️ Upload Avatar
    uploadAvatar: builder.mutation<IUser, FormData>({
      query: (formData) => ({
        url: "/user/create/avatar",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // ❌ Delete User
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // 🔄 Update Role
    updateUserRole: builder.mutation<
      IUser,
      { id: string; role: "customer" | "seller" | "admin" }
    >({
      query: ({ id, role }) => ({
        url: `/user/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = userApi;
