// react imports
import React from "react";
import ReactDOM from "react-dom/client";

// component imports
import App from "./App.jsx";

// library imports
import "bootstrap/dist/css/bootstrap.min.css";

// styles import
import "../src/styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
