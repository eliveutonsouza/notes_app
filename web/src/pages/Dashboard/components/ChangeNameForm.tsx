import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { ProfileContext } from "../../../context/ProfileContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangeNameFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long!" })
    .max(20, { message: "Name must be at most 20 characters long!" }),
});

type ChangeNameFormType = z.infer<typeof ChangeNameFormSchema>;

export function ChangeNameForm() {
  const { profileData, updateProfileData } = useContext(ProfileContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangeNameFormType>({
    resolver: zodResolver(ChangeNameFormSchema),
    values: {
      name: "",
    },
  });

  async function onSubmitForm(dataForm: ChangeNameFormType) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_SERVER_BACKEND}/user`,
        {
          body: dataForm,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + profileData.token,
          },
        },
      );

      if (response.status === 201 || response.status === 200) {
        updateProfileData({
          userName: response.data.body.name,
          email: response.data.body.email,
        });

        navigate("/dashboard/settings"); // Reload the page to update the username in the header

        toast.success("Account name changed successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        if (error.response?.status === 400) {
          toast.error("Error changing account name!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error("An unexpected error occurred", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("An unexpected error occurred");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col gap-4 md:flex-row"
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-pr text-base font-medium">
          Enter a new username
        </label>
        <input
          {...register("name")}
          className="::placeholder:text-gray-400 w-full rounded border px-5 py-2"
          id="name"
          type="text"
          placeholder="Choose a new username"
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name?.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="w-full self-end rounded bg-primary px-4 py-2 text-white md:w-auto"
      >
        Change
      </button>
    </form>
  );
}
