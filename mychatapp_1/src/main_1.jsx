import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App_1";
import "./index.css";
import AuthProvider from "./context/auth_1";
import LP from "./pages/LP";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        {/* <App /> */}<LP />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
