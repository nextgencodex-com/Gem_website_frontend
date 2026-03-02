import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Popular = () => {
  const navigate = useNavigate();

  // Popular items data (using existing dummy images from public/images)
  const popularItems = [
    {
      id: 1,
      name: "Diamond Solitaire Ring",
      title: "Diamond Solitaire Ring",
      image: "/images/ds.jpg",
      price: 2999,
      currency: "$",
      description:
        "A stunning solitaire diamond ring that captures light and hearts. Perfect for engagements or special occasions.",
      images: ["/images/ring1.jpg", "/images/r.1.jpg", "/images/r.2.jpg", "/images/r.3.jpg"],
      sizes: ["6", "7", "8", "9", "10"],
      details: "Certified 1.5 carat diamond. 18K white gold setting. Handcrafted by master jewelers.",
      maintenance: "Clean with soft brush and mild soap. Avoid harsh chemicals. Store separately.",
      warranty: "Lifetime warranty against manufacturing defects.",
      shipping: "Free insured shipping worldwide. Delivery within 5-7 business days.",
      category: "Rings",
    },
    {
      id: 2,
      name: "Pearl Pendant Necklace",
      title: "Pearl Pendant Necklace",
      image: "/images/p.webp",
      price: 1899,
      currency: "$",
      description:
        "Elegant freshwater pearl pendant on a fine chain. A timeless piece that adds sophistication to any outfit.",
      images: ["/images/neck1.jpg", "/images/gem01.jpg", "/images/gem02.jpg"],
      sizes: ["16", "18", "20"],
      details: "Genuine freshwater pearl. 14K gold chain. Classic design for everyday wear.",
      maintenance: "Wipe with soft cloth after wearing. Avoid perfume and hairspray.",
      warranty: "2 year warranty on clasp and chain.",
      shipping: "Free gift wrapping available. Express shipping option.",
      category: "Necklaces",
    },
    {
      id: 3,
      name: "Gold Hoop Earrings",
      title: "Gold Hoop Earrings",
      image: "/images/gh.webp",
      price: 1299,
      currency: "$",
      description:
        "Classic gold hoop earrings that never go out of style. Lightweight and comfortable for all-day wear.",
      images: ["/images/ear1.jpg", "/images/ear1.jpg", "/images/ear1.jpg"],
      sizes: ["Small", "Medium", "Large"],
      details: "18K yellow gold. Secure push-back closure. Polished finish.",
      maintenance: "Store in pouch. Clean with gold polishing cloth.",
      warranty: "1 year warranty.",
      shipping: "Free standard delivery.",
      category: "Earrings",
    },
    {
      id: 4,
      name: "Sapphire Bracelet",
      title: "Sapphire Bracelet",
      image: "/images/sb.webp",
      price: 2499,
      currency: "$",
      description:
        "Beautiful sapphire and diamond tennis bracelet. A stunning addition to any jewelry collection.",
      images: ["/images/b1.jpg", "/images/b2.jpg", "/images/b3.jpg"],
      sizes: ["6.5", "7", "7.5"],
      details: "Natural blue sapphires. Diamond accents. 18K white gold.",
      maintenance: "Professional cleaning recommended annually.",
      warranty: "3 year warranty.",
      shipping: "Insured shipping included.",
      category: "Bracelets",
    },
    {
      id: 5,
      name: "Emerald Engagement Ring",
      title: "Emerald Engagement Ring",
      image: "/images/eer.jpg",
      price: 3599,
      currency: "$",
      description:
        "Stunning emerald cut emerald with diamond halo. A unique and elegant choice for the special moment.",
      images: ["/images/jew 5.jpg", "/images/jew1.jpg", "/images/j1.jpg"],
      sizes: ["6", "7", "8", "9"],
      details: "Certified Colombian emerald. Diamond halo setting. Platinum band.",
      maintenance: "Avoid ultrasonic cleaners. Professional cleaning only.",
      warranty: "Lifetime warranty.",
      shipping: "Free express shipping with tracking.",
      category: "Rings",
    },
    {
      id: 6,
      name: "Ruby Pendant",
      title: "Ruby Pendant",
      image: "/images/rp.webp",
      price: 2199,
      currency: "$",
      description:
        "Vibrant ruby pendant surrounded by diamonds. A bold and beautiful statement piece.",
      images: ["/images/gm.jpg", "/images/gm1.jpg", "/images/gem1.jpg"],
      sizes: ["16", "18"],
      details: "Natural Burmese ruby. Diamond accents. 18K rose gold.",
      maintenance: "Clean gently with soft brush. Store separately.",
      warranty: "2 year warranty.",
      shipping: "Free gift box included.",
      category: "Necklaces",
    },
    {
      id: 7,
      name: "Diamond Stud Earrings",
      title: "Diamond Stud Earrings",
      image: "/images/dse.webp",
      price: 1799,
      currency: "$",
      description:
        "Classic diamond stud earrings. Perfect for everyday elegance or special occasions.",
      images: ["/images/dj.jpeg", "/images/diamond.gif", "/images/user.gif"],
      sizes: ["0.5ct", "1ct", "1.5ct"],
      details: "Certified diamonds. Screw-back setting. 18K white gold.",
      maintenance: "Clean with jewelry cleaner. Store in pouch.",
      warranty: "Lifetime warranty.",
      shipping: "Free insured shipping.",
      category: "Earrings",
    },
    {
      id: 8,
      name: "Gold Chain Bracelet",
      title: "Gold Chain Bracelet",
      image: "/images/gcb.webp",
      price: 999,
      currency: "$",
      description:
        "Simple yet elegant gold chain bracelet. A versatile piece that pairs well with any style.",
      images: ["/images/gh.jpg", "/images/s1.jpg", "/images/s2.jpg"],
      sizes: ["7", "8", "9"],
      details: "14K yellow gold. Lobster clasp. Polished finish.",
      maintenance: "Store in pouch. Clean with gold cloth.",
      warranty: "1 year warranty.",
      shipping: "Free standard shipping.",
      category: "Bracelets",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Filter by category
  const categories = ["All", ...new Set(popularItems.map((item) => item.category))];

  const filteredItems =
    selectedCategory === "All"
      ? popularItems
      : popularItems.filter((item) => item.category === selectedCategory);

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0; // default
  });

  const handleViewDetails = (item) => {
    navigate("/popularItems", { state: { product: item } });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Subtle background pattern */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Page Header - This is already responsive */}
      <div className="relative z-10 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-white font-bold mb-4 relative inline-block">
            Most Popular Items
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/30" />
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-8">
            Discover our most loved and bestselling jewelry pieces, handpicked by customers like you
          </p>
        </div>
      </div>

      {/* ========== DESKTOP VIEW CODE ========== */}
      <div className="hidden lg:block">
        <section className="py-8 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4 gap-8 md:gap-10">
              {sortedItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer text-center"
                  onClick={() => handleViewDetails(item)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl mb-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* Title Below Image */}
                  <h3 className="font-serif text-xl text-white font-bold mb-2 group-hover:text-white/80 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* View Details Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(item);
                    }}
                    className="text-white/60 hover:text-white font-medium text-base transition-colors duration-300 flex items-center justify-center mx-auto gap-1"
                  >
                    <span>View Details</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {sortedItems.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No items found in this category.</p>
                <button onClick={() => setSelectedCategory("All")} className="mt-4 text-white/60 hover:text-white underline underline-offset-4">
                  View all items
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ========== MOBILE VIEW CODE ========== */}
      <div className="block lg:hidden">
        <section className="py-6 pb-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 gap-4">
              {sortedItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer text-center"
                  onClick={() => handleViewDetails(item)}
                >
                  {/* Image Container - Mobile */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* Title Below Image - Mobile */}
                  <h3 className="font-serif text-sm text-white font-bold mb-2 line-clamp-2 px-1">
                    {item.title}
                  </h3>

                  {/* View Details Button - Mobile */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(item);
                    }}
                    className="text-white/60 hover:text-white font-medium text-xs transition-colors duration-300 flex items-center justify-center mx-auto gap-1"
                  >
                    <span>View</span>
                    <svg
                      className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Empty State - Mobile */}
            {sortedItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-base">No items found in this category.</p>
                <button onClick={() => setSelectedCategory("All")} className="mt-3 text-white/60 hover:text-white text-sm underline underline-offset-4">
                  View all items
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Popular;