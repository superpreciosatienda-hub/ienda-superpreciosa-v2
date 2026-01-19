import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';

export function Navbar({ cartCount, onOpenCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#1e1e1e]/80 backdrop-blur-md border-b border-white/10 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Sparkles className="text-gold-500" size={24} />
          <span className="text-white font-serif">SuperPreciosa</span>
        </Link>

        {/* Desktop Navigation - Only show on desktop */}
        {!isMobile && (
          <div className="flex items-center gap-6">
            <Link to="/mayoristas" className="text-gray-300 hover:text-gold-500 transition-colors font-medium">
              Mayoristas
            </Link>

            <Link to="/unete-al-equipo" className="text-gray-300 hover:text-gold-500 transition-colors font-medium">
              Embajadoras
            </Link>

            <button
              className="relative text-gray-200 hover:text-gold-500 transition-colors p-2"
              onClick={onOpenCart}
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-black text-xs font-extrabold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Mobile Navigation - Only show on mobile */}
        {isMobile && (
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button
              className="relative text-gray-200 hover:text-gold-500 transition-colors p-2"
              onClick={onOpenCart}
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-black text-xs font-extrabold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              className="text-gray-200 hover:text-gold-500 transition-colors p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Slide-in */}
      {isMobile && (
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#1e1e1e] border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col p-6 gap-6">
            {/* Close Button */}
            <button
              className="self-end text-gray-200 hover:text-gold-500 transition-colors"
              onClick={closeMobileMenu}
            >
              <X size={24} />
            </button>

            {/* Mobile Menu Links */}
            <Link
              to="/mayoristas"
              className="text-gray-300 hover:text-gold-500 transition-colors font-medium text-lg py-2"
              onClick={closeMobileMenu}
            >
              Mayoristas
            </Link>

            <Link
              to="/unete-al-equipo"
              className="text-gray-300 hover:text-gold-500 transition-colors font-medium text-lg py-2"
              onClick={closeMobileMenu}
            >
              Embajadoras
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
