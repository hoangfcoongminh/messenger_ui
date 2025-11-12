// Fix lỗi "global is not defined" cho @stomp/stompjs trong trình duyệt
if (typeof global === "undefined") {
  window.global = window;
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
