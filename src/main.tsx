import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { PrologueProvider } from "./context/PrologueContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PrologueProvider>
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  </PrologueProvider>
);
