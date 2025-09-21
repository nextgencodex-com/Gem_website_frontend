import React, { useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import { CartProvider } from "../cart-context";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Layout; 