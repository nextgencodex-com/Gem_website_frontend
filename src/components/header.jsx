"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useCart } from "./cart-context";
import CartModal from "./CartModal";
import GoogleTranslate from "./GoogleTranslate";

// Global Google Translate initialization
const initializeGoogleTranslate = () => {
  if (window.google && window.google.translate) {
    // Clear any existing instances
    const desktopElement = document.getElementById("google_translate_element_desktop");
    const mobileElement = document.getElementById("google_translate_element_mobile");
    
    if (desktopElement && !desktopElement.hasChildNodes()) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,it,es,ja,zh-CN,fr,de,ar,hi,pt,ru",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element_desktop"
      );
    }
    
    if (mobileElement && !mobileElement.hasChildNodes()) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,it,es,ja,zh-CN,fr,de,ar,hi,pt,ru",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element_mobile"
      );
    }
  }
};

// Desktop Google Translate Component
const DesktopGoogleTranslate = () => {
  useEffect(() => {
    // Only add script once
    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      
      // Set up global callback
      window.googleTranslateElementInit = () => {
        // Use setTimeout to ensure DOM elements are ready
        setTimeout(initializeGoogleTranslate, 100);
      };
      
      script.onload = () => {
        if (window.google && window.google.translate) {
          initializeGoogleTranslate();
        }
      };
      
      document.body.appendChild(script);
    } else {
      // Script already exists, just initialize
      setTimeout(initializeGoogleTranslate, 100);
    }
  }, []);

  return <div id="google_translate_element_desktop" className="w-full"></div>;
};

// Mobile Google Translate Component
const MobileGoogleTranslate = () => {
  useEffect(() => {
    // Initialize mobile translate when component mounts
    const timer = setTimeout(() => {
      initializeGoogleTranslate();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return <div id="google_translate_element_mobile" className="w-full"></div>;
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileTranslateOpen, setMobileTranslateOpen] = useState(false);
  const [desktopTranslateOpen, setDesktopTranslateOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Gem Collection", href: "/gem-collection" },
    { name: "Jewellery Collection", href: "/jewellery-collection" },
    { name: "Contact Us", href: "/contact" },
    { name: "Admin Panel", href: "/admin/login", gold: true },
  ];

  return (
    <header className="bg-white text-black sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="w-18 h-16 flex items-center">
            <img
              src="/images/logo2.jpg"
              alt="Luxiris Gems Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-black hover:text-blue-400 transition-colors duration-300 font-medium text-sm xl:text-base ${
                  link.gold ? "text-[#bf9b30] font-bold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Desktop Translate */}
            <div className="hidden lg:flex items-center relative">
              <div className="relative">
                <button
                  onClick={() => setDesktopTranslateOpen(!desktopTranslateOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-expanded={desktopTranslateOpen}
                  aria-label="Toggle language selection"
                >
                  <img
                    src="https://img.icons8.com/color/24/google-translate.png"
                    alt="Translate"
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Language
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      desktopTranslateOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Desktop Google Translate Dropdown */}
                <div
                  className={`absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out z-50 ${
                    desktopTranslateOpen
                      ? "opacity-100 transform translate-y-0 visible"
                      : "opacity-0 transform -translate-y-2 invisible"
                  }`}
                  style={{
                    minWidth: "200px",
                  }}
                >
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-700 mb-3">
                      Select Language
                    </div>
                    <div className="desktop-translate-container">
                      <DesktopGoogleTranslate />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart */}
            <button
              className="relative text-black hover:text-blue-500 transition-colors duration-300"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-black hover:text-blue-500 transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {/* Mobile Google Translate */}
          <div className="pt-4 pb-2 border-t border-gray-200">
            <div className="px-3 py-3 bg-gray-50 rounded-lg">
              <button
                onClick={() => {
                  setMobileTranslateOpen(!mobileTranslateOpen);
                  // Re-initialize mobile translate when opened
                  if (!mobileTranslateOpen) {
                    setTimeout(() => {
                      initializeGoogleTranslate();
                    }, 300);
                  }
                }}
                className="flex items-center gap-3 mb-3 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 hover:bg-gray-100 transition-colors"
                aria-expanded={mobileTranslateOpen}
                aria-label="Toggle language selection"
              >
                <img
                  src="https://img.icons8.com/color/24/google-translate.png"
                  alt="Translate"
                  className="w-6 h-6 flex-shrink-0"
                />
                <div className="text-sm font-medium text-gray-700 flex-1">
                  Select Language
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    mobileTranslateOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Google Translate Combo */}
              <div
                className={`w-full transition-all duration-300 ease-in-out ${
                  mobileTranslateOpen
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="mobile-translate-container">
                  <MobileGoogleTranslate />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-1 pt-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-black hover:text-blue-400 transition-colors duration-300 font-medium py-3 px-3 rounded-md hover:bg-gray-100 ${
                  link.gold ? "text-[#bf9b30] font-bold" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Click outside to close desktop translate dropdown */}
      {desktopTranslateOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDesktopTranslateOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Global Styles for Google Translate */}
      <style jsx global>{`
        /* Mobile Google Translate Styles */
        .mobile-translate-container .goog-te-combo {
          width: 100% !important;
          padding: 12px 16px !important;
          border: 2px solid #d1d5db !important;
          border-radius: 8px !important;
          background: white !important;
          font-size: 16px !important;
          color: #374151 !important;
          appearance: none !important;
          cursor: pointer !important;
          min-height: 48px !important;
        }
        .mobile-translate-container .goog-te-combo:focus {
          outline: none !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }

        /* Desktop Google Translate Styles */
        .desktop-translate-container .goog-te-combo {
          width: 100% !important;
          padding: 10px 14px !important;
          border: 2px solid #d1d5db !important;
          border-radius: 6px !important;
          background: white !important;
          font-size: 14px !important;
          color: #374151 !important;
          appearance: none !important;
          cursor: pointer !important;
          min-height: 40px !important;
          transition: all 0.2s ease-in-out !important;
        }
        .desktop-translate-container .goog-te-combo:hover {
          border-color: #9ca3af !important;
        }
        .desktop-translate-container .goog-te-combo:focus {
          outline: none !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }

        /* Hide Google Translate banner and attribution */
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        
        #google_translate_element_desktop .goog-te-gadget,
        #google_translate_element_mobile .goog-te-gadget {
          color: transparent !important;
          font-size: 0 !important;
        }
        
        #google_translate_element_desktop .goog-te-gadget > span > a,
        #google_translate_element_mobile .goog-te-gadget > span > a {
          display: none !important;
        }
        
        #google_translate_element_desktop .goog-te-gadget .goog-te-combo,
        #google_translate_element_mobile .goog-te-gadget .goog-te-combo {
          color: #374151 !important;
        }

        /* Ensure proper initialization and visibility */
        #google_translate_element_desktop,
        #google_translate_element_mobile {
          min-height: 40px;
        }
        
        /* Force mobile translate to be visible when parent is open */
        .mobile-translate-container {
          position: relative;
          z-index: 10;
        }
        
        /* Ensure mobile dropdown is properly styled */
        #google_translate_element_mobile .goog-te-combo {
          width: 100% !important;
          padding: 12px 16px !important;
          border: 2px solid #d1d5db !important;
          border-radius: 8px !important;
          background: white !important;
          font-size: 16px !important;
          color: #374151 !important;
          appearance: none !important;
          cursor: pointer !important;
          min-height: 48px !important;
        }
        
        #google_translate_element_desktop .goog-te-combo {
          width: 100% !important;
          padding: 10px 14px !important;
          border: 2px solid #d1d5db !important;
          border-radius: 6px !important;
          background: white !important;
          font-size: 14px !important;
          color: #374151 !important;
          appearance: none !important;
          cursor: pointer !important;
          min-height: 40px !important;
          transition: all 0.2s ease-in-out !important;
        }
      `}</style>
    </header>
  );
};

export default Header;    