import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["books"],
    }),
    editProduct: builder.mutation({
      query: (body) => ({
        url: `/book/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["books"],
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: `/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useAddReviewMutation,
} = productApi;
