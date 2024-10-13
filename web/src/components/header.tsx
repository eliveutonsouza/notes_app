import { Profile } from "../components/profile";
import logoFull from "../assets/logo-full.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { GearSix, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function Header() {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["token"]);

  const signOut = () => {
    removeCookie("token");
    navigate("/login");
  };

  const routerSetting = () => navigate("/dashboard/settings");

  return (
    <header className="container m-auto flex items-center justify-between py-4">
      <img src={logoFull} alt="Logo do aplicativo Notes" />

      <div className="flex items-center justify-center gap-4">
        <div className="text-end">
          <h2 className="font-medium">Eliveuton de Souza Melo</h2>
          <p className="text-sm font-light">eliveuton@gmail.com</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Profile
              name="Eliveuton de Souza Melo"
              imageUrl="https://github.com/eliveutonsouza.png"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={routerSetting}
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
