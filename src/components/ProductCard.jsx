import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export function ProductCard({ product, onAddToCart }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const handleAddToCart = () => {
    if (product.variants && !selectedVariant) return;

    const productToAdd = {
      ...product,
      id: selectedVariant ? `${product.id}-${selectedVariant}` : product.id,
      name: selectedVariant ? `${product.name} (${selectedVariant})` : product.name,
      originalId: product.id // Keep reference to parent ID if needed
    };

    onAddToCart(productToAdd);
  };

  return (
    <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gold-500/30 flex flex-col">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-serif font-bold text-white mb-2">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>

        {product.variants && (
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Selecciona un tono:</label>
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              className="w-full p-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-gold-500"
            >
              {product.variants.map((variant, index) => (
                <option key={index} value={variant} className="bg-[#1e1e1e]">
                  {variant}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-xl font-bold text-gold-500">${product.price.toFixed(2)}</span>
          <button
            className="flex items-center gap-2 bg-gold-500 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gold-400 transition-colors"
            onClick={handleAddToCart}
          >
            <Plus size={18} />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
