import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SearchContextProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CarContextProvider } from "./context/CarContext";
import { BookingContextProvider } from "./context/BookingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CarContextProvider>
        <SearchContextProvider>
          <BookingContextProvider>
            <App />
          </BookingContextProvider>
        </SearchContextProvider>
      </CarContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
