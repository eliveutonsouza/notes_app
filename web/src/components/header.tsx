import { Profile } from "../components/profile";
import logoFull from "../assets/logo-full.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { Cards, GearSix, SignOut } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContextProvider";

export function Header() {
  const { removeCookie, profileData } = useContext(ProfileContext);
  const navigate = useNavigate();

  const signOut = () => {
    removeCookie("token");
    navigate("/login");
  };

  const routerSettings = () => navigate("/dashboard/settings");
  const routerDashboard = () => navigate("/dashboard");

  return (
    <header className="container m-auto flex items-center justify-between py-4">
      <Link to="/login">
        <img src={logoFull} alt="Logo do aplicativo Notes" />
      </Link>

      <div className="flex items-center justify-center gap-4">
        <div className="text-end">
          <h2 className="font-medium">{profileData.userName || "Usuário"}</h2>
          <p className="text-sm font-light">{profileData.sub || ""}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Profile name={profileData.userName || "Usuário"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={routerDashboard}
              className="flex items-center gap-2 border-b text-sm"
            >
              <Cards size={16} />
              Dashboard
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={routerSettings}
              className="flex items-center gap-2 border-b text-sm"
            >
              <GearSix size={16} />
              Configurações
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={signOut}
              className="flex items-center gap-2 text-sm"
            >
              <SignOut size={16} /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
