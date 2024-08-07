//** IMPORTS */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//** API */
const USER_API = "http://localhost:3001/user";
//** CONFIG */
const initialState = {
  users: [],
  user: null,
  status: "idle",
  error: null,
};
//** SEARCH USERS */
export const findUsers = createAsyncThunk("user/findusers", async (user) => {
  const response = await fetch(`${USER_API}/findusers`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  console.log(data);
  return data;
});
//** USER PROFILE */
export const getUserProfile = createAsyncThunk(
  "user/userprofile",
  async (userName) => {
    const response = await fetch(`${USER_API}/userprofile`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName }),
    });
    const data = await response.json();
    // console.log(data);
    return data;
  }
);
//** FOLLOW */
export const followUser = createAsyncThunk("/user/follow", async (userData) => {
  const response = await fetch(`${USER_API}/followuser`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  console.log(data);
  return data;
});
//** UNFOLLOW */
export const unFollowUser = createAsyncThunk("/user/unfollow", async (userData) => {
  const response = await fetch(`${USER_API}/unfollowuser`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  console.log(data);
  return data;
});
//** REDUCERS */
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    onLeave: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(findUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload.users;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
      })
      .addCase(followUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.following;
      })
      .addCase(unFollowUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unFollowUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.follower;
      });
  },
});

export const { onLeave } = usersSlice.actions;
export default usersSlice.reducer;
