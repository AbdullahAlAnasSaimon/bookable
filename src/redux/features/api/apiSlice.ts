import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/books",
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
