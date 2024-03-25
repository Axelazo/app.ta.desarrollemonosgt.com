import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import { useUser } from "./hooks/useUser";
import Login from "./pages/auth/Login";
import AuthOutlet from "./pages/auth/Outlet";
import Register from "./pages/auth/Register";
import Warehouse from "./pages/warehouse/Warehouse";

function App() {

  const {user} = useUser()

  return (
    <Router>
      <Routes>
        {user ? (
          <Route path={"/"} element={<Sidebar />}>
            <Route path="/warehouses" element={<Warehouse />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        ) : (
          <>
            <Route element={<AuthOutlet />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
