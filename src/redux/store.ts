import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import productReducer, {
  fetchProductsApi,
} from "./features/product/productSlice";
import { productApi } from "./features/api/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    [fetchProductsApi.reducerPath]: fetchProductsApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      fetchProductsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
