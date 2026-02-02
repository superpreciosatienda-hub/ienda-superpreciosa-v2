import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export function ProductCard({ product, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [currentImage, setCurrentImage] = useState(product.image);

  // Update image when selected color changes (if color has an image)
  const handleColorChange = (e) => {
    const colorName = e.target.value;
    const color = product.colors.find(c => c.name === colorName);
    if (color) {
      setSelectedColor(color);
      if (color.image) {
        setCurrentImage(color.image);
      }
    }
  };

  const handleAddToCart = () => {
    if (product.colors && !selectedColor) return;

    const productToAdd = {
      ...product,
      id: selectedColor ? `${product.id}-${selectedColor.name}` : product.id,
      name: selectedColor ? `${product.name} (${selectedColor.name})` : product.name,
      image: currentImage, // Use the currently displayed image
      originalId: product.id
    };

    onAddToCart(productToAdd);
  };

  return (
    <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gold-500/30 flex flex-col">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-serif font-bold text-white mb-2">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>

        {product.colors && (
          <div className="mb-4">
            <label className="block text-sm text-white font-bold mb-2 uppercase tracking-wider">Selecciona un tono:</label>
            <select
              value={selectedColor ? selectedColor.name : ''}
              onChange={handleColorChange}
              className="w-full p-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-gold-500"
            >
              {product.colors.map((color, index) => (
                <option key={index} value={color.name} className="bg-[#1e1e1e]">
                  {color.name}
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
