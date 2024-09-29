import LogoLight from "../../assets/logo-light.png";
import { FormLogin } from "./components/formLogin";

export function Login() {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-[url(../assets/background.png)] bg-no-repeat bg-cover">
      <div className="p-12 bg-primary rounded w-[28.56rem] space-y-5">
        <div className="space-y-5">
          <img
            className="m-auto"
            src={LogoLight}
            alt="Logotipo da Aplicação: um pequeno bloco de notas ao lado na palavra, Notes."
          />
          <h1 className="text-orange-50 text-center m-auto max-w-80">
            Insira seu e-mail abaixo para acessar sua conta.
          </h1>
        </div>

        <FormLogin />
      </div>
    </main>
  );
}
