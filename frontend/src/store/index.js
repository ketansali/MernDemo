import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import empReducer from "../reducers/empReducer";
import techReducer from "../reducers/techReducer";


const store = configureStore({
  reducer: {
    user: authReducer,
    employee : empReducer,
    technology : techReducer
  }
  
});
export  {store}
