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
    if (profileData.token) {
      removeCookie("token");
      navigate("/login");
    }
  };

  const routerSettings = () => navigate("/dashboard/settings");
  const routerDashboard = () => navigate("/dashboard");

  return (
    <header className="container mx-auto flex items-center justify-between px-4 py-4 sm:mx-auto sm:flex-row">
      <Link to="/login">
        <img src={logoFull} alt="Logo do aplicativo Notes" />
      </Link>

      <div className="flex flex-col items-center justify-center gap-4 sm:mt-0 sm:flex-row">
        <div className="hidden text-center sm:block sm:text-end">
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
              <Cards size={16} aria-hidden="true" />
              Dashboard
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={routerSettings}
              className="flex items-center gap-2 border-b text-sm"
            >
              <GearSix size={16} aria-hidden="true" />
              Configurações
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={signOut}
              className="flex items-center gap-2 text-sm"
            >
              <SignOut size={16} aria-hidden="true" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
