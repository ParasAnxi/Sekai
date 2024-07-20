import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  user: null,
  token: null,
  status: 'idle',
};

export const userLogin = createAsyncThunk('auth/login',async(data)=>{
  const response = await fetch("http://localhost:3001/auth/login",{
    method: "POST",
    headers:{
      "content-type":"application/json",
    },
    body: JSON.stringify(data),
  });
  const userData = await response.json();
  console.log(userData);
  return userData;
})
export const userRegister = createAsyncThunk('auth/register',async(user)=>{
  const response = await fetch("http://localhost:3001/auth/register",{
    method: "POST",
    headers:{
      "content-type":"application/json",
    },
    body: JSON.stringify(user)
  });
  const data = await response.json();
  console.log(data);
  return data;
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
