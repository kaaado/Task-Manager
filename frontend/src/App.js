import {  Outlet } from "react-router-dom";
import toast from 'react-hot-toast';
import CustomToaster from "./Components/CustomToast";

function App() {

  return (
    <>
  	 <CustomToaster />
     <Outlet />
    </>
  );
}

export default App;
