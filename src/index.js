import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { BrowserRouter } from "react-router-dom";
import { StudentProvider } from "./context/student-context";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
       <StudentProvider>
       <App />
       </StudentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
