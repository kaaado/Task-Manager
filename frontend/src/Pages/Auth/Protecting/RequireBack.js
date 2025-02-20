import { Outlet, Navigate, useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function RequireBack() {
  const location = useLocation();
  const token = Cookie().get("task");

  return token ? <Navigate to={location.state?.from || "/"} replace /> : <Outlet />;
}
