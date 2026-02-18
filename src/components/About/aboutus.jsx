// src/components/About/aboutus.jsx

const AboutUs = () => {
  const brandColor = "#C5A33E";
  const brandLight = "rgba(197, 163, 62, 0.08)";
  const brandMedium = "rgba(197, 163, 62, 0.15)";

  return (
    <main className="bg-[#f8f4ed] min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(${brandColor}10 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header Section - Centered */}
        <div className="text-center mb-16 relative">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 border bg-white/60 backdrop-blur-sm"
            style={{ 
              color: brandColor,
              borderColor: brandMedium
            }}
          >
            ✦ Welcome to Elegance ✦
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4 relative">
            About Us
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-0.5"
              style={{ background: `linear-gradient(90deg, transparent, ${brandColor}, transparent)` }}
            />
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Crafting timeless elegance with exceptional artistry, bringing you 
            the finest jewelry that celebrates life's precious moments.
          </p>
        </div>

        {/* Hero Video Section */}
        <div className="mb-24">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-1 rounded-3xl blur-md opacity-50"
              style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor}80)` }}
            />
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                loop 
                playsInline
                poster="/images/jewelry-poster.jpg"
              >
                <source src="/videos/jewelry-showcase.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2 border"
                style={{ borderColor: brandMedium }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: brandColor }} />
                <span style={{ color: brandColor }}>Craftsmanship in motion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Our Story */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-28">
          <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/our-story.jpg"
              alt="Our jewelry story"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider" style={{ color: brandColor }}>Our Journey</span>
            <h2 className="font-serif text-4xl text-gray-800">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Founded in the heart of the city, our journey began with a simple passion 
              for creating exquisite jewelry that tells a story. What started as a small 
              family workshop has blossomed into a destination for those who appreciate 
              fine craftsmanship and timeless design. Each piece we create carries forward 
              generations of expertise and an unwavering commitment to beauty.
            </p>
            <div className="flex gap-4 pt-4">
              {['1985', 'Tradition', 'Excellence'].map((item, i) => (
                <div key={i} className="px-4 py-2 bg-white/60 rounded-lg border text-sm"
                  style={{ borderColor: brandLight }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: What We Offer */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-28">
          <div className="order-2 md:order-1">
            <span className="text-sm uppercase tracking-wider block mb-6" style={{ color: brandColor }}>Our Collection</span>
            <h2 className="font-serif text-4xl text-gray-800 mb-8">
              What We Offer
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span style={{ color: brandColor }} className="text-xl">✦</span>
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-800">Fine Jewelry:</span> Exquisite diamonds, gemstones, and precious metals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: brandColor }} className="text-xl">✦</span>
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-800">Wedding Collections:</span> Timeless engagement rings and bridal sets
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: brandColor }} className="text-xl">✦</span>
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-800">Custom Design:</span> Bring your vision to life with our artisans
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: brandColor }} className="text-xl">✦</span>
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-800">Vintage Revival:</span> Restored heirloom pieces with modern touches
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: brandColor }} className="text-xl">✦</span>
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-800">Everyday Elegance:</span> Minimalist designs for daily wear
                </span>
              </li>
            </ul>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl order-1 md:order-2">
            <img
              src="/images/what-we-offer.jpg"
              alt="What we offer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </section>

        {/* Section 3: Our Promise */}
        <section className="mb-28">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 border bg-white/60 backdrop-blur-sm"
              style={{ color: brandColor, borderColor: brandMedium }}
            >
              ✦ Our Commitment ✦
            </span>
            <h2 className="font-serif text-4xl text-gray-800">
              Our Promise
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Premium Quality Material", 
                desc: "Only the finest metals and gems"
              },
              { 
                title: "Affordable Luxury", 
                desc: "Exceptional value for timeless pieces"
              },
              { 
                title: "Fast & Reliable Delivery", 
                desc: "Secure shipping worldwide"
              },
              { 
                title: "Customer Satisfaction Guarantee", 
                desc: "100% happiness guaranteed"
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 shadow-md">
                  <img
                    src={`/images/${item.title.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-lg text-gray-800 mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Why Choose Us */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-28">
          <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/why-choose-us.jpg"
              alt="Why choose us"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div>
            <span className="text-sm uppercase tracking-wider block mb-6" style={{ color: brandColor }}>Why We're Different</span>
            <h2 className="font-serif text-4xl text-gray-800 mb-8">
              Why Choose Us
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-transparent hover:bg-white hover:shadow-md transition-all duration-300">
                <span className="text-xl" style={{ color: brandColor }}>✦</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Heritage Craftsmanship</h4>
                  <p className="text-gray-500 text-sm">Three generations of master artisans</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-transparent hover:bg-white hover:shadow-md transition-all duration-300">
                <span className="text-xl" style={{ color: brandColor }}>✦</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Certified Authentic</h4>
                  <p className="text-gray-500 text-sm">All diamonds and gemstones are IGI/HRD certified</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-transparent hover:bg-white hover:shadow-md transition-all duration-300">
                <span className="text-xl" style={{ color: brandColor }}>✦</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Lifetime Service</h4>
                  <p className="text-gray-500 text-sm">Free cleaning, polishing, and inspections</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-transparent hover:bg-white hover:shadow-md transition-all duration-300">
                <span className="text-xl" style={{ color: brandColor }}>✦</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Secure Shopping</h4>
                  <p className="text-gray-500 text-sm">100% insured shipping and easy returns</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-transparent hover:bg-white hover:shadow-md transition-all duration-300">
                <span className="text-xl" style={{ color: brandColor }}>✦</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Personalized Service</h4>
                  <p className="text-gray-500 text-sm">Dedicated consultant for every client</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Our Vision */}
        <section className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl blur-xl"
              style={{ background: `linear-gradient(135deg, ${brandColor}20, ${brandColor}05)` }}
            />
            <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-12 border shadow-xl"
              style={{ borderColor: brandLight }}
            >
              <h2 className="font-serif text-4xl text-gray-800 mb-6 text-center">
                Our Vision
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed text-center">
                To become the world's most trusted jewelry destination, where every piece tells 
                a unique story and creates lasting memories. We envision a future where fine 
                jewelry is accessible, sustainable, and continues to celebrate life's most 
                precious moments across generations.
              </p>
              <div className="flex justify-center gap-3 mt-8">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }}></span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }}></span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }}></span>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    </main>
  );
};

export default AboutUs;