import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { RecordContextProvider } from "./context/financial-record-context.jsx";
// import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// if (ProcessingInstruction.env.NODE_ENV === "production") disableReactDevTools();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RecordContextProvider>
          <App />
        </RecordContextProvider>
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);
