import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useState } from "react";
import { ProfileContext } from "../../../context/ProfileContextProvider";
import { Spinner } from "@phosphor-icons/react";

const formLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email, please try again!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
});

export function FormLogin() {
  const { setCookie } = useContext(ProfileContext);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
  });

  async function onSubmitForm(data: z.infer<typeof formLoginSchema>) {
    try {
      setLoading(true); // Start loading

      const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER_BACKEND}/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        setCookie("token", response.data.auth.token, {
          path: "/",
          sameSite: "strict",
          secure: true,
        });
      } else {
        console.log("An unexpected error occurred");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log("An unexpected error occurred");
      }
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-5">
      <div>
        {/* sr-only: visible only to screen readers */}
        <label htmlFor="email" className="sr-only">
          Enter your email
        </label>

        <input
          {...register("email")}
          className="::placeholder:text-gray-400 w-full rounded px-5 py-2"
          id="email"
          type="text"
          placeholder="Your email"
        />

        {errors.email && (
          <span className="text-sm text-red-500">{errors.email?.message}</span>
        )}
      </div>

      <div className="block">
        {/* sr-only: visible only to screen readers */}
        <label htmlFor="password" className="sr-only">
          Enter your password
        </label>

        <input
          {...register("password")}
          className="::placeholder:text-gray-400 w-full rounded px-5 py-2"
          id="password"
          type="password"
          placeholder="Your password"
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password?.message}
          </span>
        )}
      </div>

      {loading ? (
        <button
          className="flex w-full items-center justify-center rounded bg-white p-2 text-primary"
          disabled
        >
          <Spinner className="animate-spin" size={24} />
        </button>
      ) : (
        <button
          type="submit"
          className="w-full rounded bg-white p-2 text-primary"
        >
          Login
        </button>
      )}
    </form>
  );
}
