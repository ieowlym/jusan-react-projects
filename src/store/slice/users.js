import { createSlice } from "@reduxjs/toolkit";

import { localStorageUsersKey } from "../../constants";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersList: JSON.parse(localStorage.getItem(localStorageUsersKey)) || []
  },
  reducers: {
    setUsers(state, action) {
      state.usersList = action.payload;
    }
  }
});

export const { setUsers } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
