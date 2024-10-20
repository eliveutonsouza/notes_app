import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const formRegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long!" }),
    email: z.string().email({ message: "Invalid email, please try again!" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" }),
    passwordConfirm: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match!",
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
      await axios.post(
        `${import.meta.env.VITE_API_SERVER_BACKEND}/register`,
        dataFormValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Error creating account!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="sr-only">
          Enter your full name
        </label>
        <input
          {...register("name")}
          className="::placeholder:text-gray-400 w-full rounded px-5 py-2"
          id="name"
          type="text"
          placeholder="Your full name"
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name?.message}</span>
        )}
      </div>

      <div>
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

      <div className="block">
        <label htmlFor="passwordConfirm" className="sr-only">
          Confirm your password
        </label>
        <input
          {...register("passwordConfirm")}
          className="::placeholder:text-gray-400 w-full rounded px-5 py-2"
          id="passwordConfirm"
          type="password"
          placeholder="Confirm your password"
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
        Register
      </button>
    </form>
  );
}
