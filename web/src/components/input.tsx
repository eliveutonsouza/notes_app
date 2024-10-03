import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="placeholder:text-black outline-0 font-medium"
    />
  );
}
