import React, { createContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { userManager } from "./util/authConfig";
import { App } from "./App";
import "./styles/index.css";

// Create AuthContext
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userManager.getUser().then((loggedInUser) => {
      setUser(loggedInUser);
      setLoading(false);
    });
  }, []);

  const login = () => userManager.signinRedirect();
  const logout = () => userManager.signoutRedirect();

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Find the root element in your HTML
const container = document.getElementById("root");
const root = createRoot(container);

// Render the application inside the root element
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
