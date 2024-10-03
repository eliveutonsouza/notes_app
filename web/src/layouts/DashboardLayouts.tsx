import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function DashboardLayouts() {
  return (
    // Outro componente pode ser renderizado aqui
    <div className="bg-white">
      <Header />
      <Outlet />
    </div>
  );
}
