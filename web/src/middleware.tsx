import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { useCookies } from "react-cookie";

interface MiddlewareProps {
  children: React.ReactNode;
}

export function Middleware({ children }: MiddlewareProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [token] = useCookies(["token"]);
  const { isExpired } = useJwt(token.token);

  const isAuthenticated = !!token; // Check if the token exists
  const isTokenExpired = isExpired; // Check if the token is expired

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isHomePage = location.pathname === "/";
  const isDashboardPage = location.pathname.startsWith("/dashboard"); // Check if the path starts with /dashboard

  useEffect(() => {
    // If the token is expired or not authenticated and tries to access the dashboard, redirect to login
    if ((!isAuthenticated || isTokenExpired) && isDashboardPage) {
      navigate("/login");
      return;
    }

    // If authenticated and tries to access login/register, redirect to the dashboard
    if (isAuthenticated && !isTokenExpired && (isLoginPage || isRegisterPage)) {
      navigate("/dashboard");
      return;
    }

    // If authenticated and not on home or dashboard, redirect to the dashboard
    if (isAuthenticated && !isTokenExpired && !isHomePage && !isDashboardPage) {
      navigate("/dashboard");
    }
  }, [
    isAuthenticated,
    isTokenExpired,
    isLoginPage,
    isRegisterPage,
    isHomePage,
    isDashboardPage,
    navigate,
    location.pathname, // Add location.pathname to the dependency array
  ]);

  return children;
}
