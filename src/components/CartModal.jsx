import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cart-context";

const ShoppingCart = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, total, totalLKR, updateItem: contextUpdateItem } = useCart();

  const [favorites, setFavorites] = useState({}); // for heart icon toggle

  const subtotal = totalLKR ?? (cartItems || []).reduce((sum, it) => sum + ((it.price || 0) * (it.quantity || it.qty || 0)), 0);

  const delivery = 0;
  const grandTotal = subtotal + delivery;

  const updateItem = (id, type, patch) => {
    if (patch.quantity != null) updateQuantity(id, type, patch.quantity);
    else if (patch.qty != null) updateQuantity(id, type, patch.qty);
    else contextUpdateItem(id, type, patch);
  };

  const removeItem = (id, type) => {
    removeFromCart(id, type);
  };

  const toggleFav = (id) => {
    setFavorites((p) => ({ ...p, [id]: !p[id] }));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* WhatsApp Button */}
      <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-20">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300 text-sm md:text-base"
          onClick={() => (window.location.href = "https://wa.me/94759627589")}
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
        </button>
      </div>

      {/* Page container */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-10 relative z-10">
        <div className="bg-[#1a1a1a] rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10">
          {/* Header */}
          <header className="px-6 md:px-12 py-8 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="w-24" />

              <div className="font-serif text-xl tracking-[0.25em] font-medium text-white/70">
                SHOPPING CART
              </div>

              <div className="flex items-center gap-6 text-gray-500">
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="hidden sm:inline text-xs">My account</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M20 21a8 8 0 1 0-16 0"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>

                <button className="hover:text-white transition-colors" aria-label="Wishlist">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M12 21s-7-4.35-9.33-8.1C.85 9.73 2.17 6.5 5.5 6.5c1.8 0 3.1 1 3.9 2 .8-1 2.1-2 3.9-2 3.33 0 4.65 3.23 2.83 6.4C19 16.65 12 21 12 21Z"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>

                <button className="hover:text-white transition-colors" aria-label="Bag">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M6 7h12l-1 14H7L6 7Z"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9 7a3 3 0 0 1 6 0"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="px-6 md:px-12 pb-12">
            {/* Back to Gifts button */}
            <button
              onClick={() => {
                if (typeof onClose === 'function') onClose();
                navigate('/gifts');
              }}
              className="text-xs text-gray-500 hover:text-white flex items-center gap-2 transition-colors group"
            >
              <span className="text-lg leading-none group-hover:-translate-x-1 transition-transform">‹</span>
              Continue Shopping
            </button>

            <h1 className="mt-4 font-serif text-3xl md:text-4xl text-white font-bold">
              Shopping Cart
            </h1>

                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* LEFT: Items */}
              <section className="lg:col-span-2">
                <div className="border-t border-white/10 mt-3" />

                {(!cartItems || cartItems.length === 0) ? (
                  <div className="text-center py-16">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <button
                      onClick={() => navigate("/gifts")}
                      className="text-white/60 hover:text-white underline underline-offset-4 transition-colors"
                    >
                      Browse Gifts →
                    </button>
                  </div>
                ) : (
                  cartItems.map((it) => (
                    <div key={`${it.id}-${it.type || 'default'}`} className="py-8 border-b border-white/10">
                      <div className="flex gap-6">
                        {/* Image (clickable to go to details) */}
                        <div
                          className="w-28 h-28 bg-white/5 rounded-md overflow-hidden cursor-pointer"
                          onClick={() => {
                            if (typeof onClose === 'function') onClose();
                            navigate(`/gifts/${it.productId || it.id}`, { state: { item: it.productData || it } });
                          }}
                        >
                          <img
                            src={it.image}
                            alt={it.name || it.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-6">
                            <div>
                              <div
                                className="text-sm font-medium text-white cursor-pointer"
                                onClick={() => {
                                  if (typeof onClose === 'function') onClose();
                                  navigate(`/gifts/${it.productId || it.id}`, { state: { item: it.productData || it } });
                                }}
                              >
                                {it.name || it.title}
                              </div>

                              <div className="mt-6 grid grid-cols-2 gap-10 max-w-md">
                                {/* Size */}
                                {it.size ? (
                                  <div>
                                    <div className="text-[11px] text-gray-500">
                                      Ring Size:
                                    </div>
                                    <select
                                      value={it.size}
                                      onChange={(e) =>
                                          updateItem(it.id, it.type, { size: e.target.value })
                                        }
                                      className="mt-2 text-sm text-gray-400 bg-transparent border border-white/10 rounded px-2 py-1 outline-none focus:border-white/30 cursor-pointer"
                                    >
                                      {it.sizes.map((s) => (
                                        <option key={s} value={s} className="bg-[#1a1a1a] text-white">
                                          {s}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                ) : (
                                  <div />
                                )}

                                {/* Qty */}
                                <div>
                                  <div className="text-[11px] text-gray-500">
                                    Qty:
                                  </div>
                                  <select
                                    value={it.quantity ?? it.qty}
                                    onChange={(e) =>
                                      updateItem(it.id, it.type, {
                                        quantity: Number(e.target.value),
                                      })
                                    }
                                    className="mt-2 text-sm text-gray-400 bg-transparent border border-white/10 rounded px-2 py-1 outline-none focus:border-white/30 cursor-pointer"
                                  >
                                    {(it.qtyOptions || [1,2,3,4,5]).map((q) => (
                                    <option key={q} value={q} className="bg-[#1a1a1a] text-white">
                                      {q}
                                    </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <button
                                onClick={() => removeItem(it.id, it.type)}
                                className="mt-6 text-xs text-gray-500 hover:text-white underline underline-offset-4 transition-colors"
                              >
                                Remove
                              </button>
                            </div>

                            {/* Right: heart + price */}
                            <div className="flex flex-col items-end gap-6">
                              <button
                                onClick={() => toggleFav(it.id)}
                                className="text-gray-500 hover:text-white transition-colors"
                                aria-label="Favorite"
                              >
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill={favorites[it.id] ? "currentColor" : "none"}
                                  stroke="currentColor"
                                >
                                  <path
                                    d="M12 21s-7-4.35-9.33-8.1C.85 9.73 2.17 6.5 5.5 6.5c1.8 0 3.1 1 3.9 2 .8-1 2.1-2 3.9-2 3.33 0 4.65 3.23 2.83 6.4C19 16.65 12 21 12 21Z"
                                    strokeWidth="1.5"
                                  />
                                </svg>
                              </button>

                              <div className="text-sm text-gray-400">
                                ${(it.price ?? 0).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </section>

              {/* RIGHT: Summary */}
              <aside className="lg:col-span-1">
                <div className="bg-white/5 rounded-md p-6 border border-white/10">
                  <h3 className="font-serif text-sm text-white font-medium">
                    Order Summary
                  </h3>

                  <div className="mt-5 space-y-3 text-sm text-gray-400">
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span>${(subtotal ?? 0).toLocaleString()}.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Free standard Delivery (3 working days)</span>
                      <span>${delivery.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-white/10 my-4" />

                    <div className="flex items-center justify-between text-white">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">
                        ${(grandTotal ?? 0).toLocaleString()}.00
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-500">
                      (Prices include VAT.)
                    </div>
                  </div>

                  <button className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white rounded-md py-3 text-sm transition border border-white/20">
                    Checkout
                  </button>

                  <p className="mt-4 text-[11px] text-gray-500 text-center">
                    Enjoy complimentary delivery and <br />
                    returns on your order.
                  </p>
                </div>

                {/* Need help */}
                <div className="mt-8">
                  <h4 className="font-serif text-sm text-white font-medium">Need Help?</h4>
                  <div className="border-t border-white/10 mt-3" />

                  <div className="mt-4 space-y-2 text-sm text-gray-400">
                    <button className="hover:text-white block transition-colors">
                      Delivery & Returns
                    </button>
                    <button className="hover:text-white block transition-colors">
                      Gemstone Care
                    </button>
                    <button className="hover:text-white block transition-colors">
                      Privacy Policy
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;