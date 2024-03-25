import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const user = false;

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
