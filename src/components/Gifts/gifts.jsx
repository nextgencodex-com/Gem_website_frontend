import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Gifts = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // First row gift items
  const firstRowGiftItems = [
    {
      id: 1,
      title: "Gifts for Her",
      image: "/images/her.jpg",
      link: "/birthday-collection"
    },
    {
      id: 2,
      title: "Gold Jewellery",
      image: "/images/gold.jpg",
      link: "/anniversary-collection"
    },
    {
      id: 3,
      title: "Heart-Shaped Jewellery",
      image: "/images/heart.jpg",
      link: "/engagement-rings"
    },
    {
      id: 4,
      title: "Gift for Him",
      image: "/images/him.jpg",
      link: "/luxury-collection"
    }
  ];

  // Second row gift items
  const secondRowGiftItems = [
    {
      id: 5,
      title: "Birthday Gifts",
      image: "/images/jew 1.jpg",
      link: "/birthday-collection"
    },
    {
      id: 6,
      title: "Anniversary Gifts",
      image: "/images/jew 2.jpg",
      link: "/anniversary-collection"
    },
    {
      id: 7,
      title: "Wedding Gifts",
      image: "/images/jew 3.jpg",
      link: "/wedding-collection"
    },
    {
      id: 8,
      title: "Christmas Gifts",
      image: "/images/jew 4.jpg",
      link: "/christmas-collection"
    }
  ];

  // Third row gift items (hidden initially)
  const thirdRowGiftItems = [
    {
      id: 9,
      title: "Pearl Jewellery",
      image: "/images/love.jpg",
      link: "/pearl-collection"
    },
    {
      id: 10,
      title: "Diamond Jewellery",
      image: "/images/Neck.jpg",
      link: "/diamond-collection"
    },
    {
      id: 11,
      title: "Gemstone Rings",
      image: "/images/Neck 1.jpg",
      link: "/gemstone-rings"
    },
    {
      id: 12,
      title: "Custom Designs",
      image: "/images/rings.jpg",
      link: "/custom-designs"
    }
  ];

  // Placeholder images for first row
  const firstRowImages = [
    "/images/her.jpg",
    "/images/gold.jpg",
    "/images/heart.jpg",
    "/images/him.jpg"
  ];

  // Placeholder images for second row
  const secondRowImages = [
    "/images/jew 1.jpg",
    "/images/jew 2.jpg",
    "/images/jew 3.jpg",
    "/images/jew 4.jpg"
  ];

  // Placeholder images for third row
  const thirdRowImages = [
    "/images/love.jpg",
    "/images/Neck.jpg",
    "/images/Neck 1.jpg",
    "/images/rings.jpg"
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Subtle background pattern - matching other pages */}
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
          onClick={() => window.open("https://wa.me/94759627589", "_blank")}
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
        </button>
      </div>

      {/* Find the Perfect Gift Section */}
      <section className="py-12 md:py-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-4 relative inline-block">
              Gifts That Speak from the Heart
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/30" />
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mt-8">
              Make every moment special with thoughtful gifts that express love, appreciation, and joy.
            </p>
          </div>

          {/* First Row - 4 Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
            {firstRowGiftItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group cursor-pointer text-center"
                onClick={() => navigate(item.link)}
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl mb-6">
                  <img
                    src={firstRowImages[index] || item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                
                {/* Title Below Image */}
                <h3 className="font-serif text-lg md:text-xl text-white font-bold mb-4 group-hover:text-white/80 transition-colors duration-300">
                  {item.title}
                </h3>
                
                {/* View Details Button with Arrow Icon */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.link);
                  }}
                  className="text-white/60 hover:text-white font-medium text-sm md:text-base transition-colors duration-300 flex items-center justify-center mx-auto gap-1"
                >
                  <span>View Details</span>
                  <svg 
                    className="w-4 h-4" 
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

          {/* Second Row - 4 Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
            {secondRowGiftItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group cursor-pointer text-center"
                onClick={() => navigate(item.link)}
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl mb-6">
                  <img
                    src={secondRowImages[index] || item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                
                {/* Title Below Image */}
                <h3 className="font-serif text-lg md:text-xl text-white font-bold mb-4 group-hover:text-white/80 transition-colors duration-300">
                  {item.title}
                </h3>
                
                {/* View Details Button with Arrow Icon */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.link);
                  }}
                  className="text-white/60 hover:text-white font-medium text-sm md:text-base transition-colors duration-300 flex items-center justify-center mx-auto gap-1"
                >
                  <span>View Details</span>
                  <svg 
                    className="w-4 h-4" 
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

          {/* View More Toggle Button */}
          <div className="flex justify-center my-8 md:my-12">
            <button
              onClick={toggleShowMore}
              className="flex flex-col items-center justify-center text-white/60 hover:text-white transition-colors duration-300 group"
              aria-label={showMore ? "Show less" : "View more"}
            >
              <span className="text-lg md:text-xl font-semibold mb-2 group-hover:scale-105 transition-transform duration-300">
                {showMore ? "Show Less" : "View More"}
              </span>
              <svg
                className={`w-8 h-8 transform transition-transform duration-500 ease-in-out ${
                  showMore ? "rotate-180" : ""
                } group-hover:scale-110`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Third Row - 4 Images (Hidden Initially) */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              showMore ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pt-4">
              {thirdRowGiftItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="group cursor-pointer text-center transform transition-all duration-500 hover:scale-[1.02]"
                  onClick={() => navigate(item.link)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl mb-6">
                    <img
                      src={thirdRowImages[index] || item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  
                  {/* Title Below Image */}
                  <h3 className="font-serif text-lg md:text-xl text-white font-bold mb-4 group-hover:text-white/80 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {/* View Details Button with Arrow Icon */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(item.link);
                    }}
                    className="text-white/60 hover:text-white font-medium text-sm md:text-base transition-colors duration-300 flex items-center justify-center mx-auto gap-1"
                  >
                    <span>View Details</span>
                    <svg 
                      className="w-4 h-4" 
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
        </div>
      </section>
    </div>
  );
};

export default Gifts;