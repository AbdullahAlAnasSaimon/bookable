import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["books", "review"],
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
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["review"],
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: `/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
} = productApi;
