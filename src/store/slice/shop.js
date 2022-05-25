import { createSlice } from "@reduxjs/toolkit";

import { localStorageBasketKey } from "../../constants";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    products: [],
    basketOpened: false,
    basket: JSON.parse(localStorage.getItem(localStorageBasketKey)) ?? [],
    loading: true,
    error: null
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setBasketOpened(state, action) {
      state.basketOpened = action.payload;
    },
    addToBasket(state, action) {
      const product = action.payload;
      const elem = state.basket.find((item) => item.id === product.id);
      if (elem) {
        elem.count += 1;
      } else {
        state.basket.push({
          ...product,
          count: 1
        });
      }
    },
    changeBasketItemCount(state, action) {
      const { product, increment } = action.payload;
      const elem = state.basket.find((item) => item.id === product.id);
      if (elem) {
        elem.count += increment;
      }
      if (elem?.count === 0) {
        state.basket = state.basket.filter((item) => item.id !== product.id);
      }
    },
    deleteBasket(state) {
      state.basket = [];
    },
    removeItemBasket(state, action) {
      const product = action.payload;
      state.basket = state.basket.filter((item) => item.id !== product.id);
    }
  }
});

export const {
  setProducts,
  setBasketOpened,
  addToBasket,
  changeBasketItemCount,
  deleteBasket,
  removeItemBasket,
  setLoading,
  setError
} = shopSlice.actions;

export const shopReducer = shopSlice.reducer;
