import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";

import App from "./App";
import { ModalContextProvider } from "./context/ModalContextProvider";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalContextProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ModalContextProvider>
  </StrictMode>
);
