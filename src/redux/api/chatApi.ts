import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IMessage {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  isSeen: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

// 🔴 unread response types
interface IUnreadCountResponse {
  count: number;
}

interface IUnreadByUserResponse {
  [userId: string]: number;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  tagTypes: ["Chat"],

  endpoints: (builder) => ({
    // ✅ GET CHAT
    getChat: builder.query<IMessage[], string>({
      query: (userId) => `/chat/${userId}`,
      transformResponse: (res: { messages: IMessage[] }) => res.messages,
      providesTags: ["Chat"],
      keepUnusedDataFor: 0,
    }),

    // ✅ SEND MESSAGE
    sendMessage: builder.mutation<
      IMessage,
      { receiverId: string; content: string }
    >({
      query: (data) => ({
        url: "/chat/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    // ✅ MARK SEEN
    markSeen: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/chat/seen/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Chat"],
    }),

    // ✅ GET UNREAD COUNT
    getUnreadCount: builder.query<IUnreadCountResponse, void>({
      query: () => "/chat/unread-count",
    }),

    // ✅ GET UNREAD BY USER
    getUnreadByUser: builder.query<IUnreadByUserResponse, void>({
      query: () => "/chat/unread-users",
    }),

    // ✅ DELETE MESSAGE
    deleteMessage: builder.mutation<void, string>({
      query: (messageId) => ({
        url: `/chat/delete/${messageId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetChatQuery,
  useSendMessageMutation,
  useMarkSeenMutation,
  useGetUnreadCountQuery,
  useGetUnreadByUserQuery,
  useDeleteMessageMutation,
} = chatApi;