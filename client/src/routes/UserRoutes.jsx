import { Routes, Route } from "react-router-dom";

import Layout from "../pages/user/Layout";
import Home from "../pages/user/HomePage";
import NotFound from "../pages/Error/NotFound";

function UserRoutes() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="signup" />
        <Route path="signin" />
        <Route path="*" element={<NotFound />} />
      </Route >
    </Routes>
  )
}

export default UserRoutes;