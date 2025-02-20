import { Outlet, Navigate } from "react-router-dom";
import Cookie from "cookie-universal";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useUser } from "../../../Context/UserContext";

export default function RequireAuth() {
  const { user, isLoading } = useUser();
  const cookie = Cookie();
const token = cookie.get('task')

  
return token ?  <Outlet /> : <Navigate to={'/login'} replace={true} />;
}
