import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
  const location = useLocation();
  const { auth } = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location }} replace />;
}
