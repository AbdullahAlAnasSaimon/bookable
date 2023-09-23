import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { productApi } from "./features/api/apiSlice";
import productReducer from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
