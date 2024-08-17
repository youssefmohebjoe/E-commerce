import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CounterContextProvider } from "./context/CounterContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <CounterContextProvider>
      <App />
    </CounterContextProvider>
  </UserContextProvider>
);
