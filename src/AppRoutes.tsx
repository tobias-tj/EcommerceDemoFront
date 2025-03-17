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
import ChangedPasswordPage from "./pages/ChangedPasswordPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ConfirmCheckoutPage from "./pages/ConfirmCheckoutPage";

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
        <Route
          path="/changedPass"
          element={isLoggedIn ? <ChangedPasswordPage /> : <Navigate to="/" />}
        />
        <Route
          path="/confirmCheckout"
          element={isLoggedIn ? <ConfirmCheckoutPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
