import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { VolumeX, Volume2 } from "lucide-react";

function HeroSection({ navigate }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !muted;
      videoRef.current.muted = newMutedState;
      videoRef.current.volume = newMutedState ? 0 : 1;
      videoRef.current.play();
      setMuted(newMutedState);
    }
  };

  return (
    <div className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center overflow-hidden bg-black">
      <img
        src="/images/Hero 23.jpeg"
        alt="Luxury Gemstones"
        className="absolute inset-0 w-full h-full object-contain z-0"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 space-y-6 px-6 lg:px-12 max-w-4xl mx-auto">
        {/* Hero text if needed */}
      </div>
    </div>
  );
}

const Home = () => {
  const navigate = useNavigate();

  // Gift items data
  const giftItems = [
    {
      id: 1,
      title: "Gifts for Her",
      image: "/images/bl 1.jpg",
      link: "/birthday-collection"
    },
    {
      id: 2,
      title: "Gold Jewellery",
      image: "/images/bl 2.jpg",
      link: "/anniversary-collection"
    },
    {
      id: 3,
      title: "Heart-Shaped Jewellery",
      image: "/images/hs.webp",
      link: "/engagement-rings"
    },
    {
      id: 4,
      title: "Gift for Him",
      image: "/images/bl 4.jpg",
      link: "/luxury-collection"
    }
  ];

  // Shop by Category items
  const categoryItems = [
    {
      id: 1,
      title: "Necklaces & Pendants",
      image: "/images/bl 6.jpg",
      link: "/necklaces-pendants"
    },
    {
      id: 2,
      title: "Rings",
      image: "/images/bg.webp",
      link: "/rings"
    },
    {
      id: 3,
      title: "Earrings",
      image: "/images/bg.webp",
      link: "/earrings"
    },
    {
      id: 4,
      title: "Bracelets",
      image: "/images/bg.webp",
      link: "/bracelets"
    },
    {
      id: 5,
      title: "Love & Engagement",
      image: "/images/bg.webp",
      link: "/love-engagement"
    }
  ];

  // Gifting Services items - UPDATED WITH BETTER ICONS
  const giftingServices = [
    {
      id: 1,
      title: "Book an Appointment",
      icon: (className) => (
        <svg className={className} fill="white" viewBox="0 0 24 24">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="white" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="15" r="1" fill="white"/>
          <circle cx="16" cy="15" r="1" fill="white"/>
          <circle cx="8" cy="15" r="1" fill="white"/>
        </svg>
      ),
      link: "/book-appointment",
    },
    {
      id: 2,
      title: "Engrave Your Gift",
      icon: (className) => (
        <svg className={className} fill="white" viewBox="0 0 24 24">
          <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="white" strokeWidth="1.5" fill="none"/>
          <path d="M3 21h18" stroke="white" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
      link: "/engraving-services",
    },
    {
      id: 3,
      title: "Contact Us",
      icon: (className) => (
        <svg className={className} fill="white" viewBox="0 0 24 24">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="white" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="13" r="1" fill="white"/>
        </svg>
      ),
      link: "/contact",
    }
  ];

  // Placeholder images for gift section
  const giftImages = [
    "/images/bl 1.jpg",
    "/images/bl 2.jpg",
    "/images/hs.webp",
    "/images/bl 4.jpg"
  ];

  // Placeholder images for category section
  const categoryImages = [
    "/images/bl 6.jpg",
    "/images/bl 7.jpg",
    "/images/bl 8.jpg",
    "/images/bl 9.jpg",
    "/images/bl 10.jpg"
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Subtle background pattern - matching About Us page */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Hero Section with Video */}
      <HeroSection navigate={navigate} />

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

      {/* Section 1: Find the Perfect Gift */}
      <section className="py-12 md:py-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-4 relative inline-block">
              Find the Perfect Gift
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/30" />
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mt-8">
              Discover our curated collection of exquisite gemstones and jewellery perfect for every special occasion
            </p>
          </div>

          {/* 4 Images in a Single Line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {giftItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group cursor-pointer text-center"
                onClick={() => navigate("/gifts")}
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl mb-6">
                  <img
                    src={giftImages[index] || item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                
                {/* Title Below Image */}
                <h3 className="font-serif text-lg md:text-xl text-white font-bold mb-4 group-hover:text-white/80 transition-colors duration-300">
                  {item.title}
                </h3>
                
                {/* Shop Now Button with Arrow Icon */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/gifts");
                  }}
                  className="text-white/60 hover:text-white font-medium text-sm md:text-base transition-colors duration-300 flex items-center justify-center mx-auto gap-1"
                >
                  <span>Shop Now</span>
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
      </section>

      {/* Section 2: 3-Row Layout with Most Popular in Middle Row */}
      <section className="py-12 md:py-20 bg-black/95 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Row 1: 2 Images Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
            {/* First Image */}
            {/*<div 
              className="group cursor-pointer"
              onClick={() => navigate("/collection-1")}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                <img
                  src="/images/gh.jpg"
                  alt="Jewellery 2"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
            </div>*/}

            {/* Second Image */}
            {/*<div 
              className="group cursor-pointer"
              onClick={() => navigate("/collection-2")}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                <img
                  src="/images/gh.jpg"
                  alt="Jewellery 3"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
            </div>*/}
          </div>

          {/* Row 2: Most Popular Item in Center */}
          <div className="flex justify-center mb-8 md:mb-10">
              <div className="max-w-md w-full text-center">
              {/* Image Container - Same Size as Others */}
              <div 
                className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl mb-4 mx-auto cursor-pointer"
                onClick={() => navigate("/popular")}
              >
                <img
                  src="/images/bl 5.jpg"
                  alt="Most Popular Items"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
              
              {/* Most Popular Items Text */}
              <h3 className="font-serif text-lg md:text-xl text-white font-bold mb-2">
                Most Popular Items
              </h3>
              
              {/* Shop Now Button with Arrow */}
              <button 
                onClick={() => navigate("/popular")}
                className="text-white/60 hover:text-white font-medium text-sm md:text-base transition-colors duration-300 flex items-center justify-center mx-auto gap-1"
              >
                <span>Shop Now</span>
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
          </div>

          {/* Row 3: 2 Images Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {/* Third Image */}
            {/*<div 
              className="group cursor-pointer"
              onClick={() => navigate("/collection-3")}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                <img
                  src="/images/gh.jpg"
                  alt="Jewellery 1"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
            </div>*/}

            {/* Fourth Image */}
            {/*<div 
              className="group cursor-pointer"
              onClick={() => navigate("/collection-4")}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                <img
                  src="/images/gh.jpg"
                  alt="Jewellery 4"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
            </div>*/}
          </div>
        </div>
      </section>

      {/* Section 3: Shop by Category */}
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

          {/* 5 Images in a Single Line */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {categoryItems.map((item, index) => (
              <div 
                key={item.id}
                className="group cursor-pointer text-center"
                onClick={() => navigate(item.link)}
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl mb-4">
                  <img
                    src={categoryImages[index] || item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                
                {/* Title Below Image */}
                <h3 className="font-serif text-base md:text-lg text-white font-bold mt-4 group-hover:text-white/80 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Discover Our Gifting Services - REDUCED ICON SIZE */}
      <section className="py-12 md:py-20 bg-black/95 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-4 relative inline-block">
              Discover Our Gifting Services
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/30" />
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mt-8">
              Enhance your gift-giving experience with our exclusive services
            </p>
          </div>

          {/* 3 Icons in a Single Line - REDUCED SIZE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {giftingServices.map((item) => (
              <div 
                key={item.id}
                className="group text-center"
              >
                {/* Icon Container - REDUCED PADDING AND ICON SIZE */}
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-white/10 border border-white/20 group-hover:border-white/40 group-hover:bg-white/15 transition-all duration-300">
                    {item.icon("w-12 h-12 md:w-14 md:h-14 text-white")}
                  </div>
                </div>
                
                {/* Title Below Icon - REDUCED TEXT SIZE */}
                <h3 className="font-serif text-base md:text-lg text-white font-bold group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;