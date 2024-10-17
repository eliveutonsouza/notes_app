import { useCallback, useContext } from "react";
import { ChangeNameForm } from "./components/ChangeNameForm";
import { ProfileContext } from "../../context/ProfileContextProvider";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import Modal from "../../components/Modal";
import { ModalContext } from "../../context/ModalContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

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

  const deleteProfile = useCallback(async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_SERVER_BACKEND}/user`, {
        headers: {
          Authorization: `Bearer ${profileData.token}`,
        },
      });

      removeCookie("token");

      toast.success("Account delete successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("Error account delete!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  }, [profileData.token, removeCookie]);

  return (
    <main>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <section className="col-span-3 md:col-span-1 md:border-r">
            <nav className="flex flex-col gap-4 p-4">
              <button className="rounded bg-primary py-2 text-white">
                Profile
              </button>
            </nav>
          </section>
          <section className="col-span-3 flex max-w-full flex-col gap-6 p-6 md:max-w-3xl">
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold">Settings</h1>
              <p className="text-gray-600">
                Configure your account preferences, such as name, email, and
                password.
              </p>
            </div>

            <div className="flex flex-col gap-12">
              <div className="space-y-6">
                <div className="space-y-1 border-t pt-4">
                  <h2 className="text-xl font-medium">Change your name</h2>
                  <p className="text-gray-600">
                    Change your username so we can call you by your preferred
                    name.
                  </p>
                </div>
                <ChangeNameForm />
              </div>

              <div className="space-y-6">
                <div className="space-y-1 border-t pt-4">
                  <h2 className="text-xl font-medium">Change your password</h2>
                  <p className="text-gray-600">
                    Change your password to keep your account always secure.
                  </p>
                </div>
                <ChangePasswordForm />
              </div>

              <div className="space-y-6">
                <div className="space-y-1 border-t pt-4">
                  <h2 className="text-xl font-medium">Delete account</h2>
                  <p className="text-gray-600">
                    If you want to delete your account, click the button below.
                  </p>
                </div>
                <button
                  onClick={openModalDeleteAccount}
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  Delete account
                </button>

                <p className="text-gray-600">
                  By deleting your account, you will lose all your data and will
                  no longer be able to access the system.
                </p>
              </div>

              <Modal id="deleteAccount">
                <div className="rounded-md bg-white p-6">
                  <h2 className="mb-2 text-xl font-medium">Delete Account</h2>
                  <p className="text-gray-600">
                    Are you sure you want to delete your account? This action
                    cannot be undone.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={deleteProfile}
                      className="rounded bg-red-500 px-4 py-2 text-white"
                    >
                      Delete Account
                    </button>
                    <button
                      onClick={closeModalDeleteAccount}
                      className="rounded bg-gray-200 px-4 py-2 text-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </section>
        </div>
      </div>

      <footer className="flex items-center justify-center bg-black py-7 text-white">
        <p>© {new Date().getFullYear()} - All rights reserved</p>
      </footer>
    </main>
  );
}
