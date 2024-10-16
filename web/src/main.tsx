import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { ModalContextProvider } from "./context/ModalContextProvider";
import { CookiesProvider } from "react-cookie";
import { ProfileContextProvider } from "./context/ProfileContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalContextProvider>
      <CookiesProvider>
        <ProfileContextProvider>
          <App />
        </ProfileContextProvider>
      </CookiesProvider>
    </ModalContextProvider>
  </StrictMode>,
);
