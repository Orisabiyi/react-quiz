import React from "react";
import ReactDOM from "react-dom/client";
import "./components/index.css";
import App from "./components/App.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
