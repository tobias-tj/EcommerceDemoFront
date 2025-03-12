import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "@/LoginForm";
import DashboardLayout from "./layouts/Dashboard";
import DashboardPage from "./pages/DashboardPage";
import BagPage from "./pages/BagPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  // const handleLogout = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   setIsLoggedIn(false);
  // };

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
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/bag"
          element={
            isLoggedIn ? (
              <DashboardLayout>
                <BagPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            isLoggedIn ? (
              <DashboardLayout>
                <CheckoutPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/confirmEmail" element={<ConfirmEmailPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
