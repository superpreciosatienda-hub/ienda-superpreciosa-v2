import React from 'react';

export function Hero() {
    return (
        <div className="relative w-full h-[600px] bg-gradient-to-r from-gray-900 via-[#1a1a1a] to-gray-900 flex items-center justify-center overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold font-serif text-gold-500 mb-6 tracking-tight drop-shadow-lg">
                    SuperPreciosa
                </h1>
                <p className="text-2xl md:text-3xl text-gray-200 font-light mb-2 tracking-wide">
                    Expertos en Color
                </p>
                <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-sans">
                    Tu Cabello, Tu Corona. Descubre nuestra colección exclusiva para un brillo radiante.
                </p>
                <button className="bg-gold-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-400 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    Explorar Colección
                </button>
            </div>

            {/* Decorative Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80 pointer-events-none"></div>
        </div>
    );
}
