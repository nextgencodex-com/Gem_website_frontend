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
    <div className="relative h-[400px] md:h-[700px] flex items-center justify-center text-center text-white overflow-hidden font-serif rounded-[3rem] md:rounded-[4rem] mx-4 md:mx-8 mt-4 md:mt-6">
      <video
        ref={videoRef}
        src="/videos/hero 11.mp4"
        autoPlay
        muted={muted}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      ></video>

      <div className="absolute inset-0 bg-black opacity-30 z-10" />

      <div className="relative z-20 space-y-8 px-6 lg:px-16 max-w-4xl">
        <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold drop-shadow-xl text-white">
          TIMELESS NATURAL BEAUTY
          <br />
          FROM THE HEART
          <br />
          OF THE WORLD
        </h1>

        {/* Hide buttons on mobile */}
        <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300 border border-white/30 backdrop-blur-md text-sm md:text-base md:px-8"
            onClick={() => navigate("/gem-collection")}
          >
            EXPLORE OUR GEM COLLECTION
          </button>
          <button
            className="bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-black px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md text-sm md:text-base md:px-8"
            onClick={() => navigate("/jewellery-collection")}
          >
            EXPLORE OUR JEWELLERY COLLECTION
          </button>
        </div>
      </div>

      {/* Mute/Unmute Toggle Icon */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full transition"
      >
        {muted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>
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

  // Shop by Category items
  const categoryItems = [
    {
      id: 1,
      title: "Necklaces & Pendants",
      image: "/images/necklace and pendant.jpg",
      link: "/necklaces-pendants"
    },
    {
      id: 2,
      title: "Rings",
      image: "/images/rings.jpg",
      link: "/rings"
    },
    {
      id: 3,
      title: "Earrings",
      image: "/images/earrings.jpg",
      link: "/earrings"
    },
    {
      id: 4,
      title: "Bracelets",
      image: "/images/bracelets.jpg",
      link: "/bracelets"
    },
    {
      id: 5,
      title: "Love & Engagement",
      image: "/images/love.jpg",
      link: "/love-engagement"
    }
  ];

  // Gifting Services items
  const giftingServices = [
    {
      id: 1,
      title: "Book an Appointment",
      image: "/images/book.webp",
      link: "/book-appointment",
    },
    {
      id: 2,
      title: "Engrave Your Gift",
      image: "/images/gift.webp",
      link: "/engraving-services",
    },
    {
      id: 3,
      title: "Contact Us",
      image: "/images/contact.webp",
      link: "/contact",
    }
  ];

  // Placeholder images for gift section
  const giftImages = [
    "/images/her.jpg",
    "/images/gold.jpg",
    "/images/heart.jpg",
    "/images/him.jpg"
  ];

  // Placeholder images for category section
  const categoryImages = [
    "/images/necklace and pendant.jpg",
    "/images/rings.jpg",
    "/images/earrings.jpg",
    "/images/bracelets.jpg",
    "/images/love.jpg"
  ];

  // Placeholder images for gifting services section
  const serviceImages = [
    "/images/book.webp",
    "/images/gift.webp",
    "/images/contact.webp"
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
          onClick={() => window.open("https://wa.me/94759627589", "_blank")}
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
            <div 
              className="group cursor-pointer"
              onClick={() => navigate("/collection-1")}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                <img
                  src="/images/jew 1.jpg"
                  alt="Jewellery 2"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
            </div>

            {/* Second Image */}
            <div 
              className="group cursor-pointer"
              onClick={() => navigate("/collection-2")}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                <img
                  src="/images/jew 2.jpg"
                  alt="Jewellery 3"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Most Popular Item in Center */}
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="max-w-md w-full text-center">
              {/* Image Container - Same Size as Others */}
              <div 
                className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl mb-4 mx-auto cursor-pointer"
                onClick={() => navigate("/most-popular")}
              >
                <img
                  src="/images/jew 5.jpg"
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
                onClick={() => navigate("/most-popular")}
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
            <div 
              className="group cursor-pointer"
              onClick={() => navigate("/collection-3")}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                <img
                  src="/images/jew 3.jpg"
                  alt="Jewellery 1"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
            </div>

            {/* Fourth Image */}
            <div 
              className="group cursor-pointer"
              onClick={() => navigate("/collection-4")}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                <img
                  src="/images/jew 4.jpg"
                  alt="Jewellery 4"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
            </div>
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

      {/* Section 4: Discover Our Gifting Services */}
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

          {/* 3 Images in a Single Line */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
            {giftingServices.map((item, index) => (
              <div 
                key={item.id}
                className="group cursor-pointer"
                onClick={() => navigate(item.link)}
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl mb-6">
                  <img
                    src={serviceImages[index] || item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                
                {/* Title Below Image */}
                <h3 className="font-serif text-lg md:text-xl text-white font-bold mb-2 group-hover:text-white/80 transition-colors duration-300">
                  {item.title}
                </h3>
                
                {/* Learn More Link with Arrow */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.link);
                  }}
                  className="text-white/60 hover:text-white font-medium text-sm md:text-base transition-colors duration-300 flex items-center gap-1"
                >
                  <span>Learn More</span>
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
    </div>
  );
};

export default Home;