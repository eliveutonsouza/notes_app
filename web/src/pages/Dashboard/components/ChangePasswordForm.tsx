import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { ProfileContext } from "../../../context/ProfileContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" }),
    passwordConfirm: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters long!",
    }),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "Passwords must match!",
    path: ["passwordConfirm"],
  });

type ChangePasswordFormType = z.infer<typeof ChangePasswordFormSchema>;

export function ChangePasswordForm() {
  const { profileData } = useContext(ProfileContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordFormSchema),
    values: {
      password: "",
      passwordConfirm: "",
      newPassword: "",
    },
  });

  async function onSubmitForm(dataForm: ChangePasswordFormType) {
    const { password, newPassword } = dataForm;
    const dataFormValues = {
      password,
      newPassword,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_SERVER_BACKEND}/user`,
        { body: dataFormValues },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + profileData.token,
          },
        },
      );
      if (response.status === 201 || response.status === 200) {
        toast.success("Account password changed successfully!", {
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
        if (error.response?.status === 400) {
          toast.error("Error changing account password!", {
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
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
      <div className="space-y-2">
        <label htmlFor="password" className="text-pr text-base font-medium">
          Enter your old password
        </label>
        <input
          {...register("password")}
          className="::placeholder:text-gray-400 w-full rounded border px-5 py-2"
          id="password"
          type="password"
          placeholder="Your old password"
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password?.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="newPassword" className="text-pr text-base font-medium">
          Enter your new password
        </label>
        <input
          {...register("newPassword")}
          className="::placeholder:text-gray-400 w-full rounded border px-5 py-2"
          id="newPassword"
          type="password"
          placeholder="Your new password"
        />
        {errors.newPassword && (
          <span className="text-sm text-red-500">
            {errors.newPassword?.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="passwordConfirm"
          className="text-pr text-base font-medium"
        >
          Confirm your new password
        </label>
        <input
          {...register("passwordConfirm")}
          className="::placeholder:text-gray-400 w-full rounded border px-5 py-2"
          id="passwordConfirm"
          type="password"
          placeholder="Confirm your new password"
        />
        {errors.passwordConfirm && (
          <span className="text-sm text-red-500">
            {errors.passwordConfirm?.message}
          </span>
        )}
      </div>

      <button type="submit" className="rounded bg-primary p-2 text-white">
        Change
      </button>
    </form>
  );
}
