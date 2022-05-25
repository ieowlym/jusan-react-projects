import { configureStore } from "@reduxjs/toolkit";

//reducers
import { usersReducer } from "./slice/users";
import { shopReducer } from "./slice/shop";
import { authReducer } from "./slice/auth";

//storage
import { localStorageBasketKey, localStorageUsersKey } from "../constants";

const store = configureStore({
  reducer: {
    users: usersReducer,
    shop: shopReducer,
    auth: authReducer
  }
});

store.subscribe(() => {
  localStorage.setItem(
    localStorageBasketKey,
    JSON.stringify(store.getState().shop.basket)
  );
});

store.subscribe(() => {
  localStorage.setItem(
    localStorageUsersKey,
    JSON.stringify(store.getState().users.usersList)
  );
});

export default store;
