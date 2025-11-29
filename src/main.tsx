import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

// Register service worker for PWA
registerSW({
  immediate: true,
  onRegistered(registration) {
    console.log("PWA Service Worker registered:", registration);
  },
  onRegisterError(error) {
    console.error("PWA Service Worker registration error:", error);
  },
});

createRoot(document.getElementById("root")!).render(<App />);
