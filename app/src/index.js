import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import AuthContextProvider from "./context/AuthContext";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark", primaryColor: 'teal', primaryShade: 9 }}
    >
      <NotificationsProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
