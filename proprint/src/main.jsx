import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./context/Loaders/ToastContext.jsx";
import WaitingLoader from "./context/Loaders/WaitingLoader.jsx";
import SpinnerLoader from "./context/Loaders/SpinnerLoader.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <App />
      <WaitingLoader/>
      <SpinnerLoader/>
    </ToastProvider>
  </StrictMode>
);
