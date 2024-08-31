import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CounterContextProvider } from "./context/CounterContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/wishlistContext.jsx";
let query = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={query}>
    <UserContextProvider>
      <CounterContextProvider>
        <CartContextProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartContextProvider>
      </CounterContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
