import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cart-context"; // Adjust path as needed

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartQty, removeFromCart, toggleFav, favorites } = useCart();

  const [whatsappMessage, setWhatsappMessage] = useState("");

  // Calculate totals
  const subtotal = useMemo(
    () => cartItems.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 0), 0),
    [cartItems]
  );

  const delivery = 0; // Free delivery
  const total = subtotal + delivery;

  // Generate WhatsApp message when cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      let message = "*New Order Request*\n\n";
      message += "*Items:*\n";
      
      cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.title}`;
        if (item.size) message += ` (Size: ${item.size})`;
        message += ` - Qty: ${item.qty}\n`;
      });
      
      message += `\n*Order Summary:*\n`;
      message += `Subtotal: $${subtotal.toFixed(2)}\n`;
      message += `Delivery: Free\n`;
      message += `*Total: $${total.toFixed(2)}*\n\n`;
      message += `Please provide payment and shipping details.`;
      
      setWhatsappMessage(encodeURIComponent(message));
    }
  }, [cartItems, subtotal, total]);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length > 0) {
      window.open(`https://wa.me/94759627589?text=${whatsappMessage}`, '_blank');
    }
  };

  const handleContinueShopping = () => {
    navigate("/gifts");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  const handleAccountClick = () => {
    navigate("/account");
  };

  const handleCartClick = () => {
    // Already on cart page, could scroll to top or just refresh
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currencySymbol = cartItems.length > 0 ? cartItems[0].currency || "$" : "$";

  return (
    <div className="min-h-screen bg-black">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* WhatsApp Button - Floating */}
      <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-20">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-full flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base"
          onClick={() => window.open("https://wa.me/94759627589", "_blank")}
        >
          <span>WhatsApp</span>
        </button>
      </div>

      {/* Page container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          {/* Header - This is already responsive, keep as is */}
          <header className="px-6 md:px-10 py-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <button
                onClick={handleContinueShopping}
                className="text-gray-400 hover:text-white text-sm transition-all duration-300 flex items-center gap-2 group"
              >
                <span className="text-lg leading-none group-hover:-translate-x-1 transition-transform">←</span>
                <span className="relative">
                  Continue Shopping
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/30 group-hover:w-full transition-all duration-300"></span>
                </span>
              </button>

              <div className="font-serif text-xl tracking-[0.2em] font-medium text-white/80">
                SHOPPING CART
              </div>

              <div className="flex items-center gap-5">
                {/* Cart Button - Simple Text */}
                <button 
                  onClick={handleCartClick}
                  className="text-white text-sm transition-all duration-300 relative group"
                >
                  Cart ({cartItems.length})
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/30"></span>
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="px-6 md:px-10 py-8">
            <h1 className="font-serif text-3xl md:text-4xl text-white font-bold mb-2">
              Your Shopping Cart
            </h1>
            <p className="text-gray-400 text-sm mb-8">
              {cartItems.length === 0 
                ? "Your cart is empty" 
                : `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`}
            </p>

            {/* ========== DESKTOP VIEW CODE ========== */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-10">
                {/* LEFT: Items - Desktop */}
                <section className="col-span-2">
                  {cartItems.length === 0 ? (
                    <div className="bg-white/5 rounded-xl p-12 text-center border border-white/10">
                      <div className="w-24 h-24 mx-auto mb-6 opacity-50 border-2 border-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-4xl text-gray-500">🛒</span>
                      </div>
                      <p className="text-gray-300 text-lg mb-4">Your shopping cart is empty</p>
                      <p className="text-gray-500 text-sm mb-6">Discover our beautiful collection of gifts and jewellery</p>
                      <button
                        onClick={handleContinueShopping}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full transition-all duration-300 border border-white/20 hover:scale-105"
                      >
                        <span>Continue Shopping</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cartItems.map((it) => (
                        <div key={it.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl">
                          <div className="flex flex-col sm:flex-row gap-6">
                            {/* Image */}
                            <div 
                              className="w-full sm:w-28 h-28 bg-black/40 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                              onClick={() => navigate(`/GiftDetails`, { state: { product: it } })}
                            >
                              <img
                                src={it.image}
                                alt={it.title}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h3 
                                    className="font-serif text-lg text-white font-medium mb-2 hover:text-white/80 transition-colors cursor-pointer"
                                    onClick={() => navigate(`/GiftDetails`, { state: { product: it } })}
                                  >
                                    {it.title}
                                  </h3>

                                  <div className="flex flex-wrap items-center gap-6">
                                    {/* Size */}
                                    {it.size && (
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">Size:</span>
                                        <select
                                          value={it.size}
                                          onChange={(e) => updateCartQty(it.id, { size: e.target.value })}
                                          className="text-sm text-gray-300 bg-black/40 border border-white/10 rounded px-2 py-1 outline-none focus:border-white/30 cursor-pointer transition-all hover:bg-black/60"
                                        >
                                          {it.sizes?.map((s) => (
                                            <option key={s} value={s} className="bg-[#1a1a1a] text-white">
                                              {s}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    )}

                                    {/* Qty */}
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-gray-500">Qty:</span>
                                      <select
                                        value={it.qty}
                                        onChange={(e) => updateCartQty(it.id, parseInt(e.target.value))}
                                        className="text-sm text-gray-300 bg-black/40 border border-white/10 rounded px-2 py-1 outline-none focus:border-white/30 cursor-pointer transition-all hover:bg-black/60"
                                      >
                                        {it.qtyOptions?.map((q) => (
                                          <option key={q} value={q} className="bg-[#1a1a1a] text-white">
                                            {q}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    {/* Price */}
                                    <div className="text-sm text-white font-medium">
                                      ${(it.price || 0).toLocaleString()}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4 mt-4">
                                    <button
                                      onClick={() => removeFromCart(it.id)}
                                      className="text-xs text-gray-500 hover:text-white underline underline-offset-4 transition-all duration-300 hover:underline-offset-8"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* RIGHT: Summary - Desktop */}
                <aside className="col-span-1">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 sticky top-6">
                    <h3 className="font-serif text-lg text-white font-medium mb-6">
                      Order Summary
                    </h3>

                    {cartItems.length > 0 ? (
                      <>
                        <div className="space-y-3 text-sm mb-6">
                          <div className="flex items-center justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span className="text-white font-medium">{currencySymbol}{subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-400">
                            <span>Delivery</span>
                            <span className="text-green-400 font-medium">Free</span>
                          </div>

                          <div className="border-t border-white/10 my-4" />

                          <div className="flex items-center justify-between text-base">
                            <span className="text-white font-medium">Total</span>
                            <span className="text-white font-bold text-xl">
                              {currencySymbol}{total.toFixed(2)}
                            </span>
                          </div>

                          <p className="text-[11px] text-gray-500 text-right">
                            (Including VAT)
                          </p>
                        </div>

                        {/* Request via WhatsApp Button */}
                        <button 
                          onClick={handleWhatsAppCheckout}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-full py-3 text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mb-4"
                        >
                          Request via WhatsApp
                        </button>

                        <p className="text-xs text-gray-500 text-center leading-relaxed">
                          Free delivery on all orders • 30-day returns
                        </p>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500 text-sm">Add items to see order summary</p>
                      </div>
                    )}
                  </div>

                  {/* Continue shopping link - Desktop */}
                  <button
                    onClick={handleContinueShopping}
                    className="mt-6 text-sm text-gray-500 hover:text-white flex items-center justify-center gap-2 transition-all duration-300 w-full group"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span className="relative">
                      Continue Shopping
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/30 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </button>
                </aside>
              </div>
            </div>

            {/* ========== MOBILE VIEW CODE ========== */}
            <div className="block lg:hidden">
              <div className="flex flex-col gap-8">
                {/* LEFT: Items - Mobile (First on mobile) */}
                <section>
                  {cartItems.length === 0 ? (
                    <div className="bg-white/5 rounded-xl p-8 text-center border border-white/10">
                      <div className="w-20 h-20 mx-auto mb-4 opacity-50 border-2 border-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-3xl text-gray-500">🛒</span>
                      </div>
                      <p className="text-gray-300 text-base mb-2">Your shopping cart is empty</p>
                      <p className="text-gray-500 text-xs mb-4">Discover our beautiful collection</p>
                      <button
                        onClick={handleContinueShopping}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300 border border-white/20 text-sm"
                      >
                        <span>Continue Shopping</span>
                        <span>→</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((it) => (
                        <div key={it.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="flex flex-col gap-4">
                            {/* Image and basic info row */}
                            <div className="flex gap-4">
                              {/* Image */}
                              <div 
                                className="w-20 h-20 bg-black/40 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                                onClick={() => navigate(`/GiftDetails`, { state: { product: it } })}
                              >
                                <img
                                  src={it.image}
                                  alt={it.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Title and price */}
                              <div className="flex-1">
                                <h3 
                                  className="font-serif text-base text-white font-medium mb-1 line-clamp-2"
                                  onClick={() => navigate(`/GiftDetails`, { state: { product: it } })}
                                >
                                  {it.title}
                                </h3>
                                <div className="text-sm text-white font-medium">
                                  ${(it.price || 0).toLocaleString()}
                                </div>
                              </div>
                            </div>

                            {/* Options row */}
                            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-white/10">
                              {/* Size */}
                              {it.size && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">Size:</span>
                                  <select
                                    value={it.size}
                                    onChange={(e) => updateCartQty(it.id, { size: e.target.value })}
                                    className="text-xs text-gray-300 bg-black/40 border border-white/10 rounded px-2 py-1 outline-none"
                                  >
                                    {it.sizes?.map((s) => (
                                      <option key={s} value={s} className="bg-[#1a1a1a] text-white">
                                        {s}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}

                              {/* Qty */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">Qty:</span>
                                <select
                                  value={it.qty}
                                  onChange={(e) => updateCartQty(it.id, parseInt(e.target.value))}
                                  className="text-xs text-gray-300 bg-black/40 border border-white/10 rounded px-2 py-1 outline-none"
                                >
                                  {it.qtyOptions?.map((q) => (
                                    <option key={q} value={q} className="bg-[#1a1a1a] text-white">
                                      {q}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Remove button */}
                              <button
                                onClick={() => removeFromCart(it.id)}
                                className="text-xs text-gray-500 hover:text-white ml-auto"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* RIGHT: Summary - Mobile (Below items on mobile) */}
                <aside>
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h3 className="font-serif text-base text-white font-medium mb-4">
                      Order Summary
                    </h3>

                    {cartItems.length > 0 ? (
                      <>
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span className="text-white font-medium">{currencySymbol}{subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-400">
                            <span>Delivery</span>
                            <span className="text-green-400 font-medium">Free</span>
                          </div>

                          <div className="border-t border-white/10 my-3" />

                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium">Total</span>
                            <span className="text-white font-bold text-lg">
                              {currencySymbol}{total.toFixed(2)}
                            </span>
                          </div>

                          <p className="text-[10px] text-gray-500 text-right">
                            (Including VAT)
                          </p>
                        </div>

                        {/* Request via WhatsApp Button - Mobile */}
                        <button 
                          onClick={handleWhatsAppCheckout}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-full py-2.5 text-sm transition-all duration-300 mb-3"
                        >
                          Request via WhatsApp
                        </button>

                        <p className="text-[10px] text-gray-500 text-center">
                          Free delivery • 30-day returns
                        </p>
                      </>
                    ) : (
                      <div className="text-center py-2">
                        <p className="text-gray-500 text-xs">Add items to see order summary</p>
                      </div>
                    )}
                  </div>

                  {/* Continue shopping link - Mobile */}
                  <button
                    onClick={handleContinueShopping}
                    className="mt-4 text-sm text-gray-500 hover:text-white flex items-center justify-center gap-2 transition-all duration-300 w-full group"
                  >
                    <span>←</span>
                    <span className="relative">
                      Continue Shopping
                    </span>
                  </button>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;