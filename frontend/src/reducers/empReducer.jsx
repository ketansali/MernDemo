import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axiosInstnce from '../helpers/axios';
import Toast from '../helpers/Toast'
const initialState = {
    token: "",
    loading: false,
    error: "",
  };
  
export const getAllEmployee = createAsyncThunk(
    "getAllEmployee",
    async (data,{rejectWithValue})=>{
        try{
            
            const res = await axiosInstnce.get(`/employee/getAllEmployee?search=${data.search}&page=${data.pageNo}`)
            
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response)
        }
    }
)
export const addEmployee = createAsyncThunk(
    "addEmployee ",
    async (body, { rejectWithValue }) => {
      try {
          
        const res = await axiosInstnce.post("/employee/addEmployee", body);
        return res.data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response);
      }
    }
);

export const deleteEmployee = createAsyncThunk(
    "deleteEmployee",
    async (_id, { rejectWithValue }) => {
      try {
          
        const res = await axiosInstnce.post(`/employee/deleteEmployee/${_id}`,);
        return res.data
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response);
      }
    }
);
export const updateEmployee = createAsyncThunk(
  "updateEmployee",
  async ({empId,data}, { rejectWithValue }) => {
    try {
        
      const res = await axiosInstnce.post(`/employee/updateEmployee/${empId}`,data);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);




const empReducer = createSlice({
    name : 'employee',
    initialState,
    extraReducers : {
        [getAllEmployee.pending]:(state,action)=>{
            state.loading  =true
        },
        [getAllEmployee.fulfilled]:(state,action)=>{
            const {payload} = action
            state.data = payload
            Toast({msg:payload.message,type:'success'})
            state.loading  =false
        },
        [getAllEmployee.rejected]:(state,action)=>{
          const {payload} = action
          Toast({msg:payload.error,type:'error'})
          state.error = payload.error;
           state.loading  =false
        },
        [addEmployee.pending]:(state,action)=>{
            state.loading  =true
        },
        [addEmployee.fulfilled]:(state,action)=>{
            const {payload} = action
            state.data = payload.data
            Toast({msg:payload.message,type:'success'})
            state.loading  =false
        },
        [addEmployee.rejected]:(state,action)=>{
          const {payload} = action
          Toast({msg:payload.error,type:'error'})
          state.error = payload.error;
            state.loading  =false
        },
        [deleteEmployee.pending]:(state,action)=>{
            state.loading  =true
        },
        [deleteEmployee.fulfilled]:(state,action)=>{
            const {payload} = action
            state.data = payload.data
            Toast({msg:payload.message,type:'success'})
            state.loading  =false
        },
        [deleteEmployee.rejected]:(state,action)=>{
          const {payload} = action
          Toast({msg:payload.error,type:'error'})
          state.error = payload.error;
            state.loading  =false
        },
        [updateEmployee.pending]:(state,action)=>{
            state.loading  =true
        },
        [updateEmployee.fulfilled]:(state,action)=>{
            const {payload} = action
            state.data = payload.data
            Toast({msg:payload.message,type:'success'})
            state.loading  =false
        },
        [updateEmployee.rejected]:(state,action)=>{
          const {payload} = action
          Toast({msg:payload.error,type:'error'})
          state.error = payload.error;
            state.loading  =false
        }
    }
})
export default empReducer.reducer