import { cn } from "../lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex items-center justify-center bg-black py-7 text-white",
        className,
      )}
    >
      <p>© {new Date().getFullYear()} - Todos os direitos reservados</p>
    </footer>
  );
}
