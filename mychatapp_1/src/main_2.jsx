import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App_2";
import "./index.css";
import AuthProvider from "./context/auth_2";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App/>
      
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

//============
