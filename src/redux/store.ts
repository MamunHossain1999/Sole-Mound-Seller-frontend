
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { reviewApi } from "./api/reviewApi";
import { productApi } from "./api/productApi";
import { chatApi } from "./api/chatApi";
import { bannerApi } from "./api/bannerApi";
import { orderApi } from "./api/orderApi";
import { categoryApi } from "./api/categoryApi";
import { bankApi } from "./api/bankApi";
import { storeApi } from "./api/storeApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [storeApi.reducerPath]:storeApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      productApi.middleware,
      reviewApi.middleware,
      chatApi.middleware,
      bannerApi.middleware,
      orderApi.middleware,
      categoryApi.middleware,
      bankApi.middleware,
      storeApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
