// src/routes/ProtectedRoute.jsx
// Blocks unauthenticated users from accessing protected pages

import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

function ProtectedRoute() {
  const [cookies] = useCookies(["access_token"]);

  // No token → kick back to login
  if (!cookies.access_token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;