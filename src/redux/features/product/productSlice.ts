import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  wishlist: [],
  currentlyReading: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    setCurrentlyReadingBook: (state, action) => {
      state.currentlyReading = action.payload;
    },
  },
});

export const { setProducts, setWishlist, setCurrentlyReadingBook } =
  productSlice.actions;

export default productSlice.reducer;
