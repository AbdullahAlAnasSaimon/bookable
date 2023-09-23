import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const fetchProductsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    searchProduct: builder.query({
      query: (query) => `/products?search=${query}`,
    }),
  }),
});

export const { setProducts } = productSlice.actions;
export const { useSearchProductQuery } = fetchProductsApi;

export default productSlice.reducer;
