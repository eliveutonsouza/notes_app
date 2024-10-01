import { MagnifyingGlass, PencilSimple, Plus } from "@phosphor-icons/react";
import { BannerMeteorological } from "../../components/BannerMeteorological";
import { Input } from "../../components/input";
import { format } from "date-fns";
import { Pagination } from "../../components/pagination";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContextProvider";
import { EditeModalForm } from "./components/EditeModalForm";
import { Modal } from "../../components/Modal";
import { CreateFormModal } from "./components/CreateFormModal";

// Crie um json com um titulo e descrição de uma anotação do dia. Crie 12 anotações diferentes.
const notes = [
  {
    id: 1,
    title: "Meu dia na escola foi bom",
    description:
      "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie...",
    createdAt: "2023-10-01",
    color: "#43E6FB",
  },
  {
    id: 2,
    title: "Aprendi a cozinhar",
    description:
      "Hoje eu aprendi a fazer um prato novo na cozinha. Foi uma experiência incrível...",
    createdAt: "2023-10-02",
    color: "#E5F693",
  },
  {
    id: 3,
    title: "Passeio no parque",
    description:
      "Fui ao parque com meus amigos e tivemos um ótimo dia jogando frisbee...",
    createdAt: "2023-10-03",
    color: "#F6C974",
  },
  {
    id: 4,
    title: "Estudos intensivos",
    description:
      "Passei o dia estudando para a prova de matemática. Estou confiante que vou me sair bem...",
    createdAt: "2023-10-04",
    color: "#F19674",
  },
  {
    id: 5,
    title: "Dia de descanso",
    description:
      "Hoje tirei o dia para descansar e assistir minhas séries favoritas...",
    createdAt: "2023-10-05",
    color: "#43E6FB",
  },
  {
    id: 6,
    title: "Visita ao museu",
    description:
      "Visitei o museu de arte moderna e fiquei impressionado com as exposições...",
    createdAt: "2023-10-06",
    color: "#E5F693",
  },
  {
    id: 7,
    title: "Treino na academia",
    description: "Fiz um treino intenso na academia e me sinto muito bem...",
    createdAt: "2023-10-07",
    color: "#F6C974",
  },
  {
    id: 8,
    title: "Reunião de trabalho",
    description:
      "Tive uma reunião importante no trabalho e conseguimos fechar um grande negócio...",
    createdAt: "2023-10-08",
    color: "#F19674",
  },
  {
    id: 9,
    title: "Jantar com a família",
    description:
      "Tive um jantar maravilhoso com minha família. Foi um momento especial...",
    createdAt: "2023-10-09",
    color: "#43E6FB",
  },
  {
    id: 10,
    title: "Projeto pessoal",
    description:
      "Trabalhei no meu projeto pessoal de desenvolvimento web. Estou fazendo bons progressos...",
    createdAt: "2023-10-10",
    color: "#E5F693",
  },
  {
    id: 11,
    title: "Dia de compras",
    description:
      "Fui ao shopping e comprei algumas roupas novas. Foi um dia divertido...",
    createdAt: "2023-10-11",
    color: "#F6C974",
  },
  {
    id: 12,
    title: "Leitura de um livro",
    description:
      "Passei o dia lendo um livro interessante sobre desenvolvimento pessoal...",
    createdAt: "2023-10-12",
    color: "#F19674",
  },
];

export function Dashboard() {
  const { open } = useContext(ModalContext);

  function openModalNewNote() {
    open("createNote");
  }

  function openModalEditeNote() {
    open("editeModal");
  }

  return (
    <div className="flex flex-col gap-6 pb-2">
      <BannerMeteorological />

      <div className="container flex justify-between items-center m-auto">
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

      <div className="container m-auto">
        <div className="grid grid-cols-4 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`min-w-72 p-6 rounded-lg bg-[${note.color}] flex flex-col justify-between gap-4`}
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="m-auto">
        <Pagination />
      </div>

      <Modal id="createNote">
        <CreateFormModal />
      </Modal>

      <Modal id="editeModal">
        <EditeModalForm />
      </Modal>
    </div>
  );
}
