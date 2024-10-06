import { useLocation, useNavigate } from "react-router-dom";
import { token } from "./utils/token";
import { useEffect } from "react";

interface MiddlewareProps {
  children: React.ReactNode;
}

export function Middleware({ children }: MiddlewareProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!token; // Check if the token exists

  useEffect(() => {
    if (!isAuthenticated && location.pathname === "/dashboard") {
      navigate("/login");
    }

    if (
      (isAuthenticated && location.pathname === "/login") ||
      location.pathname === "/register"
    ) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return children;
}
