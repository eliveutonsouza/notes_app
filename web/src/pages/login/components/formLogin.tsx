import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { ProfileContext } from "../../../context/ProfileContextProvider";

const formLoginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido, tente novamente!" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres!" }),
});

export function FormLogin() {
  const { setCookie } = useContext(ProfileContext);
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

      localStorage.setItem("authToken", response.data.auth);

      if (response.status !== 200) {
        console.log("An unexpected error occurred");
      }

      setCookie("token", response.data.auth.token, {
        path: "/",
        sameSite: "strict",
        secure: true,
      });

      navigate("/dashboard");
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
        {/* rs-only: visible only to screen readers */}
        <label htmlFor="password" className="sr-only">
          Digite seu e-mail
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

      <button
        type="submit"
        className="w-full rounded bg-white p-2 text-primary"
      >
        Entrar
      </button>
    </form>
  );
}
