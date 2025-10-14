import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { VolumeX, Volume2 } from "lucide-react";

const testimonials = [
  {
    country: "USA",
    quote:
      "CeyGem's Sapphires are unmatched in quality. A trusted partner for our jewelry line",
    name: "Emily Chen, Jeweler",
  },
  {
    country: "UAE",
    quote: "His expertise in Ceylon gems made our purchase seamless.",
    img: "/images/12.png",
    name: "Ahmed Al Mansoori, Buyer",
  },
  {
    country: "UK",
    quote: "The quality and authenticity of the gems exceeded our expectations",
    img: "/images/13.png",
    name: "Nisha Rajan, Collector",
  },
  {
    country: "USA",
    quote:
      "A trusted gem expert who brings Sri Lanka's brilliance to the world.",
    img: "/images/14.png",
    name: "Lucia Ferraro, Jeweler",
  },
];

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
    <div className="relative h-[400px] md:h-[700px] flex items-center justify-start text-left text-white overflow-hidden font-poppins">
      <video
        ref={videoRef}
        src="/videos/v2.mp4"
        autoPlay
        muted={muted}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      ></video>

      <div className="absolute inset-0 bg-black opacity-20 z-10" />

      <div className="relative z-20 space-y-8 px-6 lg:px-16 max-w-4xl rounded-xl p-6">
        <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold drop-shadow-xl text-white">
          TIMELESS NATURAL BEAUTY
          <br />
          FROM THE HEART
          <br />
          OF THE WORLD
        </h1>

        {/* Hide buttons on mobile */}
        <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-start">
          <button
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300 border border-white/50 backdrop-blur-md text-sm md:text-base md:px-8"
            onClick={() => navigate("/gem-collection")}
          >
            EXPLORE OUR GEM COLLECTION
          </button>
          <button
            className="bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-[#00B9B3] px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md text-sm md:text-base md:px-8"
            onClick={() => navigate("/jewellery-collection")}
          >
            EXPLORE OUR JEWELLERY COLLECTION
          </button>
        </div>
      </div>

      {/* Mute/Unmute Toggle Icon */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full transition"
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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const idx = Math.round(scrollLeft / width);
    setCurrentTestimonial(idx);
  };

  return (
    <div className="min-h-screen font-poppines">
      <HeroSection navigate={navigate} />

      {/* WhatsApp Button - Made smaller on mobile */}
      <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-20">
        <button
          className="bg-green-500 hover:bg-[#009690] text-white px-3 py-2 md:px-4 md:py-2 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300 text-sm md:text-base"
          onClick={() => window.open("https://wa.me/94759627589", "_blank")}
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
        </button>
      </div>

      {/* Luxurious Gemstone Section with Alternating Layout */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
            <div className="order-1 md:order-1">
              <h2 className="text-2xl md:text-5xl font-bold text-[#bf9b30] mb-4 md:mb-6">
                Exquisite Gemstones
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                Discover the rarest and most vibrant gemstones from Sri Lanka,
                each hand-selected for their exceptional quality and brilliance.
                Our collection represents the finest examples of nature's
                artistry.
              </p>
              <button
                className="w-60 bg-[#bf9b30]  text-white font-medium py-1 px-1 rounded-full transition-colors duration-300"
                onClick={() => navigate("/gem-collection")}
              >
                VIEW GEM COLLECTION
              </button>
            </div>
            <div className="order-2 md:order-2 relative">
              <div className="relative aspect-square w-full h-auto rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/images/gem4.jpg"
                  alt="Blue Sapphire"
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="relative aspect-square w-full h-auto rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/images/jew1.jpg"
                  alt="Ruby Gemstone"
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-5xl font-bold text-[#bf9b30] mb-4 md:mb-6">
                Premium Jewelry Collections
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                Our master jewelers transform these exceptional gemstones into
                breathtaking jewelry pieces that embody elegance and timeless
                beauty. Each creation tells a story of craftsmanship and
                passion.
              </p>
              <button
                className="w-60 bg-[#bf9b30]  text-white font-medium py-1 px-1 rounded-full transition-colors duration-300"
                onClick={() => navigate("/jewellery-collection")}
              >
                VIEW JEWELRY COLLECTION
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2x2 Gemstone Grid for Mobile */}
      <section className="md:hidden py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center text-[#bf9b30] mb-6">
            Our Signature Gemstones
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/images/gm4.jpg"
                alt="Blue Sapphire"
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800">
                  Blue Sapphire
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  The finest Ceylon blue
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/images/gm1.jpg"
                alt="Ruby"
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800">Ruby</h3>
                <p className="text-xs text-gray-600 mt-1">Vibrant and rare</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/images/gm3.jpg"
                alt="Padparadscha"
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800">
                  Padparadscha
                </h3>
                <p className="text-xs text-gray-600 mt-1">Sunset in a stone</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/images/gm2.jpg"
                alt="Emerald"
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800">Emerald</h3>
                <p className="text-xs text-gray-600 mt-1">Lush green beauty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Master Of Ceylon Gems Section */}
      <section className="py-12 md:py-20 bg-[#f8f4ed]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-square w-full h-auto rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/images/gem5.jpg"
                alt="Master Gemologist"
                className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-5xl font-bold text-[#bf9b30] mb-4 md:mb-6">
                Master Of Gems
              </h2>
              <div className="w-16 h-1 bg-[#00B9B3] mb-6 md:mb-8"></div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8">
                With over 25 years in Sri Lanka's gem trade, our founder brings
                you the finest Ceylon Sapphires, Rubies, and more. From the
                legendary gem mines of Ratnapura to your collection, experience
                the authenticity and brilliance that only comes from generations
                of expertise.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-[#00B9B3] mt-0.5 md:mt-1 mr-2 md:mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-sm md:text-base text-gray-700">
                    25+ years of gem sourcing expertise
                  </p>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-[#00B9B3] mt-0.5 md:mt-1 mr-2 md:mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-sm md:text-base text-gray-700">
                    Direct relationships with licensed mines
                  </p>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-[#00B9B3] mt-0.5 md:mt-1 mr-2 md:mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-sm md:text-base text-gray-700">
                    International gemological certifications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story In Numbers Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-[#bf9b30] mb-4">
            Our Legacy In Numbers
          </h2>
          <div className="w-16 h-1 bg-[#00B9B3] mx-auto mb-12 md:mb-16"></div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-[#00B9B3] mb-3 md:mb-4">25+</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                Years of Excellence
              </h3>
              <p className="text-sm md:text-base text-gray-600">In the gemstone industry</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-[#00B9B3] mb-3 md:mb-4">4</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                Countries Served
              </h3>
              <p className="text-sm md:text-base text-gray-600">Global clientele base</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-[#00B9B3] mb-3 md:mb-4">
                1000+
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                Satisfied Clients
              </h3>
              <p className="text-sm md:text-base text-gray-600">Worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-[#f8f4ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#bf9b30] mb-4">
              Client Testimonials
            </h2>
            <div className="w-16 h-1 bg-[#00B9B3] mx-auto"></div>
          </div>

          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-sm font-medium text-[#00B9B3] mb-2">
                  {testimonial.country}
                </div>
                <div className="text-3xl md:text-4xl text-gray-300 mb-3 md:mb-4">"</div>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div>
                    <div className="font-semibold text-gray-800">
                      {testimonial.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4"
              ref={carouselRef}
              onScroll={handleScroll}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-[85%] snap-center">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="text-sm font-medium text-[#00B9B3] mb-2">
                      {testimonial.country}
                    </div>
                    <div className="text-3xl text-gray-300 mb-4">"</div>
                    <p className="text-sm text-gray-600 mb-6 italic">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">
                          {testimonial.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                    currentTestimonial === index
                      ? "bg-[#00B9B3]"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#bf9b30] mb-4">
              Why Choose CeyGem
            </h2>
            <div className="w-16 h-1 bg-[#00B9B3] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 hover:border-[#00B9B3] transition-all duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00B9B3] bg-opacity-10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-[#00B9B3]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                Certified Authenticity
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Every gem comes with international certification ensuring
                genuine Sri Lankan origin and quality.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 hover:border-[#00B9B3] transition-all duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00B9B3] bg-opacity-10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-[#00B9B3]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                Ethical Sourcing
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                We work directly with licensed mines ensuring fair trade
                practices that benefit local communities.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 hover:border-[#00B9B3] transition-all duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00B9B3] bg-opacity-10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-[#00B9B3]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                Global Shipping
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Insured worldwide delivery with tracking, ensuring your precious
                gemstones arrive safely.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 hover:border-[#00B9B3] transition-all duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00B9B3] bg-opacity-10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-[#00B9B3]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                Expert Craftsmanship
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Our master cutters have decades of experience in bringing out
                the maximum brilliance in every stone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 bg-[#f8f4ed]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#bf9b30] mb-4 md:mb-6">
                Contact Us
              </h2>
              <div className="w-16 h-1 bg-[#00B9B3] mb-6 md:mb-8"></div>
              <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                Have questions about our gemstones or jewelry collections? Our
                experts are ready to assist you with personalized service.
              </p>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-[#00B9B3] mt-0.5 md:mt-1 mr-2 md:mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm md:text-base font-medium text-gray-800">Phone</p>
                    <p className="text-sm md:text-base text-gray-600">+94 11 234 5678</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-[#00B9B3] mt-0.5 md:mt-1 mr-2 md:mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm md:text-base font-medium text-gray-800">Email</p>
                    <p className="text-sm md:text-base text-gray-600">info@ceygem.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-[#00B9B3] mt-0.5 md:mt-1 mr-2 md:mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm md:text-base font-medium text-gray-800">Address</p>
                    <p className="text-sm md:text-base text-gray-600">
                      123 Gem Street, Ratnapura, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image replacing the form */}
            <div className="relative aspect-square w-full h-auto rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/images/j1.jpg"
                alt="Master Gemologist"
                className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;