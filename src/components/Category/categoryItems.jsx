import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../cart-context"; // Adjust path as needed

// Named helper to resolve image paths for other components
export function getImageUrl(imagePath, baseUrl = "") {
  if (!imagePath) return null;
  if (typeof imagePath !== "string") return null;
  // Already an absolute URL or blob
  if (imagePath.startsWith("http") || imagePath.startsWith("blob:")) {
    return imagePath;
  }
  // Absolute path from public folder
  if (imagePath.startsWith("/")) {
    return imagePath;
  }
  // Otherwise return as-is (relative path)
  return imagePath;
}

const CategoryItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productData = location.state?.product;
  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("details");
  const [addedToCart, setAddedToCart] = useState(false);
  const [showCartMessage, setShowCartMessage] = useState(false);

  useEffect(() => {
    if (productData) {
      // Enrich product data with default values if needed
      const enrichedProduct = {
        ...productData,
        price: productData.price || 1299,
        currency: productData.currency || "$",
        description: productData.description || `Beautiful ${productData.name} crafted with precision and care. Perfect for any occasion.`,
        sizes: productData.sizes || ["6", "7", "8", "9"],
        details: productData.details || "Premium quality craftsmanship with attention to detail. Handcrafted by skilled artisans.",
        maintenance: productData.maintenance || "Store in a dry place. Clean with soft cloth. Avoid contact with chemicals and perfumes.",
        warranty: productData.warranty || "1 year warranty against manufacturing defects.",
        shipping: productData.shipping || "Free shipping on orders over $100. Delivery within 5-7 business days.",
      };
      
      setProduct(enrichedProduct);
      setActiveImg(enrichedProduct.image || enrichedProduct.images?.[0]);
      setSize(enrichedProduct.sizes?.[0] || "");
    } else {
      // Redirect back to category if no product data
      navigate("/category");
    }
  }, [productData, navigate]);

  // Check if product is already in cart
  const isInCart = product && cartItems.some(item => 
    item.id === `category-${product.id}` || item.id === product.id
  );

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: `category-${product.id}`,
        title: product.name || product.title,
        price: product.price ?? 0,
        currency: product.currency ?? "$",
        image: product.image || product.images?.[0],
        size: size || null,
        qty: qty,
        sizes: product.sizes || [],
        qtyOptions: [1, 2, 3, 4, 5]
      };
      
      addToCart(cartItem);
      setAddedToCart(true);
      setShowCartMessage(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowCartMessage(false);
      }, 3000);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* WhatsApp Button - Already responsive */}
      <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-20">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300 text-sm md:text-base"
          onClick={() => window.open("https://wa.me/94759627589", "_blank")}
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
        </button>
      </div>

      {/* Header - Already responsive */}
      <header className="px-6 md:px-12 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/category")}
            className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
          >
            <span className="text-lg leading-none group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Categories</span>
          </button>

          <div className="font-serif text-xl tracking-[0.25em] font-medium text-white/70">
            CATEGORY ITEM DETAILS
          </div>

          <div className="w-16"></div>
        </div>

        {/* Breadcrumb */}
        <div className="mt-6 text-xs text-gray-500">
          Home / Category / {product.name || product.title}
        </div>
      </header>

      {/* Main Layout */}
      <main className="px-6 md:px-12 pb-16 relative z-10">
        {/* ========== DESKTOP VIEW CODE ========== */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-10">
            {/* Left: Gallery - Desktop */}
            <section className="bg-white/5 backdrop-blur-sm rounded-md p-10 border border-white/10">
              <div className="flex gap-6">
                <div className="w-full">
                  <div className="relative aspect-square bg-white/5 rounded-md overflow-hidden border border-white/10">
                    <img
                      src={activeImg || product.image || product.images?.[0]}
                      alt={product.name || product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Right: Product Info - Desktop */}
            <section className="bg-white/5 backdrop-blur-sm rounded-md p-10 border border-white/10">
              <div className="flex items-center justify-between gap-6 flex-wrap">
                <h1 className="font-serif text-4xl text-white font-bold">
                  {product.name || product.title}
                </h1>
                <div className="text-3xl text-white font-semibold whitespace-nowrap">
                  {product.currency || "$"}{(product.price ?? 0).toFixed(2)}
                </div>
              </div>

              <p className="mt-6 text-base leading-relaxed text-gray-400 max-w-xl">
                {product.description}
              </p>

              {/* Size */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-8 flex items-center gap-4">
                  <div className="text-sm text-gray-400">Size:</div>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="bg-black border border-white/15 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                    style={{ colorScheme: 'dark' }}
                  >
                    {product.sizes.map((s) => (
                      <option key={s} value={s} className="bg-black text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-8 flex items-center gap-4">
                <div className="text-sm text-gray-400">Quantity:</div>
                <div className="flex items-center border border-white/15 rounded-md overflow-hidden">
                  <button
                    className="px-4 py-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <div className="px-4 py-2 text-sm text-white w-10 text-center">
                    {qty}
                  </div>
                  <button
                    className="px-4 py-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full rounded-md px-5 py-3 text-base transition-all duration-300 font-medium flex items-center justify-center gap-2 ${
                    isInCart 
                      ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                  disabled={isInCart}
                >
                  {isInCart ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {showCartMessage && (
                  <div className="text-green-400 text-sm text-center animate-pulse bg-green-500/10 py-2 rounded-md border border-green-500/20">
                    ✓ Added to cart successfully!
                  </div>
                )}
              </div>

              {/* Accordion tabs */}
              <div className="mt-10 border-t border-white/10">
                {[
                  { key: "details", label: "Details", value: product.details || "Premium quality craftsmanship with attention to detail." },
                  { key: "maintenance", label: "Maintenance", value: product.maintenance || "Store in a dry place. Clean with soft cloth. Avoid contact with chemicals." },
                  { key: "warranty", label: "Warranty", value: product.warranty || "1 year warranty against manufacturing defects." },
                  { key: "shipping", label: "Shipping", value: product.shipping || "Free shipping on orders over $100. Delivery within 5-7 business days." },
                ].map((t) => (
                  <div key={t.key} className="border-b border-white/10">
                    <button
                      onClick={() => setTab((cur) => (cur === t.key ? "" : t.key))}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="text-sm text-gray-400">{t.label}</span>
                      <span className="text-gray-500 text-xl">
                        {tab === t.key ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        tab === t.key ? "max-h-40 pb-4" : "max-h-0"
                      }`}
                    >
                      <p className="text-sm text-gray-500 leading-relaxed pr-6">
                        {t.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ========== MOBILE VIEW CODE ========== */}
        <div className="block lg:hidden">
          <div className="flex flex-col gap-5">
            {/* Left: Gallery - Mobile */}
            <section className="bg-white/5 backdrop-blur-sm rounded-md p-4 border border-white/10">
              <div className="w-full">
                <div className="relative aspect-square bg-white/5 rounded-md overflow-hidden border border-white/10">
                  <img
                    src={activeImg || product.image || product.images?.[0]}
                    alt={product.name || product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Right: Product Info - Mobile */}
            <section className="bg-white/5 backdrop-blur-sm rounded-md p-5 border border-white/10">
              <div className="flex flex-col gap-2">
                <h1 className="font-serif text-2xl text-white font-bold">
                  {product.name || product.title}
                </h1>
                <div className="text-2xl text-white font-semibold">
                  {product.currency || "$"}{(product.price ?? 0).toFixed(2)}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                {product.description}
              </p>

              {/* Size */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5 flex items-center gap-3">
                  <div className="text-xs text-gray-400">Size:</div>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="bg-black border border-white/15 rounded-md px-2 py-1.5 text-xs text-white outline-none focus:border-white/40"
                    style={{ colorScheme: 'dark' }}
                  >
                    {product.sizes.map((s) => (
                      <option key={s} value={s} className="bg-black text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-3">
                <div className="text-xs text-gray-400">Qty:</div>
                <div className="flex items-center border border-white/15 rounded-md overflow-hidden">
                  <button
                    className="px-3 py-1.5 text-gray-400 hover:bg-white/5 hover:text-white transition-colors text-sm"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <div className="px-3 py-1.5 text-xs text-white w-8 text-center">
                    {qty}
                  </div>
                  <button
                    className="px-3 py-1.5 text-gray-400 hover:bg-white/5 hover:text-white transition-colors text-sm"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full rounded-md px-4 py-2.5 text-sm transition-all duration-300 font-medium flex items-center justify-center gap-2 ${
                    isInCart 
                      ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                  disabled={isInCart}
                >
                  {isInCart ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {showCartMessage && (
                  <div className="text-green-400 text-xs text-center animate-pulse bg-green-500/10 py-1.5 rounded-md border border-green-500/20">
                    ✓ Added to cart!
                  </div>
                )}
              </div>

              {/* Accordion tabs - Mobile */}
              <div className="mt-6 border-t border-white/10">
                {[
                  { key: "details", label: "Details", value: product.details || "Premium quality craftsmanship with attention to detail." },
                  { key: "maintenance", label: "Maintenance", value: product.maintenance || "Store in a dry place. Clean with soft cloth. Avoid contact with chemicals." },
                  { key: "warranty", label: "Warranty", value: product.warranty || "1 year warranty against manufacturing defects." },
                  { key: "shipping", label: "Shipping", value: product.shipping || "Free shipping on orders over $100. Delivery within 5-7 business days." },
                ].map((t) => (
                  <div key={t.key} className="border-b border-white/10">
                    <button
                      onClick={() => setTab((cur) => (cur === t.key ? "" : t.key))}
                      className="w-full flex items-center justify-between py-3 text-left"
                    >
                      <span className="text-xs text-gray-400">{t.label}</span>
                      <span className="text-gray-500 text-lg">
                        {tab === t.key ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        tab === t.key ? "max-h-40 pb-3" : "max-h-0"
                      }`}
                    >
                      <p className="text-xs text-gray-500 leading-relaxed pr-4">
                        {t.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryItems;