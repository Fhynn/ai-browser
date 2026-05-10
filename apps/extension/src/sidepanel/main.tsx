import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SidePanelApp } from "./SidePanelApp";
import "./sidepanel.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <SidePanelApp />
  </StrictMode>
);
