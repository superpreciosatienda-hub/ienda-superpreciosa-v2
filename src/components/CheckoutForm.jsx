
import React, { useState } from 'react';
import { Send, Smartphone, Plus, Minus, X } from 'lucide-react';

export function CheckoutForm({ cart, onClose, onIncrease, onDecrease, onRemove }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentRef: ''
  });

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();

    // Construct the message
    let message = `*¡Hola! Quiero realizar un pedido en LuxeHair Venezuela.*\n\n`;
    message += `* Cliente:* ${formData.name} \n`;
    message += `* Teléfono:* ${formData.phone} \n`;
    message += `* Dirección:* ${formData.address} \n\n`;
    message += `* Pedido:*\n`;

    cart.forEach(item => {
      message += `- ${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)} \n`;
    });

    message += `\n * TOTAL A PAGAR: $${total.toFixed(2)}*\n`;
    message += `* Referencia Pago Móvil:* ${formData.paymentRef} \n`;
    message += `\n_Adjunto capturade pantalla del pago a continuación._`;

    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "584124423771"; // Placeholder, user will change this

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="p-1 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-white">Finalizar Compra</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="mb-8 space-y-2">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-white">{item.name}</div>
                <div className="text-gold-500 text-sm font-bold">${item.price.toFixed(2)}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDecrease(item.id)}
                  className="p-1 bg-white/10 rounded hover:bg-white/20 text-white transition-colors"
                >
                  <Minus size={14} />
                </button>

                <span className="w-6 text-center text-sm font-bold text-white">{item.quantity}</span>

                <button
                  onClick={() => onIncrease(item.id)}
                  className="p-1 bg-white/10 rounded hover:bg-white/20 text-white transition-colors"
                >
                  <Plus size={14} />
                </button>

                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1 ml-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
          {cart.length === 0 && <p className="text-gray-500 text-center">No hay productos en el carrito.</p>}
        </div>

        <div className="bg-gold-500/10 border border-gold-500/30 p-4 rounded-xl flex gap-4 items-start mb-8">
          <Smartphone className="text-gold-500 shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-white mb-2">Datos para Pago Móvil</h3>
            <div className="space-y-1 text-sm text-gray-300">
              <p><strong className="text-white">Banco:</strong> Banesco (0134)</p>
              <p><strong className="text-white">Cédula:</strong> V-9.315.144</p>
              <p><strong className="text-white">Teléfono:</strong> 0424-4189936</p>
              <p className="text-gold-500 font-medium mt-2">Tasa del día: Consultar al DM</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleWhatsAppOrder} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">Nombre Completo</label>
            <input
              type="text"
              name="name"
              required
              placeholder="María Pérez"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">Teléfono Celular</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="0412-1234567"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">Agencia de Envío (Zoom / Tealca)</label>
            <textarea
              name="address"
              required
              rows="2"
              value={formData.address}
              onChange={handleChange}
              placeholder="Ej: Zoom - Oficina Centro Valencia..."
              className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
            ></textarea>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">Referencia de Pago (4 últimos dígitos)</label>
            <input
              type="text"
              name="paymentRef"
              required
              placeholder="1234"
              value={formData.paymentRef}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <div className="pt-4 border-t border-white/10 mt-6">
            <p className="text-xl font-bold text-white flex justify-between">
              Total a pagar: <span className="text-gold-500">${total.toFixed(2)}</span>
            </p>
          </div>

          <button type="submit" className="w-full bg-gold-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-gold-400 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20">
            <Send size={20} />
            Enviar Pedido por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
