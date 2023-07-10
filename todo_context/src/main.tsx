import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
// import { ThemeProvider } from "@emotion/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
