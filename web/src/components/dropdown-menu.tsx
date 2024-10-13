import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { cn } from "../lib/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

type DropdownMenuContextType = {
  isOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
  toggleDropdown: () => void;
};

const DropdownMenuContext = createContext<DropdownMenuContextType>({
  isOpen: false,
  openDropdown: () => {},
  closeDropdown: () => {},
  toggleDropdown: () => {},
});

// Componente principal DropdownMenu
export function DropdownMenu({ children, className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openDropdown = useCallback(() => setIsOpen(true), []);
  const closeDropdown = useCallback(() => setIsOpen(false), []);
  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  const contextValue = useMemo(
    () => ({
      isOpen,
      openDropdown,
      closeDropdown,
      toggleDropdown,
    }),
    [isOpen, openDropdown, closeDropdown, toggleDropdown],
  );

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div className={cn("relative", className)}>{children}</div>
    </DropdownMenuContext.Provider>
  );
}

// Componente DropdownMenuTrigger
interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenuTrigger({
  children,
  className,
}: DropdownMenuTriggerProps) {
  const { toggleDropdown } = useContext(DropdownMenuContext);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={triggerRef}
      onClick={toggleDropdown}
      className={cn("rounded", className)}
    >
      {children}
    </button>
  );
}
// Componente DropdownMenuContent
interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}
export function DropdownMenuContent({
  children,
  className,
}: DropdownMenuContentProps) {
  const { isOpen, closeDropdown } = useContext(DropdownMenuContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeDropdown]);

  return isOpen ? (
    <div
      ref={contentRef}
      className={cn(
        "absolute right-0 z-10 mt-2 w-52 rounded-md border bg-white shadow-lg",
        className,
      )}
    >
      <div className="p-1">{children}</div>
    </div>
  ) : null;
}

// Componente DropdownMenuItem
interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function DropdownMenuItem({
  children,
  onClick,
  className,
}: DropdownMenuItemProps) {
  const { closeDropdown } = useContext(DropdownMenuContext);
  return (
    <button
      onClick={() => {
        onClick?.();
        closeDropdown();
      }}
      className={cn("block w-full p-2 text-left hover:bg-gray-200", className)}
    >
      {children}
    </button>
  );
}
