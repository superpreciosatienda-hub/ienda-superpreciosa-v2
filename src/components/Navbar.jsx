import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';
import './Navbar.css';

export function Navbar({ cartCount, onOpenCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="desktop-nav items-center gap-6">
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

        {/* Mobile Navigation - Visible only on mobile */}
        <div className="mobile-nav items-center gap-4">
          {/* Cart Icon - Always visible */}
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
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 mobile-only"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Slide-in */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
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
    </nav>
  );
}
