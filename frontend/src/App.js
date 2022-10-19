import { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import AuthHome from "./components/AuthHome";
import Home from "./pages/Home";
import { useDispatch ,useSelector} from "react-redux";
import { addToken } from "./reducers/authReducer";
import Employee from "./pages/Employee";
import Technology from "./pages/Technology";


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state=>state.user.token)
  useEffect(()=>{
    dispatch(addToken())
    if(token){
      navigate('/home')
    }else{
      navigate('/signin')
    }   
  },[token])
  return (
    <div>
      <Header />
      
      <Routes>
        <Route path="/" element={<AuthHome/>}>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
        </Route>
        <Route path="home" element={<Home />}>
          <Route index  element={<Employee />}/>
          <Route path="employee"  element={<Employee />}/>
          <Route path="technology" element={<Technology />}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
