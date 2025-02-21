import {Outlet,Navigate,useNavigate} from 'react-router-dom';
import Cookie from 'cookie-universal';
import { useState,useEffect } from 'react';
import Axios from '../../../Api/axios';
import {  USER } from '../../../Api/Api';
import LoadingSubmit from '../../../Components/Loading/loading.js';

export default function RequireAuth(){
const [user, setUser] = useState("");



const nav = useNavigate();
useEffect(()=>{
   Axios.get(`/${USER}`).then(res=>setUser(res.data)).catch(()=> nav('/login'),{replace:true} );
},[])

const cookie = Cookie();
const token = cookie.get('task')

return token ? user=== "" ? <LoadingSubmit /> :   <Outlet /> : <Navigate to={'/login'}  />;

}
