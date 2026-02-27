import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Use images from the `public/images` folder via absolute paths

const Gifts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Scroll to a specific category section when navigation provides `scrollToId` in state
    const scrollToId = location?.state?.scrollToId;
    // Also support hash navigation like #category-1
    const hash = typeof window !== 'undefined' ? window.location.hash : "";
    const targetId = scrollToId ? `category-${scrollToId}` : (hash ? hash.replace('#', '') : null);
    if (targetId) {
      // Delay slightly to allow layout to settle
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          // If there's a sticky header, offset by its height so the section isn't hidden
          const header = document.querySelector('header');
          const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 80;
          const extraOffset = 12; // small gap under header
          const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - extraOffset;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      }, 80);
    }
  }, [location]);

  const giftItems = [
    {
      id: 1,
      title: "Gifts for Her",
      items: [
        { 
          id: 101, 
          name: "a", 
          image: "/images/gh.jpg",
          price: 1899,
          currency: "$",
          description: "A beautiful pendant set that adds elegance to any outfit. Perfect for her special moments.",
          sizes: ["16", "18", "20"],
          details: "Crafted with precision. Features a comfortable fit and secure clasp.",
          maintenance: "Store in a dry pouch. Clean with soft cloth after each wear.",
          warranty: "1 year warranty against manufacturing defects.",
          shipping: "Free shipping on orders over $100."
        },
        { 
          id: 102, 
          name: "b", 
          image: "/images/gh.jpg",
          price: 1299,
          currency: "$",
          description: "Classic pearl stud earrings that she'll treasure forever.",
          sizes: ["One Size"],
          details: "Genuine freshwater pearls. Secure butterfly backs.",
          maintenance: "Avoid contact with perfumes and chemicals.",
          warranty: "2 year warranty.",
          shipping: "Free insured shipping."
        },
        { 
          id: 103, 
          name: "c", 
          image: "/images/gh.jpg",
          price: 3299,
          currency: "$",
          description: "A stunning diamond bracelet that sparkles with every movement.",
          sizes: ["6.5", "7", "7.5"],
          details: "Certified diamonds. Secure clasp. Elegant design.",
          maintenance: "Professional cleaning recommended.",
          warranty: "Lifetime warranty.",
          shipping: "Free express shipping."
        },
        { 
          id: 104, 
          name: "d", 
          image: "/images/gh.jpg",
          price: 1599,
          currency: "$",
          description: "Romantic rose gold ring that symbolizes your love.",
          sizes: ["5", "6", "7", "8", "9"],
          details: "Beautiful rose gold finish. Comfortable fit.",
          maintenance: "Polish with soft cloth. Store separately.",
          warranty: "1 year warranty.",
          shipping: "Free standard delivery."
        },
      ],
    },
    {
      id: 2,
      title: "Gold Jewelry",
      items: [
        { 
          id: 201, 
          name: "a", 
          image: "/images/ring1.jpg",
          price: 2499,
          currency: "$",
          description: "Classic gold chain necklace that never goes out of style.",
          sizes: ["16", "18", "20", "22"],
          details: "Pure gold. Premium craftsmanship.",
          maintenance: "Clean with gold polishing cloth.",
          warranty: "Lifetime warranty.",
          shipping: "Free insured shipping."
        },
        { 
          id: 202, 
          name: "b", 
          image: "/images/ring1.jpg",
          price: 1799,
          currency: "$",
          description: "Timeless gold hoop earrings for everyday elegance.",
          sizes: ["Small", "Medium", "Large"],
          details: "Lightweight. Comfortable for all-day wear.",
          maintenance: "Store in pouch. Avoid pulling.",
          warranty: "2 year warranty.",
          shipping: "Free express shipping."
        },
        { 
          id: 203, 
          name: "c", 
          image: "/images/ring1.jpg",
          price: 2999,
          currency: "$",
          description: "A set of three gold bangles that stack beautifully.",
          sizes: ["6.5", "7", "7.5"],
          details: "Smooth finish. Comfortable fit. Set of 3.",
          maintenance: "Store in pouch. Avoid scratches.",
          warranty: "Lifetime warranty.",
          shipping: "Free insured shipping."
        },
        { 
          id: 204, 
          name: "d", 
          image: "/images/ring1.jpg",
          price: 1399,
          currency: "$",
          description: "Classic gold signet ring for a sophisticated look.",
          sizes: ["6", "7", "8", "9", "10"],
          details: "Traditional design. Premium gold finish.",
          maintenance: "Clean with soft cloth. Store separately.",
          warranty: "1 year warranty.",
          shipping: "Free standard shipping."
        },
      ],
    },
    {
      id: 3,
      title: "Heart Shaped Jewelry",
      items: [
        { 
          id: 301, 
          name: "a", 
          image: "/images/r.1.jpg",
          price: 1599,
          currency: "$",
          description: "Romantic heart pendant necklace, a symbol of love.",
          sizes: ["16", "18", "20"],
          details: "Beautiful heart-shaped pendant on a delicate chain.",
          maintenance: "Avoid contact with perfumes and chemicals.",
          warranty: "2 year warranty.",
          shipping: "Free insured shipping."
        },
        { 
          id: 302, 
          name: "b", 
          image: "/images/r.1.jpg",
          price: 1199,
          currency: "$",
          description: "Sweet heart-shaped stud earrings for daily wear.",
          sizes: ["One Size"],
          details: "Cute heart design. Secure butterfly backs.",
          maintenance: "Clean with soft cloth. Store in pairs.",
          warranty: "1 year warranty.",
          shipping: "Free shipping."
        },
        { 
          id: 303, 
          name: "c", 
          image: "/images/r.1.jpg",
          price: 999,
          currency: "$",
          description: "Elegant heart-shaped ring for that special someone.",
          sizes: ["5", "6", "7", "8"],
          details: "Romantic heart design. Comfortable fit.",
          maintenance: "Store in pouch. Clean with soft cloth.",
          warranty: "1 year warranty.",
          shipping: "Free standard shipping."
        },
        { 
          id: 304, 
          name: "d", 
          image: "/images/r.1.jpg",
          price: 1399,
          currency: "$",
          description: "Charming heart bracelet with delicate links.",
          sizes: ["7", "8", "9"],
          details: "Heart charms on a fine chain. Adjustable fit.",
          maintenance: "Store flat. Avoid tangling.",
          warranty: "2 year warranty.",
          shipping: "Free delivery."
        },
      ],
    },
    {
      id: 4,
      title: "Gifts for Him",
      items: [
        { 
          id: 401, 
          name: "a", 
          image: "/images/bs1.png",
          price: 3999,
          currency: "$",
          description: "A stunning ring that symbolizes forever love with brilliant shine.",
          sizes: ["5", "6", "7", "8"],
          details: "Premium quality diamonds. Exceptional brilliance.",
          maintenance: "Professional cleaning recommended.",
          warranty: "Lifetime warranty.",
          shipping: "Free express insured shipping."
        },
        { 
          id: 402, 
          name: "b", 
          image: "/images/bs1.png",
          price: 4499,
          currency: "$",
          description: "Regal halo ring fit for royalty, featuring a magnificent center stone.",
          sizes: ["5", "6", "7", "8"],
          details: "Intricate halo design. Certified center stone.",
          maintenance: "Clean with soft brush. Avoid harsh chemicals.",
          warranty: "Lifetime warranty.",
          shipping: "Free insured shipping."
        },
        { 
          id: 403, 
          name: "c", 
          image: "/images/bs1.png",
          price: 5299,
          currency: "$",
          description: "Make her feel like a queen with this magnificent proposal ring.",
          sizes: ["5", "6", "7", "8"],
          details: "Exquisite craftsmanship. Premium materials.",
          maintenance: "Store in original box. Professional cleaning.",
          warranty: "Lifetime warranty.",
          shipping: "Free express insured shipping."
        },
        { 
          id: 404, 
          name: "d", 
          image: "/images/bs1.png",
          price: 3599,
          currency: "$",
          description: "Beautiful ring to celebrate your golden vows and commitment.",
          sizes: ["5", "6", "7", "8"],
          details: "Elegant gold design. Timeless appeal.",
          maintenance: "Polish with gold cloth. Store separately.",
          warranty: "2 year warranty.",
          shipping: "Free insured shipping."
        },
      ],
    },
  ];

  const handleNavigation = (item) => {
    navigate("/GiftDetails", { state: { product: item } });
  };

  return (
    <section className="py-12 md:py-20 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-4 relative inline-block">
            Gift Collections
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/30" />
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mt-8">
            Find the perfect gift for every occasion and every loved one
          </p>
        </div>

        {/* 4 Sections - One below the other */}
        <div className="space-y-16">
          {giftItems.map((category) => (
            <div key={category.id} id={`category-${category.id}`} className="space-y-6">
              {/* Category Title */}
              <h3 className="font-serif text-2xl md:text-3xl text-white font-bold text-center">
                {category.title}
              </h3>

              {/* 4 Images Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    {/* Image Container */}
                    <div 
                      className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer mb-3"
                      onClick={() => handleNavigation(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition duration-500"
                      />
                    </div>

                    {/* Item Title */}
                    <h4 
                      className="font-serif text-sm md:text-base text-white font-medium text-center mb-1 cursor-pointer hover:text-white/80 transition-colors duration-300"
                      onClick={() => handleNavigation(item)}
                    >
                      {item.name}
                    </h4>

                    

                    {/* View Details Button */}
                    <button
                      onClick={() => handleNavigation(item)}
                      className="text-white/60 hover:text-white font-medium text-xs md:text-sm transition-colors duration-300 flex items-center justify-center mx-auto gap-1 group"
                    >
                      <span>View Details</span>
                      <svg
                        className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gifts;