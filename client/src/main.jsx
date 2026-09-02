import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ReactLenis root>
      <App />
    </ReactLenis>
  </BrowserRouter>,
);
