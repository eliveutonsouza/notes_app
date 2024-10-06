import {
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Spinner,
} from "@phosphor-icons/react";
import { Input } from "../../components/input";
import { Pagination } from "../../components/pagination";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContextProvider";
import { EditeModalForm } from "./components/EditeModalForm";
import { Modal } from "../../components/Modal";
import axios from "axios";
import { format } from "date-fns";
import { useCookies } from "react-cookie";
import { CreateFormModal } from "./components/CreateFormModal";

interface Note {
  colorHex: string;
  description: string;
  title: string;
  createdAt: string;
  _id: string;
}

export function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { open } = useContext(ModalContext);
  const [cookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(true);

  const openModalNewNote = () => open("createNote");
  const openModalEditeNote = () => open("editeModal");

  useEffect(() => {
    async function getNotes(page = 1) {
      try {
        const response = await axios.get(
          `http://localhost:3000/post?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          }
        );

        setNotes(response.data.body);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
        } else {
          console.error("An unexpected error occurred");
        }
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }

    getNotes();
  }, [cookie.token]);

  console.log(isLoading);
  return (
    <div className="flex flex-col gap-6 pb-2">
      <div className="container m-auto  h-[calc(100vh-20rem)] flex flex-col gap-6">
        <div>
          <div className="container flex justify-between items-center m-auto ">
            <div className="flex gap-2">
              <MagnifyingGlass size={24} weight="bold" />
              <Input placeholder="Procurar..." />
            </div>

            <div>
              <button
                className="bg-black text-white p-3 rounded-full"
                type="button"
                onClick={openModalNewNote}
              >
                <Plus size={24} weight="bold" />
              </button>
            </div>
          </div>

          <Modal id="createNote">
            <CreateFormModal />
          </Modal>
        </div>

        {isLoading ? (
          <div className="h-full flex flex-col gap-4 justify-center items-center">
            <Spinner className="animate-spin" size={24} />
            <p>Carregando Notas</p>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-between items-center">
            <div className="grid grid-cols-4 gap-6">
              {notes.map((note) => (
                <div
                  key={note._id}
                  style={{ backgroundColor: note.colorHex }}
                  className="min-w-72 p-6 rounded-lg flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold">{note.title}</h2>
                    <p className="tracking-wider">{note.description}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <time>
                      {format(new Date(note.createdAt), "dd 'de' MMMM yyyy")}
                    </time>

                    <button
                      className="rounded-full bg-black p-2"
                      type="button"
                      onClick={openModalEditeNote}
                    >
                      <PencilSimple
                        size={24}
                        weight="fill"
                        className="text-white"
                      />
                    </button>

                    <Modal id="editeModal">
                      <EditeModalForm data={note} />
                    </Modal>
                  </div>
                </div>
              ))}
            </div>

            <div className="">
              <Pagination />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
