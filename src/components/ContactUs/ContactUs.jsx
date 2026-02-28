import React, { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    
    // Prepare WhatsApp message
    const whatsappMessage = `
*New Contact Form Submission*

*Name:* ${form.fullName}
*Email:* ${form.email}
*Phone:* ${form.phone || 'Not provided'}
*Message:*
${form.message}

_Sent via website contact form_
    `.trim();

    // Encode for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Your WhatsApp number
    const phoneNumber = "94759627589";
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in same tab
    window.location.href = whatsappUrl;
    
    setSent(true);
    setForm({ fullName: "", email: "", phone: "", message: "" });
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Subtle background pattern - matching About Us page */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Hero Section - This is already responsive, keep it as is */}
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center overflow-hidden bg-black">
        <img
          src="/images/contact.avif"
          alt="Luxury Gemstones Contact Us"
          className="absolute inset-0 w-full h-full object-contain z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 space-y-6 px-6 lg:px-12 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl text-white font-bold mb-4 relative">
            Contact Us
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/30" />
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Get in touch with our gemstone specialists for expert consultation 
            and personalized service. We're here to assist you with any inquiries.
          </p>
        </div>
      </div>

      {/* WhatsApp Button - Already responsive */}
      <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-20">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300 text-sm md:text-base"
          onClick={() => (window.location.href = 'https://wa.me/+94759627589')}
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
        </button>
      </div>

      {/* Contact Form Section */}
      <section className="relative z-20 max-w-6xl mx-auto -mt-16 bg-[#1a1a1a] rounded-xl shadow-2xl p-8 md:p-12 lg:p-16 border border-gray-800">
        {/* ======= DESKTOP VIEW CODE ======= */}
        <div className="hidden md:block">
          <h2 className="font-serif text-4xl text-white font-bold mb-8 text-center">
            Get in Touch
          </h2>

          {/* Company Logo */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-full blur"></div>
              <div className="relative bg-[#1a1a1a] p-4 rounded-full shadow-lg ring-1 ring-gray-700">
                <img
                  src="/images/Log 1.webp"
                  alt="Luxury Gemstones"
                  className="w-32 md:w-40 h-32 md:h-40 object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full p-3 border border-gray-700 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-600"
                  placeholder="Enter your full name"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-700 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-600"
                  placeholder="Enter your email address"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-3 border border-gray-700 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-600"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full p-3 border border-gray-700 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-600 resize-y"
                  placeholder="Type your message here..."
                  required
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="flex flex-col items-center justify-center sm:flex-row gap-1 pt-0">
                <button
                  type="submit"
                  className="w-40 bg-white text-black font-semibold text-sm py-2 px-1 rounded-full transition-colors duration-300 hover:bg-gray-200"
                  disabled={sending}
                >
                  {sending ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </div>
              {sent && (
                <div className="text-green-400 mt-2 text-sm text-center">
                  Message sent successfully!
                </div>
              )}
            </form>

            {/* Contact Information */}
            <div className="space-y-8 p-6 bg-[#1a1a1a] rounded-lg border border-gray-800">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-black border border-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white font-bold mb-1">Phone</h3>
                  <p className="text-gray-400">+94 11 234 5678</p>
                  <p className="text-gray-500 text-sm mt-1">Monday - Friday, 9am - 5pm</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-black border border-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white font-bold mb-1">Email</h3>
                  <p className="text-gray-400">info@gemstones.com</p>
                  <p className="text-gray-500 text-sm mt-1">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-black border border-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white font-bold mb-1">Address</h3>
                  <p className="text-gray-400">123 Gem Street</p>
                  <p className="text-gray-400">Ratnapura, Sri Lanka</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h3 className="font-serif text-lg text-white font-bold mb-2">Business Hours</h3>
                <ul className="space-y-1 text-gray-400">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ========== MOBILE VIEW CODE ========== */}
        <div className="block md:hidden">
          <h2 className="font-serif text-3xl text-white font-bold mb-6 text-center">
            Get in Touch
          </h2>

          {/* Company Logo - Mobile */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-3 bg-white/10 rounded-full blur"></div>
              <div className="relative bg-[#1a1a1a] p-3 rounded-full shadow-lg ring-1 ring-gray-700">
                <img
                  src="/images/Log 1.webp"
                  alt="Luxury Gemstones"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Contact Form - Mobile */}
          <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName-mobile" className="block text-sm font-medium text-gray-400 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full p-2.5 border border-gray-700 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-600 text-sm"
                placeholder="Enter your full name"
                required
                value={form.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email-mobile" className="block text-sm font-medium text-gray-400 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2.5 border border-gray-700 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-600 text-sm"
                placeholder="Enter your email address"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone-mobile" className="block text-sm font-medium text-gray-400 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full p-2.5 border border-gray-700 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-600 text-sm"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message-mobile" className="block text-sm font-medium text-gray-400 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-2.5 border border-gray-700 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-600 text-sm resize-y"
                placeholder="Type your message here..."
                required
                value={form.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="w-36 bg-white text-black font-semibold text-sm py-2.5 px-1 rounded-full transition-colors duration-300 hover:bg-gray-200"
                disabled={sending}
              >
                {sending ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </div>
            {sent && (
              <div className="text-green-400 mt-2 text-xs text-center">
                Message sent successfully!
              </div>
            )}
          </form>

          {/* Contact Information - Mobile */}
          <div className="space-y-4 pt-4 border-t border-gray-800">
            <h3 className="font-serif text-xl text-white font-bold mb-4 text-center">
              Contact Information
            </h3>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-black border border-gray-700 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-base text-white font-bold">Phone</h4>
                <p className="text-gray-400 text-sm">+94 11 234 5678</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-black border border-gray-700 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-base text-white font-bold">Email</h4>
                <p className="text-gray-400 text-sm">info@gemstones.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-black border border-gray-700 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-base text-white font-bold">Address</h4>
                <p className="text-gray-400 text-sm">123 Gem Street, Ratnapura</p>
              </div>
            </div>

            <div className="pt-3">
              <h4 className="font-serif text-base text-white font-bold mb-2">Business Hours</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between text-gray-400">
                  <span>Mon - Fri</span>
                  <span>9am - 6pm</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <span>Saturday</span>
                  <span>10am - 4pm</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <span>Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}