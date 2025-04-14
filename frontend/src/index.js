import React, { useState, useMemo, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ToggleButtons from "./components/ToggleButtons.jsx";

// Helpers to get/set from localStorage
const getStoredBool = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  return stored === null ? defaultValue : stored === "true";
};

const IndexWrapper = () => {
  // Load from localStorage on first render
  const [isDarkMode, setIsDarkMode] = useState(() => getStoredBool("darkMode", false));
  const [isLoggingEnabled, setIsLoggingEnabled] = useState(() => getStoredBool("logging", false));

  // Save to localStorage when toggles change
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("logging", isLoggingEnabled);
  }, [isLoggingEnabled]);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: isDarkMode ? "dark" : "light",
        primary: {
          main: "#1976d2",
        },
        secondary: {
          main: "#dc004e",
        },
        text: {
          primary: isDarkMode ? "#FFA500" : "#FF8C00", // soft orange for dark, hard orange for light
        },
      },
      typography: {
        h4: {
          fontWeight: 600,
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
              borderRadius: 8,
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
              },
            },
          },
        },
      },
      // Global styles to change text color
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "body": {
            color: isDarkMode ? "#FFA500" : "#FF8C00", // Set global text color
          },
        },
      },
    },
    }), [isDarkMode]
  );

  const log = (message) => {
    if (isLoggingEnabled) {
      console.log("[LOG]:", message);
    }
  };

  log("App is rendering");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToggleButtons
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isLoggingEnabled={isLoggingEnabled}
        setIsLoggingEnabled={setIsLoggingEnabled}
      />
      <App log={log} />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IndexWrapper />
  </React.StrictMode>
);

reportWebVitals();
