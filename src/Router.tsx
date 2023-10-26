import React from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { getItem } from "./utils/storage";
import Main from "./pages/main";
import RenderForum from "./components";

function MainRoutes(): JSX.Element {
  function ProtectedRoutes() {
    const token = getItem("token");
    return !token ? <Navigate to="/" /> : <Outlet />;
  }
  return (
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Signin />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default MainRoutes;
