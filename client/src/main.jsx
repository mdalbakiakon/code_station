import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "lenis/dist/lenis.css";
import "./index.css";
import App from "./App.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </BrowserRouter>,
);