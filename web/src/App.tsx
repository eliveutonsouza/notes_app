import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { Middleware } from "./middleware";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <Middleware>
        <ToastContainer />
        <Router />
      </Middleware>
    </BrowserRouter>
  );
}
