import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import { ThemeProvider } from "@emotion/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
    <App />
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
