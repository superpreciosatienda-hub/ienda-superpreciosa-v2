import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from './Hero';
import { ProductCard } from './ProductCard';
import products from '../data/products.json';

export function Home({ addToCart }) {
    return (
        <>
            <Hero />

            <main className="container mx-auto px-4 py-16">
                {/* Coming Soon Section */}
                <div className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-gold-500/20 to-purple-500/20 border border-gold-500/30 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gold-400/5 blur-3xl group-hover:bg-gold-400/10 transition-colors duration-700"></div>
                    <div className="relative z-10">
                        <span className="inline-block px-4 py-1 rounded-full bg-gold-500/20 text-gold-500 text-sm font-bold mb-4 border border-gold-500/50">
                            PRÓXIMAMENTE
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-white mb-4">Nueva Colección "Midnight Glamour"</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
                            Estamos creando algo extraordinario. Ampliaremos nuestro catálogo con productos que ayuden al cuidado y el mantenimiento de la belleza.
                        </p>

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-white/10 hover:border-gold-500/30 transition-colors duration-300">
                            <h3 className="text-gold-200 font-serif text-xl mb-2">¿Te preguntan por tu secreto?</h3>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Compártelo y gana. Únete a nuestro equipo, recomienda y gana un 15% por cada venta. Sin inventario, sin inversión. Nosotros gestionamos todo y tú cobras.
                            </p>
                            <Link
                                to="/unete-al-equipo"
                                className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-gold-500/20 transform hover:-translate-y-0.5"
                            >
                                Únete al Equipo
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8">
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
