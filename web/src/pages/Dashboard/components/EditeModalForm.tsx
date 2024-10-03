import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ModalContext } from "../../../context/ModalContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";

const EditeModalFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Seu titulo está pequeno demais!" })
    .max(50, { message: "Seu titulo está grande demais!" }),
  description: z
    .string()
    .min(10, { message: "Sua descrição está pequena demais!" })
    .max(255, { message: "Sua descrição está grande demais!" }),
});

type EditeModalForm = z.infer<typeof EditeModalFormSchema>;

export function EditeModalForm() {
  const { close } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditeModalForm>({
    resolver: zodResolver(EditeModalFormSchema),
  });

  function onSubmitForm(data: EditeModalForm) {
    console.log(data);
    close("editeModal");
  }

  function onDeleteNote() {
    console.log("Deletar anotação");
    close("editeModal");
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
            className="p-2 border border-primary rounded-lg outline-primary"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">
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
            className="p-2 border border-primary rounded-lg h-52 outline-primary"
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description?.message}
            </span>
          )}
        </div>

        <div className="flex w-full justify-between gap-4">
          <button
            className="w-full border border-primary p-2 rounded-md text-primary"
            type="button"
            onClick={() => close("editeModal")}
          >
            Cancelar
          </button>

          <button
            className="w-full bg-primary text-white p-2 rounded-md"
            type="submit"
          >
            Salvar
          </button>

          <button
            className="w-full border-red-400 text-red-400 p-2 rounded-md"
            onClick={onDeleteNote}
          >
            Deletar
          </button>
        </div>
      </div>
    </form>
  );
}
