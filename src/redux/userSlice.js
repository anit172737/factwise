import { createSlice } from "@reduxjs/toolkit";
import users from "../users.json";

export const userMaster = createSlice({
  name: "userMaster",
  initialState: {
    userList: users,
    newList: users,
    searchList: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchList = action.payload;
    },
    editUser: (state, action) => {
      state.userList = action.payload;
    },
    deleteUSer: (state, action) => {
      state.userList = action.payload;
      state.newList = action.payload;
    },
  },
});

export const { editUser, deleteUSer, searchUser } = userMaster.actions;

export default userMaster.reducer;
