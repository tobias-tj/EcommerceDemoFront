import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import LoginForm from "@/LoginForm";
import DashboardLayout from "./layouts/Dashboard";
import DashboardPage from "./pages/DashboardPage";
import BagPage from "./pages/BagPage";
import CheckoutPage from "./pages/CheckoutPage";

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de inicio de sesión */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />

        {/* Rutas protegidas dentro del dashboard */}
        {/* <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}
        <Route
          path="/home"
          element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/bag"
          element={
            <DashboardLayout>
              <BagPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <DashboardLayout>
              <CheckoutPage />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
