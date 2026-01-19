import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';

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

        {/* MENÚ DE ESCRITORIO (La clave: hidden md:flex) */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/mayoristas" className="text-gray-300 hover:text-gold-500 transition-colors font-medium">
            TIENDA
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

        {/* MENÚ DE CELULAR */}
        <div className="flex md:hidden items-center gap-4">
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

          <button
            className="block md:hidden text-gray-200 hover:text-gold-500 transition-colors p-2"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Overlay y Menú Lateral */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMobileMenu} />
      )}

      <div className={`fixed top-0 right-0 h-full w-64 bg-[#1e1e1e] border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-6 gap-6">
          <button className="self-end text-gray-200 hover:text-gold-500 transition-colors" onClick={closeMobileMenu}>
            <X size={24} />
          </button>
          <Link to="/mayoristas" className="text-gray-300 hover:text-gold-500 transition-colors font-medium text-lg py-2" onClick={closeMobileMenu}>
            TIENDA
          </Link>
          <Link to="/unete-al-equipo" className="text-gray-300 hover:text-gold-500 transition-colors font-medium text-lg py-2" onClick={closeMobileMenu}>
            Embajadoras
          </Link>
        </div>
      </div>
    </nav>
  );
}