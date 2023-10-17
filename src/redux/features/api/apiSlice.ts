import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["books", "review", "wishlist", "currently-reading"],
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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
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
    addWishlist: builder.mutation({
      query: (body) => ({
        url: "/wishlist",
        method: "POST",
        body,
      }),
    }),
    getWishlist: builder.query({
      query: (email) => ({
        url: `/wishlist?email=${email}`,
        providesTags: ["wishlist"],
      }),
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
    }),
    addCurrentlyReading: builder.mutation({
      query: (body) => ({
        url: "/currently-reading",
        method: "POST",
        body,
      }),
    }),
    getCurrentlyReading: builder.query({
      query: () => ({
        url: "/currently-reding",
        providesTags: ["currently-reading"],
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
  useAddWishlistMutation,
  useGetWishlistQuery,
  useDeleteWishlistMutation,
  useAddCurrentlyReadingMutation,
} = productApi;
