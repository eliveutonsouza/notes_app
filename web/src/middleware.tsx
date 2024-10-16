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
  const [cookie] = useCookies(["token"]);
  const { isExpired } = useJwt(cookie.token);

  const isAuthenticated = !!cookie.token; // Checks if the token exists
  const isTokenExpired = isExpired; // Checks if the token is expired

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isHomePage = location.pathname === "/";
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    // If the token is expired and trying to access the dashboard, redirect to login
    if (isTokenExpired && isDashboardPage) {
      navigate("/login");
      return;
    }

    // If authenticated and trying to access login or register, redirect to the dashboard
    if (isAuthenticated && (isLoginPage || isRegisterPage)) {
      navigate("/dashboard");
      return;
    }

    // If authenticated and not on the home page or dashboard, redirect to the dashboard
    if (isAuthenticated && !isHomePage && !isDashboardPage) {
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
  ]);

  return children; // Returns the children if none of the redirection conditions are met
}
