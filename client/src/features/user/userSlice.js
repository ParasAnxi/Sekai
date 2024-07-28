//** IMPORTS */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//** CONFIG */
const initialState = {
  theme: "light",
  user: null,
  token: null,
  status: 'idle',
  error: null
};
//** LOGIN */
export const userLogin = createAsyncThunk('auth/login',async(data)=>{
  const response = await fetch("http://localhost:3001/auth/login",{
    method: "POST",
    headers:{
      "content-type":"application/json",
    },
    body: JSON.stringify(data),
  });
  const userData = await response.json();
  return userData;
});
//** REGISTER */
export const userRegister = createAsyncThunk('auth/register',async(user)=>{
  const response = await fetch("http://localhost:3001/auth/register",{
    method: "POST",
    headers:{
      "content-type":"application/json",
    },
    body: JSON.stringify(user)
  });
  const data = await response.json();
  return data;
});
//** RESET PASSWORD MAIL */
export const resetPasswordLink = createAsyncThunk("auth/resetpassword",async(email)=>{
  const response = await fetch("http://localhost:3001/auth/resetpasswordlink",{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body: JSON.stringify(email)
  });
  const data = await response.json();
  return data;
});
//** CHANGE PASSWORD */
export const changePassword = createAsyncThunk("auth/changepassword",async({id,token,password})=>{
  const response = await fetch(`http://localhost:3001/auth/changepassword/${id}/${token}`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify({password: password})
  });
  const data = await response.json();
  return data;
});
//** REDUCERS */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      setTheme:(state)=>{
        state.theme = state.theme === "light" ? "dark" : "light";
      },
      setLogOut:(state)=>{
        state.user = null;
        state.token = null;
      },
      setError:(state)=>{
        state.error = null;
      }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = action.payload.error ? 'error' : 'noError';
      })
      .addCase(userRegister.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(userRegister.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.error = action.payload.error ? "error" : "noError";
      })
      .addCase(resetPasswordLink.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordLink.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = action.payload.error ? 'error' : 'noError';
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state,action) => {
        state.status = "idle";
        state.error = action.payload.error ? 'error' : 'noError';
      });
  }
});

export const { setTheme, setLogOut, setError } = userSlice.actions;
export default userSlice.reducer;