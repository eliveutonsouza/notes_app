import { useContext } from "react";
import { ChangeNameForm } from "./components/ChangeNameForm";
import { ProfileContext } from "../../context/ProfileContextProvider";
import { ChangePasswordForm } from "./components/ChangePasswordForm";

export function Settings() {
  const { profileData } = useContext(ProfileContext);

  console.log(profileData);

  return (
    <main className="container m-auto">
      <div className="grid h-screen grid-cols-4">
        <section className="col-span-1 border-r">
          <nav className="flex flex-col gap-4 p-4">
            <button className="rounded bg-primary py-2 text-white">
              Perfil
            </button>
          </nav>
        </section>
        <section className="col-span-3 flex max-w-3xl flex-col gap-6 p-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold">Configurações</h1>
            <p className="text-gray-600">
              Configure suas preferências de conta, como nome, e-mail e senha.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            <div className="space-y-6">
              <div className="space-y-1 border-t pt-4">
                <h2 className="text-xl font-medium">Altere seu nome</h2>
                <p className="text-gray-600">
                  Altere seu nome de usuário, para que possamos te chamar pelo
                  nome que você preferir.
                </p>
              </div>
              <ChangeNameForm />
            </div>

            <div className="space-y-6">
              <div className="space-y-1 border-t pt-4">
                <h2 className="text-xl font-medium">Altere sua senha</h2>
                <p className="text-gray-600">
                  Altere sua senha para manter sua conta sempre segura.
                </p>
              </div>
              <ChangePasswordForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
