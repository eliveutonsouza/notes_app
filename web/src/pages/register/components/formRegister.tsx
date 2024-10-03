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

    console.log(dataFormValues);

    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        dataFormValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Usuário cadastrado com sucesso!");
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
          className="w-full py-2 px-5 rounded ::placeholder:text-gray-400"
          id="name"
          type="text"
          placeholder="Seu nome completo"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Digite seu e-mail
        </label>
        <input
          {...register("email")}
          className="w-full py-2 px-5 rounded ::placeholder:text-gray-400"
          id="email"
          type="text"
          placeholder="Seu e-mail"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email?.message}</span>
        )}
      </div>

      <div className="block">
        <label htmlFor="password" className="sr-only">
          Digite sua senha
        </label>
        <input
          {...register("password")}
          className="w-full py-2 px-5 rounded ::placeholder:text-gray-400"
          id="password"
          type="password"
          placeholder="Sua senha"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
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
          className="w-full py-2 px-5 rounded ::placeholder:text-gray-400"
          id="passwordConfirm"
          type="password"
          placeholder="Confirme sua senha"
        />
        {errors.passwordConfirm && (
          <span className="text-red-500 text-sm">
            {errors.passwordConfirm?.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full p-2 rounded text-primary bg-white"
      >
        Entrar
      </button>
    </form>
  );
}
