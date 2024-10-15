import { useContext } from "react";
import { ChangeNameForm } from "./components/ChangeNameForm";
import { ProfileContext } from "../../context/ProfileContextProvider";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import Modal from "../../components/Modal";
import { ModalContext } from "../../context/ModalContextProvider";
import axios from "axios";

export function Settings() {
  const { profileData, removeCookie } = useContext(ProfileContext);
  const { open, close, setModalColor } = useContext(ModalContext);

  const openModalDeleteAccount = () => {
    setModalColor("deleteAccount", "#ef4444");
    open("deleteAccount");
  };

  const closeModalDeleteAccount = () => {
    close("deleteAccount");
  };

  const deleteProfile = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_SERVER_BACKEND}/user`,
        {
          headers: {
            Authorization: `Bearer ${profileData.token}`,
          },
        },
      );

      removeCookie("token");
      alert("Conta deletada com sucesso!");

      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    }
  };

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

            <div className="space-y-6">
              <div className="space-y-1 border-t pt-4">
                <h2 className="text-xl font-medium">Deletar conta</h2>
                <p className="text-gray-600">
                  Se você deseja deletar sua conta, clique no botão abaixo.
                </p>
              </div>
              <button
                onClick={openModalDeleteAccount}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                Deletar conta
              </button>

              <Modal id="deleteAccount">
                <div className="rounded-md bg-white p-6">
                  <h2 className="text-xl font-medium">Deletar conta</h2>
                  <p className="text-gray-600">
                    Tem certeza que deseja deletar sua conta? Essa ação não pode
                    ser desfeita.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={deleteProfile}
                      className="rounded bg-red-500 px-4 py-2 text-white"
                    >
                      Deletar conta
                    </button>
                    <button
                      onClick={closeModalDeleteAccount}
                      className="rounded bg-gray-200 px-4 py-2 text-gray-600"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </Modal>

              <p className="text-gray-600">
                Ao deletar sua conta, você perderá todos os seus dados e não
                poderá mais acessar o sistema.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
