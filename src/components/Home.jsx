import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from './Hero';
import { HairQuiz } from './HairQuiz';
import { ProductCard } from './ProductCard';
import products from '../data/products.json';

export function Home({ addToCart }) {
    return (
        <>
            <Hero />
            <HairQuiz />

            <main className="container mx-auto px-4 py-8">
                {/* Ambassador Program Section */}
                <div className="mb-12 p-10 rounded-3xl bg-gradient-to-br from-gold-500/10 via-gold-500/5 to-purple-900/20 border border-gold-500/20 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500 text-black text-xs font-black uppercase tracking-widest mb-6 animate-pulse">
                            ¡Oportunidad Única!
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                            ¿Amas los resultados? <br/>
                            <span className="text-gold-400">Gana con SuperPreciosa</span>
                        </h2>
                        
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                            Si ya usas nuestros productos y te ha ido bien, únete a nuestro equipo de embajadoras. Podrás obtener tus próximas compras con un <span className="text-gold-300 font-bold text-2xl">50%, 70% de descuento</span> o incluso <span className="text-white font-bold underline decoration-gold-500">GRATIS</span>.
                        </p>

                        <Link
                            to="/unete-al-equipo"
                            className="inline-block relative group/btn"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-full blur opacity-40 group-hover/btn:opacity-100 transition duration-1000 group-hover/btn:duration-200 animate-pulse"></div>
                            <button className="relative bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-black py-5 px-12 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] transform hover:-translate-y-1 text-xl uppercase tracking-wider">
                                ¡Quiero ser Embajadora!
                            </button>
                        </Link>
                    </div>
                </div>

                <div id="productos" className="flex items-center justify-between mb-8 scroll-mt-24">
                    <h2 className="text-3xl font-serif font-bold text-white">Nuestra Colección</h2>
                    <div className="h-1 bg-gold-500 w-24 rounded"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}
