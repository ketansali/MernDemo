import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstnce from "../helpers/axios";
import Toast from "../helpers/Toast";
const initialState = {
  token: "",
  loading: false,
  error: "",
};

// export const getTechnology = createAsyncThunk(
//   "getTechnolgy",
//   async (body, { rejectWithValue }) => {
//     console.log({body});
//     try {
//       const res = await axiosInstnce.get("/technology/getAllTechnology");
//       return res.data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response);
//     }
//   }
// );
export const getTechnology = createAsyncThunk(
  "Technology/getTechnology",
  async (data, { rejectWithValue }) => {
    
    try {
      
      const response = await axiosInstnce.get(`/technology/getAllTechnology?search=${data.search}&page=${data.pageNo}`);
      
      return response.data;
    } catch (error) {
      if (!error.response) {
              throw error;
          }
      return rejectWithValue(error.response);
    }
  }
);
export const addTechnology = createAsyncThunk(
  "addTechnolgy",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstnce.post("/technology/addTechnology", body);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
export const updateTechnology = createAsyncThunk(
  "updateTechnolgy",
  async ({techId,tech}, { rejectWithValue }) => {
    try {
        
      const res = await axiosInstnce.post(`/technology/updateTechnology/${techId}`,{title:tech});
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
export const deleteTechnology = createAsyncThunk(
    "deleteTechnology",
    async (_id, { rejectWithValue }) => {
      try {
          
        const res = await axiosInstnce.post(`/technology/deleteTechnology/${_id}`,);
        return res.data
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response);
      }
    }
  );

const techReducer = createSlice({
  name: "technology",
  initialState,
  extraReducers: {
    [getTechnology.pending]: (state, action) => {
      state.loading = true;
    },
    [getTechnology.fulfilled]: (state, action) => {
      const { payload } = action;
      state.data = payload;
      state.loading = false;
    },
    [getTechnology.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteTechnology.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTechnology.fulfilled]: (state, action) => {
      const { payload } = action;
      state.data = payload;
      Toast({ msg: payload.message, type: "success" });
      state.loading = false;
    },
    [deleteTechnology.rejected]: (state, { payload: { data } }) => {
      Toast({ msg: data.error, type: "error" });
      state.error = data.error;
      state.loading = false;
    },
    [addTechnology.pending]: (state, action) => {
      state.loading = true;
    },
    [addTechnology.fulfilled]: (state, action) => {
      const { payload } = action;
      state.data = payload;
      Toast({ msg: payload.message, type: "success" });
      state.loading = false;
    },
    [addTechnology.rejected]: (state, { payload: { data } }) => {
      Toast({ msg: data.error, type: "error" });
      state.error = data.error;
      state.loading = false;
    },
    [updateTechnology.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTechnology.fulfilled]: (state, action) => {
      const { payload } = action;
      state.data = payload;
      Toast({ msg: payload.message, type: "success" });
      state.loading = false;
    },
    [updateTechnology.rejected]: (state, { payload: { data } }) => {
      Toast({ msg: data.error, type: "error" });
      state.error = data.error;
      state.loading = false;
    },
  },
});
export default techReducer.reducer;
