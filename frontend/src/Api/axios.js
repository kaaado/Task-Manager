import axios from 'axios';
import Cookie from 'cookie-universal';
import { BASEURL } from "./Api";
const cookie = Cookie();
const token = cookie.get("task");

const Axios = axios.create({
  baseURL: BASEURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default Axios; 
