import { Profile } from "../components/profile";
import logoFull from "../assets/logo-full.png";

export function Header() {
  return (
    <header className="container py-5 m-auto flex justify-between items-center">
      <img src={logoFull} alt="Logo do aplicativo Notes" />

      <div className="flex justify-center items-center gap-4">
        <div className="text-end">
          <h2 className="font-medium ">Eliveuton de Souza Melo</h2>
          <p className="font-light text-sm">eliveuton@gmail.com</p>
        </div>

        <Profile
          name="Eliveuton de Souza Melo"
          imageUrl="https://github.com/eliveutonsouza.png"
        />
      </div>
    </header>
  );
}
