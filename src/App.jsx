import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CheckoutForm } from './components/CheckoutForm';
import products from './data/products.json';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState('cart'); // 'cart' | 'checkout'

  const openCart = () => {
    setView('cart');
    setIsCartOpen(true);
  };

  const addToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleIncrease = (productId) => {
    setCart(currentCart => currentCart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (productId) => {
    setCart(currentCart => currentCart.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const handleRemove = (productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 font-sans">
      <Navbar
        cartCount={cartItemCount}
        onOpenCart={openCart}
      />

      <Hero />

      <main className="container mx-auto px-4 py-16">
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

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex justify-end">
          <div className="w-full max-w-md bg-[#1e1e1e] h-full p-8 shadow-2xl flex flex-col border-l border-white/10">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-serif font-bold text-white">{view === 'cart' ? 'Tu Carrito' : 'Finalizar Pedido'}</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <span className="text-2xl">×</span>
              </button>
            </div>

            {view === 'cart' ? (
              <>
                <div className="flex-1 overflow-y-auto pr-2">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                      <p>Tu carrito está vacío.</p>
                      <button onClick={() => setIsCartOpen(false)} className="mt-4 text-gold-500 hover:underline">
                        Volver a la tienda
                      </button>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="mb-4 pb-4 border-b border-white/5 flex justify-between items-start">
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-sm text-gray-400">Cant: {item.quantity}</p>
                        </div>
                        <span className="text-gold-500 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="mt-8 pt-4 border-t border-gold-500">
                    <div className="flex justify-between text-xl font-bold mb-6">
                      <span>Total</span>
                      <span className="text-gold-500">
                        ${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                    <button
                      className="w-full bg-gold-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-gold-400 transition-colors"
                      onClick={() => setView('checkout')}
                    >
                      Ir a Pagar
                    </button>
                  </div>
                )}
              </>
            ) : (
              <CheckoutForm
                cart={cart}
                onClose={() => setIsCartOpen(false)}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
