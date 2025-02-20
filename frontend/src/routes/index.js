import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Auth/Login";
import Register from "../Pages/Auth/Auth/Register";
import Tasks from "../Pages/Tasks/Tasks";
import RequireAuth from "../Pages/Auth/Protecting/RequireAuth";
import RequireBack from "../Pages/Auth/Protecting/RequireBack";
import Err404 from "../Pages/Auth/Error/404";
import GoogleCallBack from "../Pages/Auth/Auth/GoogleCallBack";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth/google/callback", element: <GoogleCallBack /> },
      { path: "/*", element: <Err404 /> },

      // Prevent logged-in users from accessing login/register
      {
        element: <RequireBack />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },

      // Protected Routes (Require Authentication)
      {
        element: <RequireAuth />,
        children: [{ path: "/tasks", element: <Tasks /> }],
      },
    ],
  },
]);

export default router;
