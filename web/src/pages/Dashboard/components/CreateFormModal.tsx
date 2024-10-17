import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ModalContext } from "../../../context/ModalContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const NewNoteModalForm = z.object({
  title: z
    .string()
    .min(3, { message: "Your title is too short!" })
    .max(50, { message: "Your title is too long!" }),
  description: z
    .string()
    .min(10, { message: "Your description is too short!" })
    .max(255, { message: "Your description is too long!" }),
  colorHex: z
    .string()
    .min(7, { message: "Invalid color" })
    .max(7, { message: "Invalid color" }),
});

type NewNoteModalForm = z.infer<typeof NewNoteModalForm>;

interface CreateModalProps {
  onRefresh: () => void; // Adds the prop to reload the data
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
    setValue("colorHex", colorModal); // Updates the value of the colorHex field
  }, [getModalColor, setValue, reset]);

  async function onSubmitForm(data: NewNoteModalForm) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER_BACKEND}/post`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookie.token,
          },
        },
      );

      onRefresh();
      if (response.status === 201 || response.status === 200) {
        reset(); // Resets the form values to the default values
        toast.success("Note created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        close("createNote");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("Error creating note!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("An unexpected error occurred!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.error("An unexpected error occurred");
        }
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
            What did you do today?
          </label>
          <input
            {...register("title")}
            type="text"
            name="title"
            id="title"
            placeholder="E.g.: I presented a report to my boss..."
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
            How was it?
          </label>
          <textarea
            {...register("description")}
            name="description"
            id="description"
            placeholder="E.g.: I presented a report to my boss with the main project results, including metrics and improvement suggestions. The focus was on optimizing processes and increasing efficiency in the next steps."
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
            Cancel
          </button>

          <button
            type="submit"
            className="w-full rounded-md bg-primary p-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
