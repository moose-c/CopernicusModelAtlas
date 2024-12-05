import React from "react";
import { createRoot } from "react-dom/client"; // Using React 18's createRoot for concurrent rendering
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import "./styles/index.css";

// Find the root element in your HTML
const container = document.getElementById("root");

// Create a root using React 18's createRoot API
const root = createRoot(container);

// Render the application inside the root element
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
