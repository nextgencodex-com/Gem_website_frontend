import React, { createContext, useContext, useState, useEffect } from "react";

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
  // initialize from localStorage to persist across refreshes
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cartItems");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    try {
      const raw = localStorage.getItem("selectedCurrency");
      return raw || "LKR";
    } catch (e) {
      return "LKR";
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  // Currency conversion function
  const convertCurrency = (priceLKR, toCurrency) => {
    if (!exchangeRates[toCurrency]) return priceLKR;
    return priceLKR * exchangeRates[toCurrency];
  };

  // item: accept various shapes: { id, title/name, image, price, quantity or qty, sizes, qtyOptions, type }
  const addToCart = (item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price) : item.price || 0;
    const qty = item.quantity ?? item.qty ?? 1;
    const type = item.type ?? "generic";
    const normalizedItem = {
      ...item,
      price,
      qty,
      type,
    };

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === normalizedItem.id && i.type === normalizedItem.type);
      if (existing) {
        return prev.map((i) =>
          i.id === normalizedItem.id && i.type === normalizedItem.type
            ? { ...i, qty: i.qty + normalizedItem.qty }
            : i
        );
      }
      return [...prev, normalizedItem];
    });
  };

  const removeFromCart = (id, type) => {
    if (type === undefined) {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCartItems((prev) => prev.filter((i) => !(i.id === id && i.type === type)));
    }
  };

  const updateQuantity = (id, type, quantity) => {
    // backward-compatible: if type omitted, update by id only
    setCartItems((prev) =>
      prev.map((i) =>
        (i.id === id && (type === undefined || i.type === type)) ? { ...i, qty: quantity } : i
      )
    );
  };

  // flexible updater used by UI: updateCartQty(id, number) or updateCartQty(id, { size })
  const updateCartQty = (id, arg) => {
    if (typeof arg === 'object') {
      setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...arg } : i)));
    } else {
      const quantity = Number(arg) || 0;
      setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: quantity } : i)));
    }
  };

  const updateItem = (id, type, patch) => {
    setCartItems((prev) => prev.map((i) => (i.id === id && i.type === type ? { ...i, ...patch } : i)));
  };

  const clearCart = () => setCartItems([]);

  // Calculate total in LKR (base currency)
  const totalLKR = cartItems.reduce(
    (sum, i) => {
      const price = typeof i.price === "string" ? parseFloat(i.price) : i.price || 0;
      const qty = i.quantity ?? i.qty ?? 0;
      const itemTotal = typeof price === "number" && !isNaN(price) ? price * qty : 0;
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

  // Persist cart/favorites/currency to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem("selectedCurrency", selectedCurrency);
    } catch (e) {}
  }, [selectedCurrency]);

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart,
        updateQuantity,
        updateCartQty,
        updateItem,
        clearCart,
        total,
        totalLKR,
        selectedCurrency,
        setSelectedCurrency,
        convertCurrency,
        getAllCurrencyTotals,
        favorites,
        toggleFav: (id) => setFavorites((f) => ({ ...f, [id]: !f[id] })),
        exchangeRates
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// (persistence handled inside CartProvider)

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
} 