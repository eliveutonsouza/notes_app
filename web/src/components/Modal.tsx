import { useContext } from "react";
import { ModalContext } from "../context/ModalContextProvider";

interface ModalProps {
  id: string;
  children: React.ReactNode;
}

export function Modal({ id, children }: ModalProps) {
  const { isOpen } = useContext(ModalContext);

  return (
    <div
      className={`${
        !isOpen(id) && "sr-only"
      } absolute h-full w-full bg-black bg-opacity-70 flex items-center justify-center`}
    >
      <div className="w-[40rem] bg-white py-16 px-24 border-t-8 border-lime-300 rounded">
        {children}
      </div>
    </div>
  );
}
