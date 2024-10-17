import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Hero } from "../components/hero";

export function DashboardLayouts() {
  return (
    // Outro componente pode ser renderizado aqui
    <div className="bg-white">
      <Header />
      <Hero />
      <Outlet />
    </div>
  );
}
