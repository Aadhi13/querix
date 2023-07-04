import { Routes, Route } from "react-router-dom";


function AdminRoutes() {
  return (
    <Routes>
      <Route path="signin" />
      <Route path="*" />
    </Routes>
  )
}

export default AdminRoutes