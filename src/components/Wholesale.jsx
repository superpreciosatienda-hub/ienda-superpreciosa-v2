import React from 'react';
import { TrendingUp, Truck, Users, MessageCircle } from 'lucide-react';
import { Accordion } from './Accordion';

export function Wholesale() {
    const faqItems = [
        {
            question: "¿Cuál es el pedido mínimo?",
            answer: "Para acceder a nuestros precios de mayoreo, el pedido mínimo inicial es de $200 USD. Para clientes recurrentes, el mínimo es de $100 USD."
        },
        {
            question: "¿Cuáles son los métodos de pago?",
            answer: "Aceptamos transferencias bancarias directas, tarjetas de crédito/débito y PayPal. Para pedidos grandes, ofrecemos opciones de pago diferido bajo aprobación."
        },
        {
            question: "¿Tiempos de envío?",
            answer: "Los pedidos se procesan en 24 horas. El envío estándar toma de 3 a 5 días hábiles, y el envío express de 1 a 2 días hábiles."
        }
    ];

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/1234567890?text=Hola,%20me%20interesa%20la%20lista%20de%20precios%20para%20mayoristas', '_blank');
    };

    return (
        <div className="min-h-screen bg-[#121212] pt-20">
            {/* Section 1: Hero */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 to-[#121212] pointer-events-none"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                        Haz Crecer Tu Negocio con <span className="text-gold-500">SuperPreciosa</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Productos premium, márgenes insuperables y todo el soporte que necesitas para escalar tus ventas.
                    </p>
                </div>
            </section>

            {/* Section 2: Power Pillars */}
            <section className="py-16 px-4 bg-white/5">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-[#1e1e1e] border border-white/10 hover:border-gold-500/50 transition-colors text-center group">
                            <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <TrendingUp className="text-gold-500" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Ganancias Insuperables</h3>
                            <p className="text-gray-400">Márgenes de ganancia líderes en el mercado para maximizar tu retorno de inversión.</p>
                        </div>

                        <div className="p-8 rounded-2xl bg-[#1e1e1e] border border-white/10 hover:border-gold-500/50 transition-colors text-center group">
                            <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Truck className="text-gold-500" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Envíos Gratis y Seguros</h3>
                            <p className="text-gray-400">Logística optimizada para que recibas tu inventario rápido y sin complicaciones.</p>
                        </div>

                        <div className="p-8 rounded-2xl bg-[#1e1e1e] border border-white/10 hover:border-gold-500/50 transition-colors text-center group">
                            <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Users className="text-gold-500" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Asesoría de Ventas</h3>
                            <p className="text-gray-400">Soporte dedicado y material de marketing para ayudarte a vender más.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: FAQ */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-serif font-bold text-white text-center mb-12">Preguntas Frecuentes</h2>
                    <Accordion items={faqItems} />
                </div>
            </section>

            {/* Section 4: Sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1e1e1e]/90 backdrop-blur-lg border-t border-white/10 z-40 md:static md:bg-transparent md:border-none md:p-0 md:pb-20">
                <div className="container mx-auto flex justify-center">
                    <button
                        onClick={handleWhatsAppClick}
                        className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-900/20"
                    >
                        <MessageCircle size={24} />
                        Contactar por WhatsApp para Lista de Precios
                    </button>
                </div>
            </div>
        </div>
    );
}
