import instance from "../../utils/axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

interface UserState {
  loading:boolean;
  error: string|null;
  token:string|null;
}


const initialState: UserState = {
  loading: false,
  error: null,
  token:null,
}

export const signIn = createAsyncThunk (
  "user/signIn",
  async (parameters:{
    email:string;
    password:string;
  },thunkAPI) => {
    const {data} = await instance.post ('/auth/login',{
      email:parameters.email,
      password:parameters.password,
    });
    return data.token;
  }
);
//mainly it uses to post the email and the password

export const userSlice =createSlice({
  name:'user',
  initialState,
  reducers:{
    logOut: (state) => { 
      state.token = null;
      state.error = null;
      state.loading = false; 
     }
  },
  extraReducers:{
    [signIn.pending.type]:(state) => {
      state.loading=true;
    },
    [signIn.fulfilled.type]:(state,action) => {
      state.loading=false;
      state.token = action.payload;
    },
    [signIn.rejected.type]:(state,action:PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    }

  }


}
)