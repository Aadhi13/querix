import { Routes, Route } from "react-router-dom";

import Layout from "../pages/user/Layout";
import Home from "../pages/user/HomePage";
import Signin from "../pages/user/SigninPage";
import Signup from "../pages/user/SignupPage";
import OtpVerify from "../pages/user/OtpVerifyPage";
import ForgotPassword from "../pages/user/FogotPasswordPage";
import NotFound from "../pages/Error/NotFound";

function UserRoutes() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="otp-verify" element={<OtpVerify />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route >
    </Routes>
  )
}

export default UserRoutes;