import React from "react";

const AboutUs = () => {
  const certifications = [
    { id: 1, image: "/images/diamond.gif", title: "NGJA Certified" },
    { id: 2, image: "/images/user.gif", title: "GIA Member" },
    { id: 3, image: "/images/privacy-policy.gif", title: "ETHICAL Sourcing" },
  ];

  const timelineItems = [
    {
      id: 1,
      year: "1999",
      title: "The Beginning",
      description:
        "Anura Perera started his journey at age 18, learning the ancient art of gem cutting from his father in Ratnapura, the gem capital of Sri Lanka.",
      highlight: "Founded"
    },
    {
      id: 2,
      year: "2005",
      title: "First Export",
      description:
        "Achieved our first international export of Ceylon Sapphires to European markets, marking the beginning of our global presence.",
      highlight: "Global Reach"
    },
    {
      id: 3,
      year: "2010",
      title: "Business Expansion",
      description:
        "Established direct partnerships with mines in Ratnapura and Elahera, ensuring consistent supply of premium quality gems.",
      highlight: "Partnerships"
    },
    {
      id: 4,
      year: "2015",
      title: "Global Recognition",
      description:
        "Received international recognition for quality and ethical sourcing practices, expanding to North American and Asian markets.",
      highlight: "Awards"
    },
    {
      id: 5,
      year: "2025",
      title: "Digital Transformation",
      description:
        "Launched online platform, bringing Ceylon gems directly to collectors worldwide while maintaining personal service standards.",
      highlight: "Innovation"
    },
  ];

  const visionMissionData = [
    {
      title: "Our Vision",
      description:
        "To Bring Sri Lanka's Finest Gems To The Global Stage, Showcasing The Unparalleled Beauty And Quality Of Ceylon's Precious Stones To Collectors And Enthusiasts Worldwide.",
      imageSrc: "/images/light.png",
      imageAlt: "Vision",
      points: [
        "Global recognition of Ceylon gemstones",
        "Preservation of traditional craftsmanship",
        "Setting industry standards for quality"
      ]
    },
    {
      title: "Our Mission",
      description:
        "To Provide Authentic, Ethically Sourced Gems With Transparency And Trust, Ensuring Every Client Receives Not Just A Precious Stone, But A Piece Of Sri Lankan Heritage.",
      imageSrc: "/images/mission.png",
      imageAlt: "Mission",
      points: [
        "Ethical sourcing from verified mines",
        "100% certified and traceable gems",
        "Personalized client relationships"
      ]
    },
  ];
  return (
    <div className="bg-white min-h-screen font-[Poppins]">
 
{/* ================= HERO SECTION ================= */}
 
<section className="relative bg-[#f0ede8] min-h-screen overflow-hidden">
  {/* Uncommon Background - Wabi Sabi Texture */}
  <div className="absolute inset-0">
    {/* Handmade paper texture */}
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.2'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat'
    }} />
    
    {/* Raw ink strokes */}
    <div className="absolute top-40 left-20 w-64 h-64 opacity-10">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path d="M20,100 Q50,20 100,20 Q150,20 180,100 Q150,180 100,180 Q50,180 20,100" 
          fill="none" stroke="#bf9b30" strokeWidth="3" strokeDasharray="5,5"/>
      </svg>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-6 relative min-h-screen flex items-center py-20">
    {/* Unconventional Asymmetrical Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      
      {/* LEFT - Deconstructed Content */}
      <div className="lg:col-span-5 relative z-10 order-2 lg:order-1 mt-12 lg:mt-0">
        {/* Raw edge badge */}
        <div className="relative mb-12">
          <div className="absolute -left-6 top-1/2 w-12 h-[2px] bg-[#bf9b30]/40 -rotate-45"></div>
          <span className="text-[10px] font-mono text-gray-400 tracking-[0.3em] relative z-10 pl-4">
            E S T. 1 9 9 9
          </span>
        </div>

        {/* Deconstructed Typography */}
        <div className="relative mb-12">
          {/* Background fragment */}
          <div className="absolute -top-8 -left-4 text-[120px] font-black text-[#bf9b30]/5 select-none">
            {}
          </div>
          
          <h1 className="relative">
            <span className="block text-7xl font-light text-gray-900 tracking-tight mb-2 opacity-90 hover:opacity-100 transition-opacity">
              <span className="inline-block transform -rotate-1">A</span>
              <span className="inline-block transform rotate-2">b</span>
              <span className="inline-block transform -rotate-1">o</span>
              <span className="inline-block transform rotate-1">u</span>
              <span className="inline-block transform -rotate-2">t</span>
            </span>
            <span className="relative">
              <span className="text-8xl font-black text-[#bf9b30] tracking-tighter inline-block transform skew-x-12 hover:skew-x-0 transition-transform duration-500">
                US
              </span>
              <span className="absolute -bottom-2 left-0 w-24 h-1 bg-[#bf9b30]/30"></span>
              <span className="absolute -bottom-2 left-28 w-12 h-1 bg-[#bf9b30]/10"></span>
            </span>
          </h1>
        </div>

        {/* Unconventional description block */}
        <div className="relative mb-16 pl-8">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-[#bf9b30] via-[#bf9b30]/30 to-transparent"></div>
          
          <p className="text-gray-600 text-base leading-relaxed font-light max-w-sm italic">
            "Three generations. One island. 
            <span className="block text-gray-800 font-medium not-italic mt-3">
              Crafting Ceylon's soul into every gem.
            </span>"
          </p>
          
          {/* Signature element */}
          <div className="mt-4 font-serif text-2xl text-[#bf9b30]/30 select-none">
            〜
          </div>
        </div>

        {/* Deconstructed stats */}
        <div className="flex flex-col gap-6 mb-16 max-w-xs">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 border border-[#bf9b30]/30 rounded-full flex items-center justify-center group-hover:border-[#bf9b30] transition-colors">
              <span className="text-lg font-light text-gray-700">24</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[#bf9b30]/50 to-transparent"></div>
            <span className="text-xs text-gray-400 tracking-widest">YEARS</span>
          </div>
          
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 border border-[#bf9b30]/30 rounded-full flex items-center justify-center group-hover:border-[#bf9b30] transition-colors">
              <span className="text-lg font-light text-gray-700">3</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[#bf9b30]/50 to-transparent"></div>
            <span className="text-xs text-gray-400 tracking-widest">GENS</span>
          </div>
          
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 border border-[#bf9b30]/30 rounded-full flex items-center justify-center group-hover:border-[#bf9b30] transition-colors">
              <span className="text-lg font-light text-gray-700">100</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[#bf9b30]/50 to-transparent"></div>
            <span className="text-xs text-gray-400 tracking-widest">ETHICAL</span>
          </div>
        </div>

        {/* Uncommon button style */}
        <button className="group relative px-0 py-2 overflow-hidden bg-transparent">
          <span className="text-sm tracking-[0.3em] text-gray-700 group-hover:text-[#bf9b30] transition-colors duration-300">
            DISCOVER MORE
          </span>
          <span className="absolute bottom-0 left-0 w-full h-px bg-[#bf9b30] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-300">
            →
          </span>
        </button>
      </div>

      {/* RIGHT - Hero Image - Fully Visible, Uncommon Presentation */}
      <div className="lg:col-span-7 relative order-1 lg:order-2">
        {/* Unconventional image container */}
        <div className="relative pl-0 lg:pl-12">
          {/* Floating frame - doesn't touch image */}
          <div className="absolute -top-6 -left-6 lg:-left-6 w-48 h-48 border-2 border-[#bf9b30]/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute -bottom-6 -right-6 w-64 h-64 border border-[#bf9b30]/10 rounded-[70%_30%_50%_50%/30%_40%_60%_70%] animate-[spin_25s_linear_infinite_reverse]"></div>
          
          {/* Main image - pure and fully visible */}
          <div className="relative z-10">
            <img 
              src="/images/cc.jpg" 
              alt="Ceylon Gemstones" 
              className="w-full h-auto object-contain max-h-[550px] rounded-[40%_60%_40%_60%/60%_40%_60%_40%] shadow-2xl"
            />
            
            {/* Minimal corner markers - away from image */}
            <div className="absolute -top-3 -right-3 w-12 h-12">
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#bf9b30]/40"></div>
            </div>
            <div className="absolute -bottom-3 -left-3 w-12 h-12">
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#bf9b30]/40"></div>
            </div>
          </div>

          {/* Floating elements - positioned completely away from image */}
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <div className="relative">
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#bf9b30]/30 to-transparent"></div>
              <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-xs text-gray-400 rotate-90 origin-left whitespace-nowrap tracking-[0.3em]">
                HANDCRAFTED
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Uncommon bottom navigation */}
    <div className="absolute bottom-8 left-0 right-0 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-end">
        {/* Left - Zen element */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-300 font-mono">(01)</span>
          <div className="w-16 h-px bg-[#bf9b30]/30"></div>
          <span className="text-[10px] text-gray-400 tracking-[0.3em]">HERITAGE</span>
        </div>
        
        {/* Center - Minimal pagination */}
        <div className="flex gap-6">
          <span className="text-xs text-gray-300 cursor-pointer hover:text-[#bf9b30] transition-colors">●</span>
          <span className="text-xs text-gray-300 cursor-pointer hover:text-[#bf9b30] transition-colors">○</span>
          <span className="text-xs text-gray-300 cursor-pointer hover:text-[#bf9b30] transition-colors">○</span>
        </div>
        
        {/* Right - Year */}
        <div className="text-right">
          <span className="text-2xl font-serif text-[#bf9b30]/30">'99</span>
        </div>
      </div>
    </div>
  </div>

  {/* Raw edge corner elements */}
  <div className="absolute top-0 left-0 w-20 h-20">
    <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#bf9b30]/30"></div>
  </div>
  <div className="absolute bottom-0 right-0 w-20 h-20">
    <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#bf9b30]/30"></div>
  </div>

  <style jsx>{`
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}</style>
</section>


      {/* =================  HERITAGE SECTION ================= */}
      <section className="py-20 bg-[#f8f4ed] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#bf9b30] mb-4">Our Heritage & Legacy</h2>
            <div className="w-24 h-1 bg-[#bf9b30] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Building on generations of expertise, we continue a legacy of excellence in gemology
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#bf9b30]">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Ceycarb</h3>
                <p className="text-gray-600 mb-4">
                  A global leader in activated carbon solutions, serving industries worldwide with sustainable purification technologies. Our expertise in material science formed the foundation of our gemstone operations.
                </p>
                <div className="flex items-center text-sm text-[#bf9b30] font-medium">
                  <span className="mr-2">●</span>
                  <span>Established 1985</span>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#bf9b30]">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Ceygem</h3>
                <p className="text-gray-600 mb-4">
                  Born from this legacy, Ceygem showcases Sri Lanka's world-renowned Ceylon Sapphires. Each gem reflects our commitment to ethical sourcing, certification, and preserving traditional craftsmanship.
                </p>
                <div className="flex items-center text-sm text-[#bf9b30] font-medium">
                  <span className="mr-2">●</span>
                  <span>Founded 1999</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Values</h3>
              <div className="space-y-6">
                {[
                  { title: "Tradition", desc: "Preserving centuries-old gem cutting techniques" },
                  { title: "Integrity", desc: "Transparent sourcing and fair trade practices" },
                  { title: "Quality", desc: "Uncompromising standards in every gem" },
                  { title: "Innovation", desc: "Modern techniques enhancing traditional craft" }
                ].map((value, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#f8f4ed] rounded-lg flex items-center justify-center">
                      <span className="text-[#bf9b30] font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">{value.title}</h4>
                      <p className="text-gray-600 text-sm">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================  BUSINESS JOURNEY ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#bf9b30] mb-4">Our Business Journey</h2>
            <div className="w-24 h-1 bg-[#bf9b30] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Milestones that shaped our journey from a small family business to an internationally recognized gemstone authority
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#bf9b30] via-[#bf9b30]/80 to-[#bf9b30]"></div>
            
            {timelineItems.map((item, index) => (
              <div key={item.id} className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start mb-16`}>
                {/* Year circle */}
                <div className="relative z-10 flex-shrink-0 w-20 h-20 bg-[#bf9b30] text-white flex flex-col items-center justify-center rounded-full font-bold shadow-lg mx-8">
                  <div className="text-sm font-normal">Year</div>
                  <div className="text-xl">{item.year}</div>
                </div>
                
                {/* Content card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'} mt-2 md:mt-0`}>
                  <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-[#f8f4ed] text-[#bf9b30] text-sm font-medium rounded-full">
                        {item.highlight}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 rounded-full bg-[#bf9b30] mr-2"></div>
                      <span>Milestone Achieved</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================   VISION & MISSION ================= */}
      <section className="py-20 bg-[#f8f4ed] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#bf9b30] mb-4">Vision & Mission</h2>
            <div className="w-24 h-1 bg-[#bf9b30] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Guiding principles that define our purpose and direction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {visionMissionData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden h-full flex flex-col"
              >
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                    <div className="w-20 h-20 bg-[#bf9b30]/10 rounded-full flex items-center justify-center shadow-md ring-2 ring-[#bf9b30]/40">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="w-14 h-14 object-contain drop-shadow-md contrast-125 saturate-150"
                      />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-bold text-gray-800 mb-4">Key Focus Areas:</h4>
                    <ul className="space-y-3">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-[#bf9b30]/10 rounded-full flex items-center justify-center mr-3 mt-1">
                            <div className="w-2 h-2 rounded-full bg-[#bf9b30]"></div>
                          </div>
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-[#bf9b30] h-1"></div>
              </div>
            ))}
          </div>
          
          {/* Combined Purpose Statement */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-10 border border-gray-100">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Combined Purpose</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Through our vision to showcase Sri Lanka's finest gems globally and our mission 
                to provide authentic, ethically sourced stones, we create lasting value that 
                honors our heritage while building trust with collectors worldwide.
              </p>
              <div className="mt-8 flex items-center justify-center">
                <div className="w-32 h-px bg-[#bf9b30]"></div>
                <span className="mx-4 text-[#bf9b30] font-medium">●</span>
                <div className="w-32 h-px bg-[#bf9b30]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* ================= FOUNDER ================= */}
<section className="py-24 px-6 bg-white">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

    {/* IMAGE */}
    <div className="relative">
      <img
        src="/images/ff.png"
        alt="Founder"
        className="rounded-lg shadow-md"
      />

      {/* Subtle Accent */}
      <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#bf9b30]/30 rounded-lg -z-10"></div>
    </div>

    {/* CONTENT */}
    <div>
      <span className="block text-sm tracking-widest uppercase text-[#bf9b30] mb-3">
        Founder
      </span>

      <h2 className="text-3xl font-semibold text-gray-900 mb-2">
        Anura Perera
      </h2>

      <p className="text-gray-500 italic mb-8">
        Third-Generation Gemologist
      </p>

      <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
        With over two decades of experience, Anura Perera represents the
        continuity of Sri Lanka’s gemstone heritage. His work blends traditional
        craftsmanship with modern ethical standards, ensuring each gem reflects
        authenticity, provenance, and lasting value.
      </p>

      <blockquote className="border-l-2 border-[#bf9b30] pl-6 text-gray-700 italic mb-10 max-w-xl">
        “Every gemstone carries millions of years of history. Our role is to
        preserve its integrity and meaning.”
      </blockquote>

      {/* STATS */}
      <div className="flex gap-12">
        <div>
          <div className="text-2xl font-semibold text-gray-900">25+</div>
          <div className="text-sm text-gray-500">Years of Experience</div>
        </div>

        <div>
          <div className="text-2xl font-semibold text-gray-900">1000+</div>
          <div className="text-sm text-gray-500">Certified Gems</div>
        </div>
      </div>
    </div>

  </div>
</section>


      {/* ================= CERTIFICATIONS ================= */}
      <section className="py-20 bg-[#f8f4ed] px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#bf9b30] mb-4">Our Certifications</h2>
            <div className="w-24 h-1 bg-[#bf9b30] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Internationally recognized certifications that guarantee authenticity and ethical standards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center group"
              >
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto bg-[#f8f4ed] rounded-full flex items-center justify-center group-hover:bg-[#bf9b30]/10 transition-colors duration-300">
                    <img src={cert.image} alt={cert.title} className="w-16 h-16" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{cert.title}</h3>
                <p className="text-gray-600 text-sm">
                  Internationally recognized standard for quality assurance and ethical practices
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="inline-flex items-center text-[#bf9b30] font-medium">
                    <span className="mr-2">●</span>
                    <span>Certified & Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;