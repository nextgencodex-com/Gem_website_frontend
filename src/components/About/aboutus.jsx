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
<section className="relative bg-gradient-to-b from-gray-50 to-white py-24 overflow-hidden">

  {/* Subtle Background Pattern */}
  <div className="absolute inset-0 opacity-[0.02]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z' fill='%23000000'/%3E%3C/svg%3E")`,
        backgroundSize: "60px 60px",
      }}
    />
  </div>

  <div className="max-w-7xl mx-auto px-6 relative">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* LEFT CONTENT */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-px bg-[#bf9b30]"></div>
          <span className="text-sm font-medium text-gray-500 tracking-widest uppercase">
            Since 1999
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          About <span className="text-[#bf9b30]">Us</span>
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
          Three generations of gem expertise rooted in Sri Lanka's rich heritage.
          We craft, source, and deliver ethically sourced Ceylon gemstones with
          unmatched brilliance, transparency, and trust.
        </p>

        
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">
        <div className="relative rounded-lg overflow-hidden shadow-xl">
          <img
            src="/images/cc.jpg"
            alt="Ceylon Gems Collection"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>

        {/* Accent Border */}
        <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#bf9b30]/20 rounded-lg -z-10"></div>
      </div>

    </div>
  </div>
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
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-10">
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