 import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Use images from the `public/images` folder via absolute paths

const Category = () => {
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

  const categoryItems = [
    {
      id: 1,
      title: "Necklaces and Pendants",
      items: [
        { 
          id: 101, 
          name: "Colar Necklace", 
          image: "/images/gh.jpg",
          price: 1899,
          currency: "$",
          description: "Elegant colar necklace that sits gracefully on the neckline. Perfect for both casual and formal occasions.",
          sizes: ["14", "16", "18"],
          details: "Crafted with precision. Features a comfortable fit and secure clasp.",
          maintenance: "Store in a dry pouch. Clean with soft cloth after each wear.",
          warranty: "1 year warranty against manufacturing defects.",
          shipping: "Free shipping on orders over $100."
        },
        { 
          id: 102, 
          name: "Heart Pendant Necklace", 
          image: "/images/gh.jpg",
          price: 1599,
          currency: "$",
          description: "Romantic heart pendant necklace, a symbol of love and affection.",
          sizes: ["16", "18", "20"],
          details: "Beautiful heart-shaped pendant on a delicate chain.",
          maintenance: "Avoid contact with perfumes and chemicals.",
          warranty: "2 year warranty.",
          shipping: "Free insured shipping."
        },
        { 
          id: 103, 
          name: "Opera Necklace", 
          image: "/images/gh.jpg",
          price: 2499,
          currency: "$",
          description: "Long opera necklace that makes a dramatic statement for formal events.",
          sizes: ["28", "30", "32"],
          details: "Elegant long chain design. Can be worn single or doubled.",
          maintenance: "Store flat to prevent tangling.",
          warranty: "1 year warranty.",
          shipping: "Free express shipping."
        },
        { 
          id: 104, 
          name: "Cross Pendant Necklace", 
          image: "/images/gh.jpg",
          price: 1299,
          currency: "$",
          description: "Classic cross pendant necklace, a timeless symbol of faith.",
          sizes: ["16", "18", "20"],
          details: "Detailed cross design. Comfortable to wear daily.",
          maintenance: "Polish with soft cloth. Store separately.",
          warranty: "1 year warranty.",
          shipping: "Free standard delivery."
        },
      ],
    },
    {
      id: 2,
      title: "Rings",
      items: [
        { 
          id: 201, 
          name: "Solitare Ring", 
          image: "/images/ring1.jpg",
          price: 2999,
          currency: "$",
          description: "Classic solitaire ring featuring a single stunning gemstone.",
          sizes: ["5", "6", "7", "8", "9"],
          details: "Timeless design. Perfect for engagements or special occasions.",
          maintenance: "Clean with soft brush and mild soap.",
          warranty: "Lifetime warranty.",
          shipping: "Free insured shipping."
        },
        { 
          id: 202, 
          name: "Cocktail Ring", 
          image: "/images/ring1.jpg",
          price: 2199,
          currency: "$",
          description: "Bold cocktail ring designed to make a statement at parties and events.",
          sizes: ["6", "7", "8", "9"],
          details: "Eye-catching design. Premium quality materials.",
          maintenance: "Store separately. Avoid harsh chemicals.",
          warranty: "2 year warranty.",
          shipping: "Free express shipping."
        },
        { 
          id: 203, 
          name: "Halo Ring", 
          image: "/images/ring1.jpg",
          price: 3299,
          currency: "$",
          description: "Stunning halo ring with center stone surrounded by smaller gems.",
          sizes: ["5", "6", "7", "8"],
          details: "Dazzling halo design that maximizes brilliance.",
          maintenance: "Professional cleaning recommended.",
          warranty: "Lifetime warranty.",
          shipping: "Free insured shipping."
        },
        { 
          id: 204, 
          name: "Promise Ring", 
          image: "/images/ring1.jpg",
          price: 1299,
          currency: "$",
          description: "Meaningful promise ring to symbolize commitment and love.",
          sizes: ["5", "6", "7", "8", "9"],
          details: "Elegant and simple design. Perfect for promises.",
          maintenance: "Clean with soft cloth. Store in pouch.",
          warranty: "1 year warranty.",
          shipping: "Free standard shipping."
        },
      ],
    },
    {
      id: 3,
      title: "Earrings",
      items: [
        { 
          id: 301, 
          name: "Stud Earrings", 
          image: "/images/r.1.jpg",
          price: 999,
          currency: "$",
          description: "Classic stud earrings for everyday elegance.",
          sizes: ["One Size"],
          details: "Timeless design. Secure butterfly backs.",
          maintenance: "Clean with soft cloth. Store in pairs.",
          warranty: "1 year warranty.",
          shipping: "Free shipping."
        },
        { 
          id: 302, 
          name: "Dangle Earrings", 
          image: "/images/r.1.jpg",
          price: 1499,
          currency: "$",
          description: "Elegant dangle earrings that move gracefully with you.",
          sizes: ["One Size"],
          details: "Beautiful movement. Secure french wire backs.",
          maintenance: "Store hanging to prevent tangling.",
          warranty: "2 year warranty.",
          shipping: "Free delivery."
        },
        { 
          id: 303, 
          name: "Hoop Earrings", 
          image: "/images/r.1.jpg",
          price: 1299,
          currency: "$",
          description: "Stylish hoop earrings in various sizes.",
          sizes: ["Small", "Medium", "Large"],
          details: "Lightweight. Comfortable for all-day wear.",
          maintenance: "Store in pouch. Avoid pulling.",
          warranty: "1 year warranty.",
          shipping: "Free standard shipping."
        },
        { 
          id: 304, 
          name: "Cluster Earrings", 
          image: "/images/r.1.jpg",
          price: 1799,
          currency: "$",
          description: "Stunning cluster earrings with multiple gems.",
          sizes: ["One Size"],
          details: "Sparkling cluster design. Secure closures.",
          maintenance: "Clean gently. Store separately.",
          warranty: "2 year warranty.",
          shipping: "Free insured shipping."
        },
      ],
    },
    {
      id: 4,
      title: "Bracelets",
      items: [
        { 
          id: 401, 
          name: "Chain Bracelets", 
          image: "/images/bg.webp",
          price: 899,
          currency: "$",
          description: "Versatile chain bracelets for daily wear.",
          sizes: ["7", "8", "9"],
          details: "Various chain styles. Durable construction.",
          maintenance: "Clean with jewelry cloth.",
          warranty: "1 year warranty.",
          shipping: "Free shipping."
        },
        { 
          id: 402, 
          name: "Tennis Bracelets", 
          image: "/images/bg.webp",
          price: 3299,
          currency: "$",
          description: "Classic tennis bracelets with sparkling stones.",
          sizes: ["6.5", "7", "7.5"],
          details: "Continuous line of gems. Secure clasp.",
          maintenance: "Professional cleaning recommended.",
          warranty: "Lifetime warranty.",
          shipping: "Free insured shipping."
        },
        { 
          id: 403, 
          name: "Link Bracelets", 
          image: "/images/bg.webp",
          price: 1499,
          currency: "$",
          description: "Bold link bracelets for a statement look.",
          sizes: ["7", "8", "9"],
          details: "Interlocking links. Modern design.",
          maintenance: "Store flat. Avoid bending.",
          warranty: "2 year warranty.",
          shipping: "Free express shipping."
        },
        { 
          id: 404, 
          name: "Bangle Bracelets", 
          image: "/images/bg.webp",
          price: 1299,
          currency: "$",
          description: "Classic bangles that stack beautifully.",
          sizes: ["6.5", "7", "7.5"],
          details: "Smooth finish. Comfortable fit.",
          maintenance: "Store in pouch. Avoid scratches.",
          warranty: "1 year warranty.",
          shipping: "Free standard shipping."
        },
      ],
    },
    {
      id: 5,
      title: "Love and Engagements",
      items: [
        { 
          id: 501, 
          name: "Forever Shine Ring", 
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
          id: 502, 
          name: "Royal Halo Ring", 
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
          id: 503, 
          name: "Queen Proposal Ring", 
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
          id: 504, 
          name: "Golden Vow Ring", 
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
    navigate("/categoryItems", { state: { product: item } });
  };

  return (
    <section className="py-12 md:py-20 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-4 relative inline-block">
            Shop by Category
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/30" />
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mt-8">
            Browse our exclusive collections categorized by jewellery type
          </p>
        </div>


        {/* 5 Sections - One below the other */}
        <div className="space-y-16">
          {categoryItems.map((category) => (
            <div key={category.id} id={`category-${category.id}`} className="space-y-6">
              {/* Category Title */}
              <h3 className="font-serif text-2xl md:text-3xl text-white font-bold text-center">
                {category.title}
              </h3>

              {/* 4 Images Grid (since each category now has 4 items) */}
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
                      className="font-serif text-sm md:text-base text-white font-medium text-center mb-3 cursor-pointer hover:text-white/80 transition-colors duration-300"
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

export default Category;