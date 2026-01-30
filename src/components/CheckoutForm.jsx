import React, { useState } from 'react';
import { Send, Smartphone, Plus, Minus, X } from 'lucide-react';
import { AFFILIATE_SYSTEM_ENABLED } from '../config/affiliates';
import { getAffiliateWhatsAppText, getActiveAffiliate } from '../utils/affiliateTracking';

export function CheckoutForm({ cart, onClose, onIncrease, onDecrease, onRemove }) {
  const [formData, setFormData] = useState({
    name: '',
    cedula: '',
    phone: '',
    address: '',
    paymentRef: ''
  });

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = async (e) => {
    e.preventDefault();

    // 1. Validación de campos obligatorios
    if (!formData.name.trim() || !formData.cedula.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Por favor completa todos los datos obligatorios');
      return;
    }

    // --- CAPTURA DINÁMICA DE EMBAJADORA (ROBUSTA) ---
    // 1. Captura agresiva desde la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    const urlRef = urlParams.get('ref');

    // 2. Captura desde el sistema de rastreo (localStorage) - DIRECTO
    // Recuperamos sincrónicamente para renderizado inicial, pero la validación real ocurrió al guardar
    const activeAffiliate = AFFILIATE_SYSTEM_ENABLED ? getActiveAffiliate() : null;

    let rawAffiliateCode = 'Directo';

    if (urlRef) {
      // Prioridad 1: Código presente en la URL actual
      rawAffiliateCode = urlRef.trim().toLowerCase();
    } else if (activeAffiliate && activeAffiliate.code) {
      // Prioridad 2: Código recuperado directamente del objeto guardado
      rawAffiliateCode = activeAffiliate.code;
    }
    // ------------------------------------------------

    // 2. ENVÍO ESTRUCTURADO A N8N (Non-blocking)
    // No usamos 'await' para que no retrase la apertura de WhatsApp
    fetch('https://n8n.superpreciosa.com/webhook/venta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fecha: new Date().toLocaleDateString('es-VE'),
        nombre: formData.name,
        cedula: formData.cedula,
        telefono: formData.phone,
        monto: total.toFixed(2),
        pedido: cart.map(item => `${item.name} (x${item.quantity})`).join(', '),
        direccion: formData.address,
        referencia: formData.paymentRef,
        embajadora: rawAffiliateCode, // <--- Valor dinámico capturado
        source: 'Tienda_Online'
      }),
    }).catch(error => console.error('Error enviando a n8n:', error));

    // 3. Construcción del mensaje para WhatsApp
    const affiliateText = AFFILIATE_SYSTEM_ENABLED ? getAffiliateWhatsAppText() : '';
    const message = `¡Hola! 👋 Quiero confirmar mi pedido en *SuperPreciosa*.

👤 Cliente: ${formData.name}
🆔 Cédula: ${formData.cedula}
📱 Teléfono: ${formData.phone}
📍 Dirección: ${formData.address}

🛍️ *PEDIDO:*
${cart.map(item => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

💰 *TOTAL A PAGAR: $${total.toFixed(2)}*

🔢 Referencia Pago Móvil: ${formData.paymentRef}${affiliateText}

_Adjunto captura de pantalla del pago a continuación._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "584124423771";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-[#1a1a1a]">
      <div className="flex justify-between items-center p-6 pb-4 border-b border-white/10 shrink-0">
        <h2 className="text-2xl font-serif font-bold text-white">Finalizar Compra</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="mb-8 space-y-2 text-white">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-gold-500 text-sm font-bold">${item.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onDecrease(item.id)} className="p-1 bg-white/10 rounded hover:bg-white/20"><Minus size={14} /></button>
                <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                <button onClick={() => onIncrease(item.id)} className="p-1 bg-white/10 rounded hover:bg-white/20"><Plus size={14} /></button>
                <button onClick={() => onRemove(item.id)} className="p-1 ml-2 text-red-400"><X size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gold-500/10 border border-gold-500/30 p-4 rounded-xl flex gap-4 items-start mb-8 text-white">
          <Smartphone className="text-gold-500 shrink-0" size={24} />
          <div>
            <h3 className="font-bold mb-2">Datos para Pago Móvil</h3>
            <div className="space-y-1 text-sm text-gray-300">
              <p><strong className="text-white">Banco:</strong> Banesco (0134)</p>
              <p><strong className="text-white">Cédula:</strong> V-9.315.144</p>
              <p><strong className="text-white">Teléfono:</strong> 0424-4189936</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleWhatsAppOrder} className="space-y-4 pb-4">
          <input type="text" name="name" required placeholder="Nombre Completo" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white outline-none focus:border-gold-500" />
          <input type="text" name="cedula" required placeholder="Cédula de Identidad" value={formData.cedula} onChange={handleChange} className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white outline-none focus:border-gold-500" />
          <input type="tel" name="phone" required placeholder="Teléfono Celular" value={formData.phone} onChange={handleChange} className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white outline-none focus:border-gold-500" />
          <textarea name="address" required rows="2" placeholder="Agencia de Envío" value={formData.address} onChange={handleChange} className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white outline-none focus:border-gold-500"></textarea>
          <input type="text" name="paymentRef" required placeholder="Referencia de Pago (4 dígitos)" value={formData.paymentRef} onChange={handleChange} className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white outline-none focus:border-gold-500" />
        </form>
      </div>

      <div className="sticky bottom-0 bg-[#1e1e1e] border-t border-white/10 p-4 z-50">
        <div className="flex justify-between items-center mb-4 text-white">
          <span className="text-lg font-bold">Total a pagar:</span>
          <span className="text-2xl font-bold text-gold-500">${total.toFixed(2)}</span>
        </div>
        <button onClick={handleWhatsAppOrder} type="submit" className="w-full bg-gold-500 text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
          <Send size={20} /> Enviar Pedido por WhatsApp
        </button>
      </div>
    </div>
  );
}