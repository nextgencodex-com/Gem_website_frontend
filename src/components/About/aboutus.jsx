const AboutUs = () => {
  return (
    <main className="bg-black min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle background pattern - now white dots */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Hero Section - Exact same as Contact Us */}
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center overflow-hidden bg-black -mt-20 mb-16">
        <img
          src="/images/Ab.webp"
          alt="Luxury Gemstones About Us"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 space-y-6 px-6 lg:px-12 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl text-white font-bold mb-4 relative">
            About Us
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/30" />
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Crafting timeless elegance with exceptional artistry, bringing you 
            the finest jewelry that celebrates life's precious moments.
          </p>
        </div>
      </div>

      {/* Rest of your About Us content remains exactly the same */}
      <div className="max-w-7xl mx-auto relative">
        {/* Section 1: Our Story */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-28">
          <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/Log 1.webp"
              alt="Our jewelry story"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-4xl text-white font-bold">
              Our Story
            </h2>
            <p className="font-serif text-gray-400 leading-relaxed text-lg">
              Founded in the heart of the city, our journey began with a simple passion 
              for creating exquisite jewelry that tells a story. What started as a small 
              family workshop has blossomed into a destination for those who appreciate 
              fine craftsmanship and timeless design. Each piece we create carries forward 
              generations of expertise and an unwavering commitment to beauty.
            </p>
            <div className="flex gap-4 pt-4">
              {['1985', 'Tradition', 'Excellence'].map((item, i) => (
                <div key={i} className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-gray-300 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: What We Offer */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-28">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-4xl text-white font-bold mb-8">
              What We Offer
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-white/60 text-xl">✦</span>
                <span className="text-gray-400">
                  <span className="font-semibold text-white">Fine Jewelry:</span> Exquisite diamonds, gemstones, and precious metals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/60 text-xl">✦</span>
                <span className="text-gray-400">
                  <span className="font-semibold text-white">Wedding Collections:</span> Timeless engagement rings and bridal sets
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/60 text-xl">✦</span>
                <span className="text-gray-400">
                  <span className="font-semibold text-white">Custom Design:</span> Bring your vision to life with our artisans
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/60 text-xl">✦</span>
                <span className="text-gray-400">
                  <span className="font-semibold text-white">Vintage Revival:</span> Restored heirloom pieces with modern touches
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/60 text-xl">✦</span>
                <span className="text-gray-400">
                  <span className="font-semibold text-white">Everyday Elegance:</span> Minimalist designs for daily wear
                </span>
              </li>
            </ul>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl order-1 md:order-2">
            <img
              src="/images/i2.jpg"
              alt="What we offer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </section>

        {/* Section 3: Our Promise - FIXED ICONS WITH BETTER VISIBILITY */}
        <section className="mb-28">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-white font-bold">
              Our Promise
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Premium Quality Material */}
            <div className="group text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-white/10 border border-white/20 group-hover:border-white/40 group-hover:bg-white/15 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" fill="none"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-lg text-white font-bold mb-2">
                Premium Quality Material
              </h3>
              <p className="text-gray-400 text-sm">
                Only the finest metals and gems
              </p>
            </div>

            {/* Affordable Luxury */}
            <div className="group text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-white/10 border border-white/20 group-hover:border-white/40 group-hover:bg-white/15 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 2v20M17 5H9.5C7.8 5 6 6.5 6 9c0 2.5 2 4 4 4h4c2 0 4 1.5 4 4 0 2.5-1.8 4-3.5 4H6" stroke="white" fill="none"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-lg text-white font-bold mb-2">
                Affordable Luxury
              </h3>
              <p className="text-gray-400 text-sm">
                Exceptional value for timeless pieces
              </p>
            </div>

            {/* Fast & Reliable Delivery */}
            <div className="group text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-white/10 border border-white/20 group-hover:border-white/40 group-hover:bg-white/15 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="7" cy="17" r="2" stroke="white" fill="none"/>
                    <circle cx="17" cy="17" r="2" stroke="white" fill="none"/>
                    <path d="M3 11h4l3-5h8l2 5h3" stroke="white" fill="none"/>
                    <path d="M3 11v6h2M19 11v6h-2" stroke="white" fill="none"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-lg text-white font-bold mb-2">
                Fast & Reliable Delivery
              </h3>
              <p className="text-gray-400 text-sm">
                Secure shipping worldwide
              </p>
            </div>

            {/* Customer Satisfaction Guarantee */}
            <div className="group text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-white/10 border border-white/20 group-hover:border-white/40 group-hover:bg-white/15 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" fill="none"/>
                    <path d="M9 12l2 2 4-4" stroke="white" fill="none"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-lg text-white font-bold mb-2">
                Customer Satisfaction Guarantee
              </h3>
              <p className="text-gray-400 text-sm">
                100% happiness guaranteed
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Why Choose Us */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-28">
          <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/i3.jpg"
              alt="Why choose us"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div>
            <h2 className="font-serif text-4xl text-white font-bold mb-8">
              Why Choose Us
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:shadow-md transition-all duration-300">
                <span className="text-white/60 text-xl">✦</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Heritage Craftsmanship</h4>
                  <p className="text-gray-400 text-sm">Three generations of master artisans</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:shadow-md transition-all duration-300">
                <span className="text-white/60 text-xl">✦</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Certified Authentic</h4>
                  <p className="text-gray-400 text-sm">All diamonds and gemstones are IGI/HRD certified</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:shadow-md transition-all duration-300">
                <span className="text-white/60 text-xl">✦</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Lifetime Service</h4>
                  <p className="text-gray-400 text-sm">Free cleaning, polishing, and inspections</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:shadow-md transition-all duration-300">
                <span className="text-white/60 text-xl">✦</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Secure Shopping</h4>
                  <p className="text-gray-400 text-sm">100% insured shipping and easy returns</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:shadow-md transition-all duration-300">
                <span className="text-white/60 text-xl">✦</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Personalized Service</h4>
                  <p className="text-gray-400 text-sm">Dedicated consultant for every client</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Our Vision */}
        <section className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl blur-xl bg-white/5" />
            <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 shadow-xl">
              <h2 className="font-serif text-4xl text-white font-bold mb-6 text-center">
                Our Vision
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed text-center">
                To become the world's most trusted jewelry destination, where every piece tells 
                a unique story and creates lasting memories. We envision a future where fine 
                jewelry is accessible, sustainable, and continues to celebrate life's most 
                precious moments across generations.
              </p>
              <div className="flex justify-center gap-3 mt-8">
                <span className="w-2 h-2 rounded-full bg-white/40"></span>
                <span className="w-2 h-2 rounded-full bg-white/40"></span>
                <span className="w-2 h-2 rounded-full bg-white/40"></span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;