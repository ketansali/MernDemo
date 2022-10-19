import axios from 'axios'
import { api } from '../config/urlConfig'
//import {store} from '../store/index'

const axiosInstnce = axios.create({
    baseURL : api,  
})
const getTokenSilently = ()=>{
  return localStorage.getItem('token')
}
axiosInstnce.interceptors.request.use(async(req) => { 
  const token = await getTokenSilently();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });
export default axiosInstnce


