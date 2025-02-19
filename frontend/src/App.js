import {  Outlet } from "react-router-dom";

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
