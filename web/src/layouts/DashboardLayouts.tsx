import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { Footer } from "../components/footer";

export function DashboardLayouts() {
  return (
    // Outro componente pode ser renderizado aqui
    <div className="flex h-screen flex-col justify-between bg-white">
      <div>
        <Header />
        <Hero />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
