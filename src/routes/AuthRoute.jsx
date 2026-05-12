// src/routes/AuthRoute.jsx
// Redirects already-authenticated users away from /login and /register

import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

function AuthRoute() {
  const [cookies] = useCookies(["access_token"]);

  // If the user already has a session token, send them straight to onboarding
  if (cookies.access_token) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}

export default AuthRoute;