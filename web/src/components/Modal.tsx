import { useContext, useEffect, useRef } from "react";
import { ModalContext } from "../context/ModalContextProvider";
import { X } from "@phosphor-icons/react";

interface ModalProps {
  id: string;
  children: React.ReactNode;
}

export function Modal({ id, children }: ModalProps) {
  const { isOpen, close } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen(id)) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        modalRef.current.style.display = "flex";
      }
    } else {
      document.body.style.overflow = "auto";
      if (modalRef.current) {
        modalRef.current.style.display = "none";
      }
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, id]);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      style={{ display: isOpen(id) ? "flex" : "none" }}
      onClick={() => close(id)} // Fechar modal ao clicar fora do conteúdo
    >
      <div
        className="relative w-[40rem] rounded border-t-8 border-lime-300 bg-white px-24 py-16"
        onClick={(e) => e.stopPropagation()} // Impedir propagação do clique no conteúdo
      >
        <button onClick={() => close(id)} className="absolute right-4 top-4">
          <span className="sr-only">Fechar modal</span>
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}
