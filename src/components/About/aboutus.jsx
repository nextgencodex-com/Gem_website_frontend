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
    },
    {
      id: 2,
      year: "2005",
      title: "First Export",
      description:
        "Achieved our first international export of Ceylon Sapphires to European markets, marking the beginning of our global presence.",
    },
    {
      id: 3,
      year: "2010",
      title: "Business Expansion",
      description:
        "Established direct partnerships with mines in Ratnapura and Elahera, ensuring consistent supply of premium quality gems.",
    },
    {
      id: 4,
      year: "2015",
      title: "Global Recognition",
      description:
        "Received international recognition for quality and ethical sourcing practices, expanding to North American and Asian markets.",
    },
    {
      id: 5,
      year: "2025",
      title: "Digital Transformation",
      description:
        "Launched online platform, bringing Ceylon gems directly to collectors worldwide while maintaining personal service standards.",
    },
  ];

  const visionMissionData = [
    {
      title: "Our Vision",
      description:
        "To Bring Sri Lanka's Finest Gems To The Global Stage, Showcasing The Unparalleled Beauty And Quality Of Ceylon's Precious Stones To Collectors And Enthusiasts Worldwide.",
      imageSrc: "/images/light.png",
      imageAlt: "Light bulb",
    },
    {
      title: "Our Mission",
      description:
        "To Provide Authentic, Ethically Sourced Gems With Transparency And Trust, Ensuring Every Client Receives Not Just A Precious Stone, But A Piece Of Sri Lankan Heritage.",
      imageSrc: "/images/mission.png",
      imageAlt: "Mission icon",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-[Poppins]">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <img
          src="/images/cc.jpg"
          alt="About Us Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
        <div className="relative z-20 space-y-4 px-6 lg:px-12 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-2">
            About Us
          </h1>
          <h2 className="text-lg md:text-xl font-semibold">
            Three Generations Of Gem Excellence
          </h2>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed left-6 bottom-6 z-20">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300"
          onClick={() => window.open("https://wa.me/94759627589", "_blank")}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          <span className="text-sm font-medium">WhatsApp</span>
        </button>
      </div>

      {/* Heritage Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#bf9b30] mb-4">
              Our Heritage & Companies
            </h2>
            <div className="w-24 h-1 bg-[#00B9B3] mx-auto rounded-full"></div>
          </div>
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="bg-[#f8f4ed] rounded-2xl text-black p-8 md:p-12 shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <p className="text-md text-center leading-relaxed">
                Ceycarb Is A Global Leader In Activated Carbon Solutions, Offering
                High-quality Products Made From Coconut Shell, Coal, And Wood. With
                Decades Of Experience And A Strong Focus On Sustainability, We Serve
                Diverse Industries Worldwide With Innovative Purification
                Technologies.
                <br /><br />
                Building On This Legacy, Ceygem Was Founded To Showcase Sri
                Lanka's World-renowned Blue Sapphires. We Provide Ethically
                Sourced, Certified Ceylon Sapphires Celebrated For Their Vibrant
                Color And Clarity.
                <br /><br />
                Together, Ceycarb And Ceygem Reflect A Shared Commitment To Quality,
                Integrity, And Sustainability Purifying The World And Illuminating
                It With Natural Brilliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Journey Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#bf9b30] mb-4">
              Our Business Journey
            </h2>
            <div className="w-24 h-1 bg-[#00B9B3] mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            {timelineItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-shrink-0 mb-6 md:mb-0">
                  <div className="w-28 h-28 bg-[#bf9b30] flex items-center justify-center text-white font-bold text-2xl rounded-full border border-black shadow-sm hover:shadow-md transform hover:scale-[1.05] transition-all duration-200 cursor-pointer">
                    {item.year}
                  </div>
                </div>
                <div className={`flex-1 ${index % 2 === 0 ? "md:ml-8" : "md:mr-8"}`}>
                  <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
                      {item.title}
                    </h3>
                    <p className="text-md text-gray-600 leading-relaxed text-center md:text-left">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 px-4 bg-[#f8f4ed] text-black">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#bf9b30] font-bold mb-4">
              Our Vision & Mission
            </h2>
            <div className="w-24 h-1 bg-[#00B9B3] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {visionMissionData.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <h3 className="text-xl font-bold mb-6">{item.title}</h3>
                <img
                  className="w-32 h-32 bg-[#00B9B3] rounded-2xl mx-auto mb-6 object-contain"
                  alt={item.imageAlt}
                  src={item.imageSrc}
                />
                <p className="text-mg leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#bf9b30] mb-4">
              Meet Our Founder
            </h2>
            <div className="w-24 h-1 bg-[#00B9B3]  mx-auto rounded-full"></div>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  className="w-full max-w-md mx-auto rounded-2xl shadow-lg object-cover transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  alt="Anura Perera - Founder"
                  src="/images/ff.png"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                  <h3 className="text-xl font-bold text-[#bf9b30] mb-2 text-center">
                    Anura Perera
                  </h3>
                  <p className="text-mg text-black italic mb-6 text-center">
                    Master Gemologist & Founder
                  </p>
                  <p className="text-mg text-gray-600 mb-8 leading-relaxed">
                    As A Third-generation Gemologist, I Am Passionate About Sharing
                    Sri Lanka's Gem Heritage With The World. My Expertise
                    Ensures Every Gem Meets The Highest Standards Of Quality And
                    Authenticity.
                  </p>
                  <div className="bg-[#f8f4ed] border-l-4 border-[#00B9B3] p-6 rounded-r-lg">
                    <blockquote className="text-mg italic text-gray-700">
                      "Every Gem Tells A Story Of Millions Of Years In The
                      Making. Our Role Is To Honor That Story And Ensure It Reaches
                      Those Who Truly Appreciate Its Beauty."
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certified Excellence Section */}
      <section className="py-16 px-4 bg-[#f8f4ed]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#bf9b30] mb-4">
              Certified Excellence
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 cursor-pointer p-6 text-center"
              >
                <img
                  className="w-24 h-24 mx-auto mb-4 object-contain"
                  alt="Certification icon"
                  src={cert.image}
                />
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {cert.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
