import { z } from "zod";
import LogoLight from "../assets/logo-light.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formLoginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido, tente novamente!" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres!" }),
});

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
  });

  function onSubmitForm(data: z.infer<typeof formLoginSchema>) {
    console.log(data);
  }

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-[url(../assets/background.png)] bg-no-repeat bg-cover">
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="p-12 bg-primary rounded flex flex-col gap-5 w-[28.56rem]"
      >
        <div className="space-y-5">
          <img
            className="m-auto"
            src={LogoLight}
            alt="Logotipo da Aplicação: um pequeno bloco de notas ao lado na palavra, Notes."
          />
          <h1 className="text-orange-50 text-center m-auto max-w-80">
            Insira seu e-mail abaixo para acessar sua conta.
          </h1>
        </div>

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
            <span className="text-red-500 text-sm">
              {errors.email?.message}
            </span>
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
    </main>
  );
}
