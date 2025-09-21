import React from "react";



// UI Components
const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 md:p-6 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, className = "", ...props }) => (
  <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({ children, className = "", variant = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90";
  
  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Blog = () => {
  return (
    <div className="relative w-full bg-[#f8f9fa] overflow-x-hidden font-[Poppins]">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <img
          src="/images/gu.jpg"
          alt="Sri Lankan Gem Journey"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
        <div className="relative z-20 space-y-4 px-6 lg:px-12 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-4 md:mb-6">
            The Gem Journey
          </h1>
          <h2 className="text-lg md:text-xl font-semibold text-white">
            From Mine To Masterpiece
          </h2>
        </div>
      </div>
      {/* WhatsApp Button (Home page style, single consistent version) */}
      <div className="fixed left-6 bottom-6 z-20">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300"
          onClick={() => window.open('https://wa.me/94759627589', '_blank')}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          <span className="text-sm font-medium">WhatsApp</span>
        </button>
      </div>

      {/* Main content */}
      <div className="relative w-full py-8 md:py-16">
        {/* Radial gradient background */}
        <div className="absolute w-full h-full left-0 bg-[#f8f4ed] opacity-50" />

        {/* The Sri Lankan Gem Legacy */}
        <section className="relative container mx-auto px-4 sm:px-6">
          <div className="w-full flex flex-col items-center pt-8 md:pt-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#bf9b30] text-center">
              The Sri Lankan Gem Legacy
            </h2>
            <div className="w-16 h-1 bg-[#00B9B3] mb-6 md:mb-8"></div>
            </div>

          {/* Description card */}
          <div className="w-full flex justify-center mt-8 md:mt-12">
            <Card className="w-full max-w-4xl lg:max-w-6xl xl:max-w-[1736px] shadow-[5px_10px_25px_#00000040] rounded-lg md:rounded-xl lg:rounded-[21px]">
              <CardContent className="p-6 md:p-12 lg:p-[85px_104px]">
                <p className="text-lg text-black text-center leading-relaxed">
                  Sri Lanka's and Worldwide Gem Industry Is A Blend Of Ancient Tradition
                  And Modern Precision, Producing World-renowned Ceylon
                  Sapphires, Rubies, And More. Sudharman Samarakoon, With Over 25 Years
                  Of Expertise, Personally Oversees Each Stage From Mining In
                  Ratnapura To Delivering Certified Gems To Global Clients.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The Journey Of Excellence */}
        <section className="relative container bg-[#f8f4ed] mx-auto px-4 sm:px-6 mt-12 md:mt-16">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-5xl font-bold text-[#bf9b30] text-center">
              The Journey Of Excellence
            </h2>
            <div className="w-[150px] sm:w-[180px] md:w-[216px] h-2 md:h-3 mt-4 md:mt-6 rounded-full bg-[#00B9B3]" />
          </div>

          {/* Process Steps */}
          <div className="space-y-16 md:space-y-24 mt-12 md:mt-16">
            {/* Step 1: Gem Mining */}
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2 h-[300px] md:h-[400px]">
                <img
                  className="w-full h-full rounded-lg object-cover"
                  alt="Gem mining in Sri Lanka"
                  src="/images/s1.jpg"
                />
              </div>

              <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
                <div className="w-[180px] sm:w-[200px] md:w-[239px] h-[60px] sm:h-[70px] md:h-[88px] bg-[#bf9b30] rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    Step 1
                  </span>
                </div>

                <h3 className="text-xl font-bold text-black">
                  Gem Mining
                </h3>

                <p className="text-lg text-black leading-relaxed">
                  The Journey Begins In Sri Lanka's Gem-rich Regions Like
                  Ratnapura And Elahera. Miners Use Traditional Methods, Such As Pit
                  Mining And River Panning, To Extract Rough Stones. Anura Partners
                  With Local Miners To Select High Quality Rough Gems, Ensuring
                  Ethical And Sustainable Practices.
                </p>
              </div>
            </div>

            {/* Step 2: Sorting And Grading */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
              <div className="w-full lg:w-1/2 h-[300px] md:h-[400px]">
                <Card className="border-0 shadow-none h-full">
                  <CardContent className="p-0 h-full">
                    <img
                      className="w-full h-full rounded-lg object-cover"
                      alt="Gem sorting and grading process"
                      src="/images/s2.jpg"
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
                <div className="w-[180px] sm:w-[200px] md:w-[237px] h-[60px] sm:h-[70px] md:h-[88px] rounded-full bg-[#bf9b30] flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    Step 2
                  </span>
                </div>

                <h3 className="text-xl font-bold text-black">
                  Sorting And Grading
                </h3>

                <p className="text-lg text-black leading-relaxed">
                  Rough Stones Are Sorted By Color, Size, And Quality. Anura Evaluates
                  Each Stone For Its Potential, Focusing On Clarity And Natural
                  Properties Like The Cornflower Blue Of Ceylon Sapphires Or The
                  Asterism Of Star Rubies.
                </p>
              </div>
            </div>

            {/* Step 3: Preforming */}
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2 h-[300px] md:h-[400px]">
                <img
                  className="w-full h-full rounded-lg object-cover"
                  alt="Gem preforming process"
                  src="/images/s3.jpg"
                />
              </div>

              <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
                <Badge className="px-4 py-2 md:px-6 md:py-4 text-white bg-[#bf9b30]  rounded-full">
                  <span className="text-xl font-bold">
                    Step 3
                  </span>
                </Badge>

                <h3 className="text-xl font-bold text-black">
                  Preforming
                </h3>

                <p className="text-lg text-black leading-relaxed">
                  The Rough Stone Is Shaped To Maximize Weight Retention And Prepare
                  It For Faceting. This Step Requires Skill To Balance The Gem's
                  Size And Future Brilliance, Especially For Rare Padparadscha
                  Sapphires
                </p>
              </div>
            </div>

            {/* Step 4: Faceting */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
              <div className="w-full lg:w-1/2 h-[300px] md:h-[400px]">
                <Card className="border-0 shadow-none h-full">
                  <CardContent className="p-0 h-full">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      alt="Faceting process for gemstones"
                      src="/images/s4.jpg"
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
                <Badge className="px-4 py-3 md:px-6 md:py-5 bg-[#bf9b30]  rounded-full">
                  <span className="text-xl font-bold text-white">
                    Step 4
                  </span>
                </Badge>

                <h3 className="text-xl font-bold text-black">
                  Faceting
                </h3>

                <p className="text-lg text-black leading-relaxed">
                  Facets Are Cut At Precise Angles To Enhance The Gem's Brilliance
                  And Color. For Ceylon Sapphires, They Ensure Angles That Highlight
                  Their Vivid Hues, Often Using A Combination Of Traditional Hand
                  Cutting And Modern Machines.
                </p>
              </div>
            </div>

            {/* Step 5: Polishing */}
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2 h-[300px] md:h-[400px]">
                <img
                  className="w-full h-full rounded-lg object-cover"
                  alt="Craftsman polishing a gemstone"
                  src="/images/s5.jpg"
                />
              </div>

              <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
                <Badge className="px-4 py-2 md:px-6 md:py-4 rounded-full bg-[#bf9b30]">
                  <span className="text-xl font-bold text-white">
                    Step 5
                  </span>
                </Badge>

                <h3 className="text-xl font-bold text-black">
                  Polishing
                </h3>

                <p className="text-lg text-black leading-relaxed">
                  The Gem Is Polished To A Mirror-like Finish, Revealing Its True
                  Beauty. This Step Is Critical For Gems Like Star Rubies And
                  Chrysoberyl Cat's Eye To Showcase Their Unique Optical
                  Effects.
                </p>
              </div>
            </div>

            {/* Step 6: Quality Check And Certification */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
              <div className="w-full lg:w-1/2 h-[300px] md:h-[400px]">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  alt="Gem quality check process"
                  src="/images/s6.jpg"
                />
              </div>

              <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
                <div className="w-[180px] sm:w-[200px] md:w-[237px] h-[60px] sm:h-[70px] md:h-[88px] rounded-full bg-[#bf9b30] flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    Step 6
                  </span>
                </div>

                <h3 className="text-xl font-bold text-black">
                  Quality Check And Certification
                </h3>

                <p className="text-lg text-black leading-relaxed">
                  Each Gem Undergoes Rigorous Inspection For Quality And Authenticity.
                  They Ensure Certification By The National Gem And Jewellery
                  Authority (ngja) Or Gia, Guaranteeing Conflict-free Gems That Meet
                  International Standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Watch Our Process In Action */}
        <section className="relative container mx-auto px-4 sm:px-6 mt-12 md:mt-16">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-5xl font-bold text-[#bf9b30] text-center">
              Watch Our Process In Action
            </h2>
            <div className="w-[150px] sm:w-[180px] md:w-[216px] h-2 md:h-3 mt-4 md:mt-6 rounded-full bg-[#00B9B3] " />
          </div>

          {/* Video sections */}
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-8 md:mt-12">
            {/* Process Video Section */}
            <Card className="relative w-full h-[200px] sm:h-[300px] md:h-[360px] shadow-lg rounded-lg overflow-hidden"
              onClick={() => window.open('https://youtu.be/z2JEulhxcns?si=IPThD_j1qZcnCA8h', '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <CardContent className="p-0 h-full relative">
                {/* Video Thumbnail */}
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Video thumbnail"
                  src="/images/s7.jpg"
                />

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Video Title */}
                <div className="absolute top-3 left-3 right-3 z-10">
                  <h3 className="text-sm font-medium text-white overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  Sri Lanka Unearthed Pt 1: A story of sapphire mines and sparkling gems
                  </h3>
                </div>

                {/* YouTube Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Button
                    variant="ghost"
                    className="p-0 bg-transparent hover:bg-transparent"
                    onClick={e => { e.stopPropagation(); window.open('https://youtu.be/z2JEulhxcns?si=IPThD_j1qZcnCA8h', '_blank'); }}
                  >
                    <img
                      className="w-12 h-12 sm:w-16 sm:h-16"
                      alt="YouTube Play Button"
                      src="/images/youtube.jpg"
                    />
                  </Button>
                </div>

                {/* Watch on YouTube Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#171717cc] flex items-center px-3 z-10">
                  <span className="text-sm font-medium text-white">
                    Watch on YouTube
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Second Video Section */}
            <Card className="relative w-full h-[300px] sm:h-[300px] md:h-[360px] shadow-lg rounded-lg overflow-hidden"
              onClick={() => window.open('https://youtu.be/ilit_IEtRxY?si=tSYbhYcmSZylWDSz', '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <CardContent className="p-0 h-full relative">
                {/* Video Thumbnail */}
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Video thumbnail"
                  src="/images/s8.jpg"
                />

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Video Title */}
                <div className="absolute top-3 left-3 right-3 z-10">
                  <h3 className="text-sm font-medium text-white overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  Inside Sri Lanka’s Deadly Underground Mines Filled With Rare Jewels | Risky
                  </h3>
                </div>

                {/* YouTube Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Button
                    variant="ghost"
                    className="p-0 bg-transparent hover:bg-transparent"
                    onClick={e => { e.stopPropagation(); window.open('https://youtu.be/ilit_IEtRxY?si=tSYbhYcmSZylWDSz', '_blank'); }}
                  >
                    <img
                      className="w-12 h-12 sm:w-16 sm:h-16"
                      alt="YouTube play button"
                      src="/images/youtube.jpg"
                    />
                  </Button>
                </div>

                {/* Watch on YouTube Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#171717cc] flex items-center px-3 z-10">
                  <span className="text-sm font-medium text-white">
                    Watch on YouTube
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;