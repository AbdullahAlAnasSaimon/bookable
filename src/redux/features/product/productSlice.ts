import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

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

export const fetchProducts = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => `/products?search=${query}`,
    }),
  }),
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
