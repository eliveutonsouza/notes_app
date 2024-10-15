import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formRegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres!" }),
    email: z.string().email({ message: "E-mail inválido, tente novamente!" }),
    password: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres!" }),
    passwordConfirm: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres!" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "A senha precisa ser igual!",
    path: ["passwordConfirm"],
  });

type FormRegisterTypes = z.infer<typeof formRegisterSchema>;

export function FormRegister() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterTypes>({
    resolver: zodResolver(formRegisterSchema),
    values: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmitForm(dataForm: FormRegisterTypes) {
    const { name, email, passwordConfirm: password } = dataForm;

    const dataFormValues = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER_BACKEND}/register`,
        dataFormValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201 || response.status === 200) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/login");
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
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="sr-only">
          Digite seu nome completo
        </label>
        <input
          {...register("name")}
          className="::placeholder:text-gray-400 w-full rounded px-5 py-2"
          id="name"
          type="text"
          placeholder="Seu nome completo"
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name?.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Digite seu e-mail
        </label>
        <input
          {...register("email")}
          className="::placeholder:text-gray-400 w-full rounded px-5 py-2"
          id="email"
          type="text"
          placeholder="Seu e-mail"
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email?.message}</span>
        )}
      </div>

      <div className="block">
        <label htmlFor="password" className="sr-only">
          Digite sua senha
        </label>
        <input
          {...register("password")}
          className="::placeholder:text-gray-400 w-full rounded px-5 py-2"
          id="password"
          type="password"
          placeholder="Sua senha"
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password?.message}
          </span>
        )}
      </div>

      <div className="block">
        <label htmlFor="passwordConfirm" className="sr-only">
          Digite sua senha
        </label>
        <input
          {...register("passwordConfirm")}
          className="::placeholder:text-gray-400 w-full rounded px-5 py-2"
          id="passwordConfirm"
          type="password"
          placeholder="Confirme sua senha"
        />
        {errors.passwordConfirm && (
          <span className="text-sm text-red-500">
            {errors.passwordConfirm?.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded bg-white p-2 text-primary"
      >
        Entrar
      </button>
    </form>
  );
}
