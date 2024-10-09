import {
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Spinner,
} from "@phosphor-icons/react";
import { Input } from "../../components/input";
import { Pagination } from "../../components/pagination";
import { useCallback, useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContextProvider";
import { EditeModalForm } from "./components/EditeModalForm";
import { Modal } from "../../components/Modal";
import axios from "axios";
import { format } from "date-fns";
import { useCookies } from "react-cookie";
import { CreateFormModal } from "./components/CreateFormModal";
import { ViewNotesModal } from "./components/ViewNotesModal";

interface Note {
  colorHex: string;
  description: string;
  title: string;
  createdAt: string;
  _id: string;
}

export function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { open, close } = useContext(ModalContext);
  const [cookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewNote, setViewNote] = useState<Note | null>(null);

  const openModalNewNote = () => open("createNote");

  // Abre o modal de edição e define a nota a ser editada
  const openModalEditeNote = (note: Note) => {
    setEditingNote(note);
    open("editeModal");
    close("viewNote"); // Fechar o modal de visualização ao abrir o de edição
  };

  // Abre o modal de visualização e define a nota a ser visualizada
  const openModalViewNote = (note: Note) => {
    setViewNote(note);
    open("viewNote");
  };

  const refreshNotes = async () => {
    // Função para atualizar as notas após o submit do modal de edição
    await getNotes();
    // close("editeModal"); // Fecha o modal após a atualização
  };

  const getNotes = useCallback(
    async (page = 1) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/post?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          },
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
    },
    [cookie.token],
  );

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <div className="container m-auto flex flex-col justify-between gap-6">
      <div>
        <div className="container m-auto flex items-center justify-between">
          <div className="flex gap-2">
            <MagnifyingGlass size={24} weight="bold" />
            <Input placeholder="Procurar..." />
          </div>

          <div>
            <button
              className="rounded-full bg-black p-3 text-white"
              type="button"
              onClick={openModalNewNote}
            >
              <Plus size={24} weight="bold" />
            </button>
          </div>
        </div>

        <Modal id="createNote">
          <CreateFormModal onRefresh={refreshNotes} />
        </Modal>
      </div>

      {isLoading ? (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <Spinner className="animate-spin" size={24} />
          <p>Carregando Notas</p>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-between">
          <div className="grid grid-cols-4 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                style={{ backgroundColor: note.colorHex }}
                className="flex max-h-52 min-h-52 min-w-80 max-w-80 flex-col items-start justify-between gap-4 rounded-lg p-6"
              >
                <div
                  className="flex cursor-pointer flex-col gap-2 text-start"
                  onClick={() => openModalViewNote(note)}
                >
                  <h2 className="font-bold first-letter:uppercase">
                    {note.title}
                  </h2>
                  <p className="tracking-wider">
                    {note.description.slice(0, 80)}...
                  </p>
                </div>

                <div className="flex w-full items-center justify-between">
                  <time>
                    {format(new Date(note.createdAt), "dd 'de' MMMM yyyy")}
                  </time>

                  <button
                    className="z-10 rounded-full bg-black p-2"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModalEditeNote(note);
                    }}
                  >
                    <PencilSimple
                      size={24}
                      weight="fill"
                      className="text-white"
                    />
                  </button>
                </div>
              </div>
            ))}

            <Modal id="viewNote">
              {viewNote && (
                <ViewNotesModal
                  data={viewNote}
                  openModalEditeNote={openModalEditeNote}
                />
              )}
            </Modal>
          </div>

          <div className="my-6">
            <Pagination />
          </div>

          {/* Modal de edição */}
          <Modal id="editeModal">
            {editingNote && (
              <EditeModalForm data={editingNote} onRefresh={refreshNotes} />
            )}
          </Modal>
        </div>
      )}
    </div>
  );
}
