import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { HomeLayouts } from "./layouts/HomeLayouts";
import { DashboardLayouts } from "./layouts/DashboardLayouts";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayouts />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<DashboardLayouts />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
