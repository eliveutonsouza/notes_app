import { useContext, useEffect, useRef } from "react";
import { ModalContext } from "../context/ModalContextProvider";

interface ModalProps {
  id: string;
  children: React.ReactNode;
}

export function Modal({ id, children }: ModalProps) {
  const { isOpen } = useContext(ModalContext);
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
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
      style={{ display: isOpen(id) ? "flex" : "none" }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[40rem] bg-white py-16 px-24 border-t-8 border-lime-300 rounded">
          {children}
        </div>
      </div>
    </div>
  );
}
