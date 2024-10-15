import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { ProfileContext } from "../../../context/ProfileContextProvider";
import axios from "axios";

const ChangePasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres!" }),
    passwordConfirm: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres!" }),
    newPassword: z.string().min(8, {
      message: "Senha deve ter no mínimo 8 caracteres!",
    }),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "A senha precisa ser igual!",
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
    console.log(dataFormValues);
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
        console.log("Usuário alterado com sucesso!", response.data);
        reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
      <div className="space-y-2">
        <label htmlFor="password" className="text-pr text-base font-medium">
          Digite sua senha antiga
        </label>
        <input
          {...register("password")}
          className="::placeholder:text-gray-400 w-full rounded border px-5 py-2"
          id="password"
          type="password"
          placeholder="Sua senha antiga"
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password?.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="newPassword" className="text-pr text-base font-medium">
          Digite sua senha nova
        </label>
        <input
          {...register("newPassword")}
          className="::placeholder:text-gray-400 w-full rounded border px-5 py-2"
          id="newPassword"
          type="password"
          placeholder="Sua senha nova"
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
          Confirme sua senha senha nova
        </label>
        <input
          {...register("passwordConfirm")}
          className="::placeholder:text-gray-400 w-full rounded border px-5 py-2"
          id="passwordConfirm"
          type="password"
          placeholder="Confirme sua senha nova"
        />
        {errors.passwordConfirm && (
          <span className="text-sm text-red-500">
            {errors.passwordConfirm?.message}
          </span>
        )}
      </div>

      <button type="submit" className="rounded bg-primary p-2 text-white">
        Alterar
      </button>
    </form>
  );
}
