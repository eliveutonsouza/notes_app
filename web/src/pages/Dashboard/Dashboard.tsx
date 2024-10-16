import {
  ArrowLeft,
  ArrowRight,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  SmileySad,
  Spinner,
} from "@phosphor-icons/react";
import { Input } from "../../components/input";
import { useCallback, useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContextProvider";
import { EditeModalForm } from "./components/EditeModalForm";
import Modal from "../../components/Modal";
import axios from "axios";
import { format } from "date-fns";
import { useCookies } from "react-cookie";
import { CreateFormModal } from "./components/CreateFormModal";
import { ViewNotesModal } from "./components/ViewNotesModal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Note {
  colorHex: string;
  description: string;
  title: string;
  createdAt: string;
  _id: string;
}

const SearchFormSchema = z.object({
  search: z.string().min(3, { message: "Your search is too short!" }),
});

type SearchFormType = z.infer<typeof SearchFormSchema>;

const buttonColors = ["#F6C974", "#F19674", "#E4F592", "#43E6FB"];

export function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { open, close, setModalColor } = useContext(ModalContext);
  const [cookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewNote, setViewNote] = useState<Note | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showColorButtons, setShowColorButtons] = useState(false);

  const openModalNewNote = (color: string) => {
    setModalColor("createNote", color);
    open("createNote");
  };

  const openModalEditeNote = (note: Note) => {
    setEditingNote(note);
    open("editeModal");
    close("viewNote");
  };

  const openModalViewNote = (note: Note) => {
    setViewNote(note);
    open("viewNote");
  };

  const refreshNotes = async () => {
    await getNotes(currentPage);
  };

  const getNotes = useCallback(
    async (page = 1, search = "") => {
      setIsLoading(true);
      try {
        const url = search
          ? `${import.meta.env.VITE_API_SERVER_BACKEND}/post/title?title=${search}`
          : `${import.meta.env.VITE_API_SERVER_BACKEND}/post?page=${page}`;

        const response = await axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          })
          .finally(() => {
            setIsLoading(false);
          });

        setNotes(response.data.body);
        setTotalPages(response.data.maxPage);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setNotes([]);
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
    getNotes(currentPage);
  }, [getNotes, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const { register, handleSubmit, watch, reset } = useForm<SearchFormType>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValue = watch("search") || "";

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue.length >= 3) {
        getNotes(1, searchValue); // Filters notes while typing
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn); // Clears debounce
  }, [searchValue, getNotes]); // Runs whenever the input value changes

  async function onSubmitForm(data: SearchFormType) {
    await getNotes(1, data.search);
    reset();
  }

  return (
    <section className="container m-auto flex flex-col justify-between gap-6">
      <div>
        <div className="container m-auto flex items-center justify-between">
          <div className="flex gap-2">
            <MagnifyingGlass size={24} weight="bold" />
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <Input
                {...register("search")}
                placeholder="Search..."
                type="text"
                id="search"
              />
            </form>
          </div>

          <div className="flex items-center gap-6">
            {/* Initially hidden color buttons */}
            <div
              className={`flex gap-6 ${showColorButtons ? "block" : "hidden"}`}
            >
              {buttonColors.map((color) => (
                <button
                  key={color}
                  className="h-6 w-6 rounded-full"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    openModalNewNote(color); // Opens the modal with the chosen color
                    setShowColorButtons(false); // Hides the color buttons after selection
                  }}
                />
              ))}
            </div>

            {/* Add button that shows color buttons */}
            <button
              className="rounded-full bg-black p-3 text-white"
              type="button"
              onClick={() => setShowColorButtons(!showColorButtons)} // Toggles between showing and hiding color buttons
            >
              <Plus size={24} weight="bold" />
            </button>
          </div>
        </div>

        <Modal id="createNote">
          <CreateFormModal onRefresh={refreshNotes} />
        </Modal>
      </div>

      <div className="flex min-h-[40rem] flex-col justify-between">
        {isLoading ? (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <Spinner className="animate-spin" size={24} />
            <p>Loading Notes</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <SmileySad size={64} className="text-primary" />
            <p className="text-xl">No notes to display...</p>
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
                      {note.title.slice(0, 30)}...
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
          </div>
        )}
        {/* Pagination buttons at the bottom of the page */}
        <div className="my-6 flex items-center justify-center gap-8">
          <button
            className="rounded bg-black p-3"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ArrowLeft size={17} weight="bold" className="text-white" />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`${
                currentPage === index + 1 ? "font-bold underline" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="rounded bg-black p-3"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowRight size={17} weight="bold" className="text-white" />
          </button>
        </div>
      </div>

      <Modal id="editeModal">
        {editingNote && (
          <EditeModalForm data={editingNote} onRefresh={refreshNotes} />
        )}
      </Modal>
    </section>
  );
}
