import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ModalContext } from "../../../context/ModalContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCookies } from "react-cookie";

const EditeModalFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Seu titulo está pequeno demais!" })
    .max(50, { message: "Seu titulo está grande demais!" }),
  description: z
    .string()
    .min(10, { message: "Sua descrição está pequena demais!" })
    .max(255, { message: "Sua descrição está grande demais!" }),
  colorHex: z.string(),
  id: z.string(),
});

type EditeModalForm = z.infer<typeof EditeModalFormSchema>;

interface Note {
  colorHex: string;
  description: string;
  title: string;
  createdAt: string;
  _id: string;
}

interface EditeModalProps {
  data: Note;
  onRefresh: () => void; // Adiciona a prop para recarregar os dados
}

export function EditeModalForm({ data, onRefresh }: EditeModalProps) {
  const { close } = useContext(ModalContext);
  const [cookie] = useCookies(["token"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditeModalForm>({
    resolver: zodResolver(EditeModalFormSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      colorHex: data.colorHex,
      id: data._id,
    },
  });

  async function onChangeNote(dataForm: EditeModalForm) {
    try {
      await axios.put(`http://localhost:3000/post/${dataForm.id}`, dataForm, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });

      onRefresh();
      close("editeModal");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error("An unexpected error occurred");
      }
    } finally {
      close("editeModal");
    }
  }

  async function onDeleteNote(dataForm: EditeModalForm) {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_SERVER_BACKEND}/post/${dataForm.id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        },
      );

      onRefresh();
      close("editeModal");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error("An unexpected error occurred");
      }
    } finally {
      close("editeModal");
    }
  }

  return (
    <form onSubmit={handleSubmit(onChangeNote)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <label htmlFor="title" className="font-bold">
            O que você fez hoje?
          </label>
          <input
            {...register("title")}
            type="text"
            name="title"
            id="title"
            placeholder="Ex: Apresentei um relatório para meu chefe..."
            className="rounded-lg border border-primary p-2 outline-primary"
          />
          {errors.title && (
            <span className="text-sm text-red-500">
              {errors.title?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="description" className="font-bold">
            Como foi?
          </label>
          <textarea
            {...register("description")}
            name="description"
            id="description"
            placeholder="Ex: Apresentei um relatório para meu chefe com os principais resultados do projeto, incluindo métricas e sugestões de melhoria. O foco foi otimizar processos e aumentar a eficiência nas próximas etapas."
            className="h-52 rounded-lg border border-primary p-2 outline-primary"
          ></textarea>
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description?.message}
            </span>
          )}
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-4">
          <div className="flex w-full gap-4">
            <button
              className="w-full rounded-md border border-primary p-2 text-primary"
              type="button"
              onClick={() => close("editeModal")}
            >
              Cancelar
            </button>

            <button
              className="w-full rounded-md bg-primary p-2 text-white"
              type="submit"
            >
              Alterar
            </button>
          </div>

          <button
            className="w-20 rounded-md text-red-400 underline"
            onClick={() =>
              onDeleteNote({
                title: data.title,
                description: data.description,
                colorHex: data.colorHex,
                id: data._id,
              })
            }
          >
            Deletar
          </button>
        </div>
      </div>
    </form>
  );
}
