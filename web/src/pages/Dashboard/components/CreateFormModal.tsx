import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ModalContext } from "../../../context/ModalContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCookies } from "react-cookie";

const NewNoteModalForm = z.object({
  title: z
    .string()
    .min(3, { message: "Seu titulo está pequeno demais!" })
    .max(50, { message: "Seu titulo está grande demais!" }),
  description: z
    .string()
    .min(10, { message: "Sua descrição está pequena demais!" })
    .max(255, { message: "Sua descrição está grande demais!" }),
  colorHex: z
    .string()
    .min(7, { message: "Cor inválida" })
    .max(7, { message: "Cor inválida" }),
});

type NewNoteModalForm = z.infer<typeof NewNoteModalForm>;

interface CreateModalProps {
  onRefresh: () => void; // Adiciona a prop para recarregar os dados
}

export function CreateFormModal({ onRefresh }: CreateModalProps) {
  const { close, getModalColor } = useContext(ModalContext);
  const [cookie] = useCookies(["token"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<NewNoteModalForm>({
    resolver: zodResolver(NewNoteModalForm),
    defaultValues: {
      title: "",
      description: "",
      colorHex: "",
    },
  });

  useEffect(() => {
    const colorModal = getModalColor("createNote");
    setValue("colorHex", colorModal); // Atualiza o valor do campo colorHex
  }, [getModalColor, setValue, reset]);

  async function onSubmitForm(data: NewNoteModalForm) {
    console.log("Nota criada com sucesso!");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_SERVER_BACKEND}/post`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookie.token,
        },
      });

      console.log(response.data);

      onRefresh();
      if (response.status === 201 || response.status === 200) {
        reset(); // Reseta os valores do formulário para os valores padrão
        close("createNote");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    }
  }

  function onCancel() {
    close("createNote");
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
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

        <div className="flex w-full justify-between gap-4">
          <button
            className="w-full rounded-md border border-primary p-2 text-primary"
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="w-full rounded-md bg-primary p-2 text-white"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
}
