import { Outlet } from "react-router-dom";

export function DashboardLayouts() {
  return (
    // Outro componente pode ser renderizado aqui
    <div>
      <p>Cabeçalho</p>
      <Outlet />
    </div>
  );
}
