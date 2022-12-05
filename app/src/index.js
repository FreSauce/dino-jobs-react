import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark", primaryColor: 'teal', primaryShade: 9 }}
    >
      <NotificationsProvider>
        {/* <AuthContextProvider> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* </AuthContextProvider> */}
      </NotificationsProvider>
    </MantineProvider>
  </Provider>
  // {/* </React.StrictMode> */}
);
