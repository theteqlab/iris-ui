import { LocaleProvider, ThemeProvider, fr } from "@irisui/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "maplibre-gl/dist/maplibre-gl.css";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("#root not found");

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider messages={fr}>
        <App />
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
);
