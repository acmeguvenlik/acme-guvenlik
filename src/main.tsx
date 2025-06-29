import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import "./i18n"; // i18n yapılandırmasını import et

createRoot(document.getElementById("root")!).render(<App />);