import React from 'react';
import { Hero } from './Hero';
import { ProductCard } from './ProductCard';
import products from '../data/products.json';

export function Home({ addToCart }) {
    return (
        <>
            <Hero />

            <main className="container mx-auto px-4 py-16">
                {/* Coming Soon Section */}
                <div className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-gold-500/20 to-purple-500/20 border border-gold-500/30 text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-gold-500/20 text-gold-500 text-sm font-bold mb-4 border border-gold-500/50">
                        PRÓXIMAMENTE
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-white mb-4">Nueva Colección "Midnight Glamour"</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Estamos preparando algo espectacular. Una línea exclusiva de tratamientos nocturnos que transformarán tu cabello mientras duermes. Mantente atenta.
                    </p>
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
