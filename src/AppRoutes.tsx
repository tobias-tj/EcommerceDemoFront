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
import ClosePage from "./pages/ClosePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ConfirmCheckoutPage from "./pages/ConfirmCheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import RecoverAccountPage from "./pages/RecoverAccount";
import AdminDashboard from "./pages/admin/AdminDashboard";

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  const [role, setRole] = useState(localStorage.getItem("role") || "USER");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setRole(role || "USER");
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setRole(role);
  };

  return (
    <Router>
      <Routes>
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
          path="/productDetails/:productId"
          element={
            isLoggedIn ? (
              <DashboardLayout>
                <ProductDetailsPage />
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
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              role === "ADMIN" ? (
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          }
        />

        <Route
          path="/closeAccount"
          element={
            isLoggedIn ? (
              <DashboardLayout>
                <ClosePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/confirmEmail" element={<ConfirmEmailPage />} />
        <Route path="/recoverAccount" element={<RecoverAccountPage />} />
        <Route
          path="/confirmCheckout"
          element={isLoggedIn ? <ConfirmCheckoutPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
