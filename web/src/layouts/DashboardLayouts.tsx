import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { Footer } from "../components/footer";

export function DashboardLayouts() {
  return (
    // Outro componente pode ser renderizado aqui
    <div className="h-screen bg-white flex flex-col justify-between item">
      <div>
        <Header />
        <Hero />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
