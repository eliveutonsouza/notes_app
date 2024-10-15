import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { Middleware } from "./middleware";

export default function App() {
  return (
    <BrowserRouter>
      <Middleware>
        <Router />
      </Middleware>
    </BrowserRouter>
  );
}
