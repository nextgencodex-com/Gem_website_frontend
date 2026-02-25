import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import gifts from "../../data/giftsData";
import { useCart } from "../cart-context";

const GiftsDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Select product: prefer navigation state, then id from params, otherwise fallback demo
  const rawProduct = useMemo(() => {
    if (location?.state?.item) {
      const stateItem = location.state.item || {};
      const found = gifts.find((g) => Number(g.id) === Number(stateItem.id));
      if (found) return { ...found, ...stateItem };
      return stateItem;
    }

    const id = params.id ? Number(params.id) : null;
    if (id) {
      const found = gifts.find((g) => Number(g.id) === Number(id));
      if (found) return found;
    }

    return {
      id: 101,
      name: "Austin Golden Ring",
      price: 1599,
      currency: "$",
      description:
        "Its smooth, twisted appearance makes our ring jewelry easy to match any outfit. From the largest to the smallest, each ring is handcrafted with a lot of love.",
      images: [
        "/images/ring-main.jpg",
        "/images/ring-2.jpg",
        "/images/ring-3.jpg",
      ],
      sizes: ["48", "50", "52", "54", "56"],
      details:
        "Handcrafted jewelry. Premium finish. Designed to be worn daily and to last for years with proper care.",
      maintenance:
        "Avoid chemicals and perfume contact. Store in a dry pouch. Clean gently with a soft cloth.",
      warranty:
        "Warranty covers manufacturing defects. Normal wear & tear is not covered.",
      shipping:
        "Free standard delivery for orders over $100. Delivery time: 3–5 working days.",
    };
  }, [location, params.id]);

  const product = useMemo(() => {
    const p = rawProduct || {};
    const name = p.name || p.title || "Product";
    const price = (p.price !== undefined && p.price !== null) ? p.price : 0;
    const currency = p.currency || "$";
    const imagesArr = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : ["/images/hero.jpg"]);
    const sizes = p.sizes || [];
    const description = p.description || p.details || "";
    return {
      ...p,
      name,
      price,
      currency,
      images: imagesArr,
      sizes,
      description,
      details: p.details || "",
      maintenance: p.maintenance || "",
      warranty: p.warranty || "",
      shipping: p.shipping || "",
    };
  }, [rawProduct]);

  const isListView = !location?.state?.item && !params.id;

  // Prepare rows for grid when list view
  const firstRowGiftItems = gifts.slice(0, 4);
  const secondRowGiftItems = gifts.slice(4, 8);
  const thirdRowGiftItems = gifts.slice(8, 12);

  const images = (product && product.images && product.images.length) ? product.images : ["/images/hero.jpg"];

  // UI state
  const [activeImg, setActiveImg] = useState(images[0] || "/images/hero.jpg");
  const [size, setSize] = useState(product.sizes?.[0] || "");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("details");
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, addToCart: contextAddToCart, removeFromCart: contextRemoveFromCart, updateQuantity } = useCart();

  const subtotal = (cartItems || []).reduce((sum, it) => sum + ((it.price || 0) * (it.quantity || it.qty || 0)), 0);

  useEffect(() => {
    setActiveImg(images[0] || "/images/hero.jpg");
    setSize(product.sizes?.[0] || "");
  }, [images, product]);

  const updateCartQty = (id, nextQty) => updateQuantity(id, 'gift', Math.max(1, nextQty));
  const removeFromCart = (id) => contextRemoveFromCart(id, 'gift');

  const addToCart = () => {
    const id = `p-${product.id}-${size}`;
    contextAddToCart({
      id,
      title: product.name,
      image: activeImg,
      price: product.price,
      qty,
      size,
      type: 'gift',
      productId: product.id,
      productData: product,
    });
    setCartOpen(true);
  };

  if (isListView) {
    return (
      <div className="min-h-screen bg-black">
        <div className="fixed inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />

        <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-20">
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-full" onClick={() => (window.location.href = "https://wa.me/94759627589")}>WhatsApp</button>
        </div>

        <section className="py-12 md:py-20 bg-black border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-4 relative inline-block">Gifts That Speak from the Heart</h2>
              <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mt-8">Make every moment special with thoughtful gifts that express love, appreciation, and joy.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
              {firstRowGiftItems.map((item) => (
                <div key={item.id} className="group cursor-pointer text-center" onClick={() => navigate(`/gifts/${item.id}`, { state: { item } })}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg mb-6">
                    <img src={item.images?.[0]} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-white font-bold mb-2">{item.name}</h3>
                  <div className="text-gray-400 text-sm mb-4">{item.currency}{(item.price ?? 0).toLocaleString()}</div>
                  <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/gifts/${item.id}`, { state: { item } }); }} className="text-white/60 hover:text-white">View Details →</button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
              {secondRowGiftItems.map((item) => (
                <div key={item.id} className="group cursor-pointer text-center" onClick={() => navigate(`/gifts/${item.id}`, { state: { item } })}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg mb-6">
                    <img src={item.images?.[0]} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-white font-bold mb-2">{item.name}</h3>
                  <div className="text-gray-400 text-sm mb-4">{item.currency}{(item.price ?? 0).toLocaleString()}</div>
                  <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/gifts/${item.id}`, { state: { item } }); }} className="text-white/60 hover:text-white">View Details →</button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pt-4">
              {thirdRowGiftItems.map((item) => (
                <div key={item.id} className="group cursor-pointer text-center" onClick={() => navigate(`/gifts/${item.id}`, { state: { item } })}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg mb-6">
                    <img src={item.images?.[0]} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-white font-bold mb-2">{item.name}</h3>
                  <div className="text-gray-400 text-sm mb-4">{item.currency}{(item.price ?? 0).toLocaleString()}</div>
                  <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/gifts/${item.id}`, { state: { item } }); }} className="text-white/60 hover:text-white">View Details →</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Detailed product view
  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />

      <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-20">
        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-full" onClick={() => (window.location.href = "https://wa.me/94759627589")}>WhatsApp</button>
      </div>

      <header className="px-6 md:px-12 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white text-sm">← Back</button>
          <div className="font-serif text-xl tracking-[0.25em] font-medium text-white/70">Gifts Details</div>
          <button onClick={() => setCartOpen(true)} className="text-gray-400 hover:text-white text-sm relative">Cart{cartItems.length > 0 && (<span className="absolute -top-2 -right-3 bg-white text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">{cartItems.length}</span>)}</button>
        </div>
        <div className="mt-6 text-xs text-gray-500">Home / Gifts / {product.name}</div>
      </header>

      <main className="px-6 md:px-12 pb-16 relative z-10">
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <section className="bg-white/5 backdrop-blur-sm rounded-md p-6 md:p-10 border border-white/10">
              <div className="flex gap-6">
                <div className="hidden sm:flex flex-col gap-4">
                  {images.map((img) => (
                    <button key={img} onClick={() => setActiveImg(img)} className={`w-12 h-12 rounded-md overflow-hidden border ${activeImg === img ? 'border-white/60' : 'border-white/10 hover:border-white/30'}`}>
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="flex-1">
                  <div className="relative aspect-square bg-white/5 rounded-md overflow-hidden border border-white/10">
                    <img src={activeImg} alt={product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button className="w-9 h-9 rounded-full" onClick={() => { const i = images.indexOf(activeImg); const prev = (i - 1 + images.length) % images.length; setActiveImg(images[prev]); }}>‹</button>
                    <button className="w-9 h-9 rounded-full" onClick={() => { const i = images.indexOf(activeImg); const next = (i + 1) % images.length; setActiveImg(images[next]); }}>›</button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white/5 backdrop-blur-sm rounded-md p-6 md:p-10 border border-white/10">
              <h1 className="font-serif text-3xl md:text-4xl text-white font-bold">{product.name}</h1>
              <div className="mt-3 text-gray-400">{product.currency}{(product.price ?? 0).toLocaleString()}</div>
              <p className="mt-6 text-sm md:text-base leading-relaxed text-gray-400 max-w-xl">{product.description}</p>

              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-8 flex items-center gap-4">
                  <div className="text-sm text-gray-400">Size:</div>
                  <select value={size} onChange={(e) => setSize(e.target.value)} className="bg-black border border-white/15 rounded-md px-3 py-2 text-sm text-white">
                    {product.sizes.map((s) => (<option key={s} value={s} className="bg-black text-white">{s}</option>))}
                  </select>
                </div>
              )}

              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center border border-white/15 rounded-md overflow-hidden">
                  <button className="px-4 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <div className="px-4 py-2 text-sm text-white w-10 text-center">{qty}</div>
                  <button className="px-4 py-2" onClick={() => setQty((q) => q + 1)}>+</button>
                </div>

                <button onClick={addToCart} className="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-md px-5 py-3">Add to cart</button>
              </div>

              <div className="mt-10 border-t border-white/10">
                {[{ key: 'details', label: 'Details', value: product.details }, { key: 'maintenance', label: 'Maintenance', value: product.maintenance }, { key: 'warranty', label: 'Warranty', value: product.warranty }, { key: 'shipping', label: 'Shipping', value: product.shipping }].map((t) => (
                  <div key={t.key} className="border-b border-white/10">
                    <button onClick={() => setTab((cur) => (cur === t.key ? '' : t.key))} className="w-full flex items-center justify-between py-4 text-left">
                      <span className="text-sm text-gray-400">{t.label}</span>
                      <span className="text-gray-500 text-xl">{tab === t.key ? '−' : '+'}</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${tab === t.key ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                      <p className="text-sm text-gray-500 leading-relaxed pr-6">{t.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className={`fixed inset-0 bg-black/70 transition-opacity z-40 ${cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setCartOpen(false)} />

          <aside className={`fixed top-0 right-0 h-full w-[360px] sm:w-[420px] bg-[#1a1a1a] z-50 transform transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="font-serif text-xl text-white font-bold">Shopping Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-white text-2xl">×</button>
            </div>

            <div className="px-6 pb-36 overflow-y-auto h-[calc(100%-220px)]">
              {cartItems.length === 0 ? (
                <div className="text-center py-10"><p className="text-gray-500">Your cart is empty</p></div>
              ) : (
                <>
                  {cartItems.map((it) => (
                    <div key={it.id} className="flex gap-4 py-5 border-b border-white/10">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-white/5"><img src={it.image} alt={it.title} className="w-full h-full object-cover" loading="lazy" /></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3"><div><div className="text-sm text-white">{it.title}</div><div className="text-sm text-gray-400 mt-1">${((it.price ?? 0)).toLocaleString()}</div></div></div>
                        <div className="mt-3 text-xs text-gray-500 space-y-2">
                          {it.size && <div className="flex items-center justify-between"><span>Size:</span><span className="text-gray-400">{it.size}</span></div>}
                          <div className="flex items-center justify-between"><span>Quantity:</span><div className="flex items-center gap-2"><button className="px-2 py-1" onClick={() => updateCartQty(it.id, it.qty - 1)}>−</button><span className="text-white">{it.qty}</span><button className="px-2 py-1" onClick={() => updateCartQty(it.id, it.qty + 1)}>+</button></div></div>
                          <button onClick={() => removeFromCart(it.id)} className="text-left text-gray-500 hover:text-white underline">Remove →</button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="py-6 text-xs text-gray-500 space-y-2"><div className="flex items-center justify-between"><span>Free Standard Delivery (3 working day)</span><span>$0.00</span></div><button className="text-gray-400 underline">View Bag →</button></div>
                </>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#1a1a1a] px-6 py-5">
                <button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-md py-3">Estimated Total: ${(subtotal ?? 0).toLocaleString()} — Checkout</button>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default GiftsDetails;

export function getImageUrl(path) { if (!path) return "/images/hero.jpg"; return path; }
