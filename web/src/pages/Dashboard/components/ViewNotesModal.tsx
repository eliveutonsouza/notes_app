import { PencilSimple } from "@phosphor-icons/react";
import { format } from "date-fns";
import { useContext } from "react";
import { ModalContext } from "../../../context/ModalContextProvider";

interface Note {
  colorHex: string;
  description: string;
  title: string;
  createdAt: string;
  _id: string;
}

interface ViewModalProps {
  data: Note;
  openModalEditeNote: (note: Note) => void;
}

export function ViewNotesModal({ data, openModalEditeNote }: ViewModalProps) {
  const { close } = useContext(ModalContext);

  function onActionEdite() {
    console.log("onActionEdite called");
    openModalEditeNote(data);
    close("viewNote"); // Fechar o modal de visualização
  }

  return (
    <div
      className="flex min-h-52 flex-col justify-between gap-6 rounded-lg bg-white p-6"
      onClick={(e) => e.stopPropagation()} // Impede a propagação do evento de clique
    >
      <div className="space-y-2 overflow-hidden">
        <h2 className="break-words text-2xl font-bold first-letter:uppercase">
          {data?.title}
        </h2>
        <p className="overflow-hidden overflow-ellipsis text-gray-500 first-letter:uppercase">
          {data?.description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <time className="text-gray-500">
          {data?.createdAt &&
            format(new Date(data.createdAt), "dd 'de' MMMM yyyy")}
        </time>
        <button
          className="rounded-full bg-black p-2"
          type="button"
          onClick={onActionEdite}
        >
          <PencilSimple size={24} weight="fill" className="text-white" />
        </button>
      </div>
    </div>
  );
}
