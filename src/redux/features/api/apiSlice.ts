import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["books", "review", "wishlist", "currently-reading"],
  endpoints: (builder) => ({
    searchProduct: builder.query({
      query: (query) => `/book-search?search=${query}`,
    }),
    filterProduct: builder.query({
      query: (filter) =>
        `/book-filter?genre=${filter.genre}&publication_date=${filter.publication_date}`,
    }),
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
      query: (email) => ({
        url: `/currently-reading?email=${email}`,
        providesTags: ["currently-reading"],
      }),
    }),
    finishedReadingBook: builder.mutation({
      query: (id) => ({
        url: `/finish-reading/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useSearchProductQuery,
  useFilterProductQuery,
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
  useGetCurrentlyReadingQuery,
  useFinishedReadingBookMutation,
} = productApi;
