import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context/mui-provider";
import { AppProviders } from 'context/app-provider'

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
