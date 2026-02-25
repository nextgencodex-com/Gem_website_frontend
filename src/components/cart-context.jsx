import React, { createContext, useContext, useState } from "react";

// Exchange rates (relative to LKR as base)
const exchangeRates = {
  LKR: 1,
  USD: 0.0031,
  AED: 0.011,
  AUR: 0.0012,
  YEN: 0.49,
  RMD: 0.022,
};

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("LKR");

  // Currency conversion function
  const convertCurrency = (priceLKR, toCurrency) => {
    if (!exchangeRates[toCurrency]) return priceLKR;
    return priceLKR * exchangeRates[toCurrency];
  };

  // item: { id, name, image, price, quantity, type }
  const addToCart = (item) => {
    // Ensure price is a number
    const normalizedItem = {
      ...item,
      price: typeof item.price === "string" ? parseFloat(item.price) : item.price
    };
    
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.type === item.type);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.type === item.type
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...normalizedItem, quantity: normalizedItem.quantity || 1 }];
    });
  };

  const removeFromCart = (id, type) => {
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.type === type)));
  };

  const updateQuantity = (id, type, quantity) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && i.type === type ? { ...i, quantity } : i
      )
    );
  };

  const updateItem = (id, type, patch) => {
    setCartItems((prev) => prev.map((i) => (i.id === id && i.type === type ? { ...i, ...patch } : i)));
  };

  const clearCart = () => setCartItems([]);

  // Calculate total in LKR (base currency)
  const totalLKR = cartItems.reduce(
    (sum, i) => {
      const price = typeof i.price === "string" ? parseFloat(i.price) : i.price;
      const itemTotal = typeof price === "number" && !isNaN(price) ? price * i.quantity : 0;
      return sum + itemTotal;
    },
    0
  );

  // Calculate total in selected currency
  const total = convertCurrency(totalLKR, selectedCurrency);

  // Get all currency totals
  const getAllCurrencyTotals = () => {
    const totals = {};
    Object.keys(exchangeRates).forEach(currency => {
      totals[currency] = convertCurrency(totalLKR, currency);
    });
    return totals;
  };

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        total,
        totalLKR,
        selectedCurrency,
        setSelectedCurrency,
        convertCurrency,
            getAllCurrencyTotals,
            updateItem,
        exchangeRates
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
} 