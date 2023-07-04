import { Routes, Route } from "react-router-dom";

function UserRoutes() {
  return (
    <Routes>
      <Route >
        <Route index />
        <Route path="signup" />
        <Route path="signin" />
        <Route path="*" />
      </Route >
    </Routes>
  )
}

export default UserRoutes;