//** IMPORTS */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//** API */
const POST_API = "http://localhost:3001/post";
//** CONFIG */
const initialState = {
    status: "idle",
    error: null,
    userPosts:[],
    otherUserPosts:[]
};

//** CREATE POST */
export const createPost = createAsyncThunk('post/create',async(formData)=>{
    const response = await fetch(`${POST_API}/create`,{
        method:"POST",
        // header:{

        // },
        body: formData,
    });
    const data = await response.json();
    // console.log(data);
    return data;
});
//** USER POSTS */
export const userPosts = createAsyncThunk("post/userPosts",async(userName)=>{
  const response = await fetch(`${POST_API}/${userName}/userposts`,{
    method: "GET",
  });
  const data = await response.json();
  // console.log(data);
  return data;
});
//** OTHER USER POSTS */
export const otherUserPosts = createAsyncThunk("post/otherUserPosts",async(userName)=>{
  const response = await fetch(`${POST_API}/${userName}/userposts`,{
    method: "GET",
  });
  const data = await response.json();
  // console.log(data);
  return data;
});
//** REDUCERS */
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLogOutPost:(state)=>{
      state.userPosts = [];
    },
    setPostError:(state)=>{
      state.error = null;
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled,(state,action)=>{
        state.status = "idle";
        state.error = action.payload.error ? "error" : "noError";
      })
      .addCase(userPosts.pending,(state)=>{
        state.status = "idle";
      })
      .addCase(userPosts.fulfilled,(state,action)=>{
        state.status = "idle";
        state.userPosts = action.payload.posts;
      })
      .addCase(otherUserPosts.pending,(state)=>{
        state.status = "idle";
      })
      .addCase(otherUserPosts.fulfilled,(state,action)=>{
        state.status = "idle";
        state.otherUserPosts = action.payload.posts;
      })
    },
});
export const { setLogOutPost, setPostError } = postSlice.actions;
export default postSlice.reducer;
