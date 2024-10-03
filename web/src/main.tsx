import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";

import App from "./App";
import { ModalContextProvider } from "./context/ModalContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </StrictMode>
);
