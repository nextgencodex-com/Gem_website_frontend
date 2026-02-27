"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";
import CartModal from "./ShoppingCart";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Gifts", href: "/gifts" },
    { name: "Popular", href: "/popular" },
    { name: "Category", href: "/category" },
    { name: "Contact Us", href: "/contact" },
  ];

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-white/10">
      {/* Subtle background pattern matching other pages */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="w-18 h-16 flex items-center">
            <img
              src="/images/logo2.jpg"
              alt="Luxiris Gems Logo"
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative transition-colors duration-300 font-medium text-sm xl:text-base group ${
                  isActive(link.href) ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                {/* Active indicator underline */}
                <span 
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white/30 transform transition-transform duration-300 ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              className="relative text-gray-400 hover:text-white transition-colors duration-300"
              onClick={() => navigate('/shopping-cart')}
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-400 hover:text-white transition-colors duration-300"
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
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-1 pt-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`transition-colors duration-300 font-medium py-3 px-3 rounded-md ${
                  isActive(link.href)
                    ? "text-white bg-white/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Cart modal is opened via dedicated /shopping-cart route */}
    </header>
  );
};

export default Header;