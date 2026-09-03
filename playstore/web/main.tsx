import { createRoot } from "react-dom/client";
import { GameApp } from "@/components/little-no/game-app";
import "./app.css";

const root = document.getElementById("root");
if (!root) throw new Error("missing #root");
createRoot(root).render(<GameApp />);
