import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/register/Register";
import { DashboardLayouts } from "./layouts/DashboardLayouts";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Login } from "./pages/login/Login";
import { Settings } from "./pages/Dashboard/Settings";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<DashboardLayouts />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
