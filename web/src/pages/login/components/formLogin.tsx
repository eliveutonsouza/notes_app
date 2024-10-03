import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const formLoginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido, tente novamente!" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres!" }),
});

export function FormLogin() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
  });

  async function onSubmitForm(data: z.infer<typeof formLoginSchema>) {
    try {
      const response = await axios.post("http://localhost:3000/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const token = response.data.token;
      document.cookie = `token=${token}; path=/; SameSite=Strict; Secure`;

      if (response.status === 201 || response.status === 200) {
        console.log("Usuário logado com sucesso!");
        navigate("/dashboard");
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
        {/* rs-only: visible only to screen readers */}
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
        {/* rs-only: visible only to screen readers */}
        <label htmlFor="password" className="sr-only">
          Digite seu e-mail
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

      <button
        type="submit"
        className="w-full p-2 rounded text-primary bg-white"
      >
        Entrar
      </button>
    </form>
  );
}
