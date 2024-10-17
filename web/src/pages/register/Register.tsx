import LogoLight from "../../assets/logo-light.png";
import { FormRegister } from "./components/formRegister";

export function Register() {
  return (
    <main className="flex h-screen w-screen items-center justify-center border-t-8 border-t-primary bg-[url(../assets/background.png)] bg-cover bg-no-repeat">
      <div className="mx-4 w-full max-w-md space-y-5 rounded bg-primary p-6 sm:p-8 md:mx-0 md:p-12">
        <div className="space-y-5">
          <img
            className="mx-auto h-10"
            src={LogoLight}
            alt="Logotipo da Aplicação: um pequeno bloco de notas ao lado na palavra, Notes."
          />
          <h1 className="mx-auto max-w-xs text-center text-orange-50 sm:max-w-sm md:max-w-md">
            Insira seu e-mail abaixo para acessar sua conta.
          </h1>
        </div>

        <FormRegister />

        <p className="text-center text-white">
          Já tem uma conta?{" "}
          <a href="/login" className="text-orange-50 underline">
            Faça login
          </a>
        </p>
      </div>
    </main>
  );
}
