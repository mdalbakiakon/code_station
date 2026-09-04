import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "lenis/dist/lenis.css";
import "./index.css";
import App from "./App.jsx";
import ReactLenis from "lenis/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ReactLenis root>
      <App />
    </ReactLenis>
  </BrowserRouter>,
);
