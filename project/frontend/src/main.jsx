import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
// if you’re using MUI theme, keep your imports:
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";


const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#020617",
      paper: "#020617",
    },
    primary: {
      main: "#1d4ed8",
    },
    secondary: {
      main: "#22d3ee",
    },
  },
  typography: {
    fontFamily: [
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif",
    ].join(","),
  },
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
