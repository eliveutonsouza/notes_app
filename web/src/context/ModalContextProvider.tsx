import { useState, createContext, ReactNode } from "react";

interface ModalContextType {
  isOpen: (id: string) => boolean;
  open: (id: string) => void;
  close: (id: string) => void;
}

const defaultValue: ModalContextType = {
  isOpen: () => false,
  open: () => {},
  close: () => {},
};

export const ModalContext = createContext<ModalContextType>(defaultValue);

interface ModalContextProps {
  children: ReactNode;
}

export const ModalContextProvider = ({ children }: ModalContextProps) => {
  const [modals, setModals] = useState<{ [key: string]: boolean }>({});

  const isOpen = (id: string) => !!modals[id];
  const open = (id: string) => setModals((prev) => ({ ...prev, [id]: true }));
  const close = (id: string) => setModals((prev) => ({ ...prev, [id]: false }));

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};
