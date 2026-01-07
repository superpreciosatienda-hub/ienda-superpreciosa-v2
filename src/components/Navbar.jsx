import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles } from 'lucide-react';

export function Navbar({ cartCount, onOpenCart }) {
  return (
    <nav className="sticky top-0 z-50 bg-[#1e1e1e]/80 backdrop-blur-md border-b border-white/10 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Sparkles className="text-gold-500" size={24} />
          <span className="text-white font-serif">SuperPreciosa</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/mayoristas" className="text-gray-300 hover:text-gold-500 transition-colors font-medium">
            Mayoristas
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
      </div>
    </nav>
  );
}
