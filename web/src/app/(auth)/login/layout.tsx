import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Notes App",
  description: "Seu app de anotações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {children}
    </div>
  );
}
