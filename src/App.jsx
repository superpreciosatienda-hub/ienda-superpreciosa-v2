import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Wholesale } from './components/Wholesale';
import { CheckoutForm } from './components/CheckoutForm';
import { UneteAlEquipo } from './pages/UneteAlEquipo';
import { Toast } from './components/Toast';
import { AFFILIATE_SYSTEM_ENABLED } from './config/affiliates';
import { detectAffiliateCode, saveAffiliateCode } from './utils/affiliateTracking';
import affiliatesData from './data/affiliates.json';

// --- NUEVO: COMPONENTE QUE RECIBE EL CÓDIGO (Ej: /ofelia) ---
function AffiliateRedirect() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      // 1. Buscar si el código existe en tu archivo JSON
      const codeToCheck = code.toLowerCase(); // Asegurar minúsculas
      const isValid = affiliatesData.find(a => a.code === codeToCheck && a.active);

      // 2. Si existe, guardarlo en el navegador de la clienta
      if (isValid) {
        saveAffiliateCode(codeToCheck);
      }
    }
    // 3. Redirigir SIEMPRE al inicio (Home) para evitar pantalla negra
    navigate('/', { replace: true });
  }, [code, navigate]);

  // Mientras redirige, mostramos fondo oscuro (es cuestión de milisegundos)
  return <div className="min-h-screen bg-[#121212]" />;
}
// -----------------------------------------------------------

function AppContent() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState('cart'); // 'cart' | 'checkout'
  const [showToast, setShowToast] = useState(false);
  const toastTimerRef = useRef(null);

  // 🎯 Sistema de Afiliados - Detectar código en URL clásica (?ref=...)
  useEffect(() => {
    if (AFFILIATE_SYSTEM_ENABLED) {
      const affiliateCode = detectAffiliateCode();
      if (affiliateCode) {
        saveAffiliateCode(affiliateCode);
      }
    }
  }, []);

  // Hide toast when route changes
  useEffect(() => {
    setShowToast(false);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  }, [location.pathname]);

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

    // Show toast notification
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setShowToast(true);
    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
      toastTimerRef.current = null;
    }, 2500);
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

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/mayoristas" element={<Wholesale />} />
        <Route path="/unete-al-equipo" element={<UneteAlEquipo />} />

        {/* 🔥 ESTA ES LA RUTA MÁGICA PARA LOS CÓDIGOS DE EMBAJADORAS 🔥 */}
        {/* Debe ir al final para no bloquear las otras páginas */}
        <Route path="/:code" element={<AffiliateRedirect />} />
      </Routes>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[200] flex justify-end">
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
                      Continuar la Compra
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

      {/* Toast Notification - Only show on homepage */}
      {location.pathname === '/' && (
        <Toast
          message="¡Producto añadido!"
          isVisible={showToast}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;