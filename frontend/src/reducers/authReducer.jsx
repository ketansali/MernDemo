import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstnce from "../helpers/axios";
import Toast from '../helpers/Toast'
const initialState = {
  token: "",
  loading: false,
  error: "",
};

export const signUp = createAsyncThunk(
  "signup",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstnce.post("/user/signup", body);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
export const signIn = createAsyncThunk(
  "signin",
  async (body, { rejectWithValue }) => {
    try {
      
      const res = await axiosInstnce.post("/user/signin", body);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

const authReducer = createSlice({
  name: "user",
  initialState,
  reducers :{
    addToken : (state,action)=>{
      state.token = localStorage.getItem('token')
    },
    removeToken : (state,action)=>{
      state.token = ""
      localStorage.removeItem('token')
    }
  },
  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.loading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      const { payload } = action;
      state.loading = false;
      localStorage.setItem('token',payload.token)
      Toast({msg:payload.message,type:'success'})
      state.token = payload.token;
    },
    [signUp.rejected]: (state, { payload: { data } }) => {
      state.loading = false;
      Toast({msg:data.error,type:'error'})
      state.error = data.error;
      state.token = ''
    },
    [signIn.pending]: (state, action) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      const { payload } = action;
      state.loading = false;
      localStorage.setItem('token',payload.token)
      Toast({msg:payload.message,type:'success'})
      state.token = payload.token;
    },
    [signIn.rejected]: (state, { payload: { data } }) => {
      state.loading = false;
      Toast({msg:data.error,type:'error'})
      state.error = data.error;
      state.token = ''
    },
  },
});
export const  {addToken,removeToken}= authReducer.actions
export default authReducer.reducer;
