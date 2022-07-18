import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// API
import { API } from "../../core/api";
// helpers
import { arr_EN } from "../../core/helpers/constants";

export const getUsers = createAsyncThunk("users/fetching", async () => {
  try {
    const { data } = await API.get("users");
    const usersSort = [];
    arr_EN.map((item) => {
      data.map((item) => {
        item.status = "not active";
      });

      const obj = {
        letters: item,
        users: data.filter((user) => item === user.firstName[0]),
      };
      usersSort.push(obj);
    });
    console.log(usersSort);
    return usersSort;
  } catch (err) {
    console.log(err);
  }
});

export const changeStatus = createAction("CHANGE_STATUS", (user, status) => {
  return {
    payload: {
      user: user,
      status: status,
    },
  };
});

export const usersReducer = createSlice({
  name: "users",
  initialState: {
    users: [],
    userActive: [],
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
    },
    [changeStatus]: (state, { payload }) => {
      state.users.forEach((user) => {
        user.users.forEach((item) => {
          if (item.id === payload.user.id) {
            if (payload.status === "active") {
              item.status = payload.status;
              state.userActive = [...state.userActive, item];
            } else {
              item.status = payload.status;
              state.userActive = state.userActive.filter((user) => {
                return user.id !== payload.user.id;
              });
            }
          }
        });
      });
    },
  },
});

export default usersReducer.reducer;
