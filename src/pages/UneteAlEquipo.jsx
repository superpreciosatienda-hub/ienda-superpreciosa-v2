import React, { useState } from 'react';
import { Send, Sparkles, DollarSign, Share2, TrendingUp, CheckCircle2, Gift } from 'lucide-react';

export function UneteAlEquipo() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        instagram: '',
        codigoDeseado: ''
    });
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!acceptedTerms) {
            alert('Debes aceptar los términos y condiciones para continuar');
            return;
        }

        // Mensaje de WhatsApp
        const message = `🌟 *SOLICITUD DE REGISTRO - EMBAJADORA SUPERPRECIOSA*

👤 Nombre: ${formData.name}
📧 Email: ${formData.email}
📱 Instagram/TikTok: ${formData.instagram}
🎁 Código deseado: ${formData.codigoDeseado}

✅ He leído y acepto los términos y condiciones del programa de embajadoras.

¡Estoy lista para comenzar a ganar! 💰`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = "584124423771";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#121212] text-gray-100">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a] pt-32 pb-20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjE1LDAsLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6">
                            <Sparkles className="text-gold-500" size={20} />
                            <span className="text-gold-500 font-semibold text-sm">PROGRAMA DE EMBAJADORAS</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                            Convierte tu Pasión por el Cabello en{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-300">
                                Ganancias Reales
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Únete a nuestro programa de Embajadoras y gana dinero recomendando productos que realmente funcionan.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <div className="flex items-center gap-2 text-gray-300">
                                <CheckCircle2 className="text-gold-500" size={20} />
                                <span>Sin cuotas</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <CheckCircle2 className="text-gold-500" size={20} />
                                <span>Sin inventario</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <CheckCircle2 className="text-gold-500" size={20} />
                                <span>15% de comisión</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 Beneficios Principales */}
            <section className="py-20 bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Beneficio 1 */}
                        <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-gold-500/50 transition-all duration-300 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6 group-hover:bg-gold-500/20 transition-colors">
                                    <Gift className="text-gold-500" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Regístrate Gratis</h3>
                                <p className="text-gray-400">Sin cuotas de inscripción ni necesidad de mantener inventario. Comienza hoy mismo.</p>
                            </div>
                        </div>

                        {/* Beneficio 2 */}
                        <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-gold-500/50 transition-all duration-300 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6 group-hover:bg-gold-500/20 transition-colors">
                                    <Share2 className="text-gold-500" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Comparte tu Código</h3>
                                <p className="text-gray-400">Usa tu código personalizado en tus Lives, Stories y redes sociales. Fácil de compartir.</p>
                            </div>
                        </div>

                        {/* Beneficio 3 */}
                        <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-gold-500/50 transition-all duration-300 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6 group-hover:bg-gold-500/20 transition-colors">
                                    <DollarSign className="text-gold-500" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Gana 15%</h3>
                                <p className="text-gray-400">Recibe el 15% de comisión por cada venta confirmada. Pagos mensuales garantizados.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cómo Funciona */}
            <section className="py-20 bg-[#121212]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-white mb-4">¿Cómo Funciona?</h2>
                        <div className="h-1 w-24 bg-gold-500 mx-auto rounded"></div>
                    </div>

                    <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8">
                        {/* Paso 1 */}
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gold-500 text-black font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Regístrate</h3>
                            <p className="text-gray-400 text-sm">Crea tu cuenta gratis en minutos</p>
                        </div>

                        {/* Paso 2 */}
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gold-500 text-black font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Comparte</h3>
                            <p className="text-gray-400 text-sm">Usa tu link personalizado</p>
                        </div>

                        {/* Paso 3 */}
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gold-500 text-black font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Gana</h3>
                            <p className="text-gray-400 text-sm">15% por cada venta confirmada</p>
                        </div>

                        {/* Paso 4 */}
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gold-500 text-black font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                                4
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Retira</h3>
                            <p className="text-gray-400 text-sm">Pagos mensuales garantizados</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formulario de Registro */}
            <section className="py-20 bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12">
                            <div className="text-center mb-8">
                                <TrendingUp className="text-gold-500 mx-auto mb-4" size={48} />
                                <h2 className="text-3xl font-serif font-bold text-white mb-2">Únete Ahora</h2>
                                <p className="text-gray-400">Completa el formulario y comienza a ganar</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="María González"
                                        className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="maria@ejemplo.com"
                                        className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Usuario de Instagram/TikTok *</label>
                                    <input
                                        type="text"
                                        name="instagram"
                                        required
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        placeholder="@maria_beauty"
                                        className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Código Deseado *</label>
                                    <input
                                        type="text"
                                        name="codigoDeseado"
                                        required
                                        value={formData.codigoDeseado}
                                        onChange={handleChange}
                                        placeholder="maria (solo letras minúsculas)"
                                        className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Tu link será: superpreciosa.com/?ref={formData.codigoDeseado || 'tucodigo'}</p>
                                </div>

                                {/* Términos y Condiciones */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={acceptedTerms}
                                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                                            className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-gold-500 focus:ring-gold-500"
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-300">
                                            Acepto los{' '}
                                            <button
                                                type="button"
                                                onClick={() => setShowTerms(true)}
                                                className="text-gold-500 hover:underline font-medium"
                                            >
                                                términos y condiciones
                                            </button>
                                            {' '}del programa de embajadoras *
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gold-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-gold-400 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
                                >
                                    <Send size={20} />
                                    Enviar Solicitud por WhatsApp
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-[#121212]">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-serif font-bold text-white mb-4">Preguntas Frecuentes</h2>
                            <div className="h-1 w-24 bg-gold-500 mx-auto rounded"></div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-2">¿Necesito invertir dinero?</h3>
                                <p className="text-gray-400">No, el programa es 100% gratuito. No hay cuotas de inscripción ni necesitas comprar inventario.</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-2">¿Cuándo recibo mis pagos?</h3>
                                <p className="text-gray-400">Los pagos se realizan mensualmente, 15 días después del cierre del mes. El mínimo para retiro es $50.</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-2">¿Puedo usar mi propio código para comprar?</h3>
                                <p className="text-gray-400">No, para mantener la integridad del programa, las afiliadas no pueden ganar comisión de sus propias compras.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal de Términos y Condiciones */}
            {showTerms && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
                    <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Términos y Condiciones</h2>
                            <button onClick={() => setShowTerms(false)} className="text-gray-400 hover:text-white">
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        <div className="space-y-4 text-gray-300 text-sm">
                            <div>
                                <h3 className="text-white font-bold mb-2">1. Comisiones</h3>
                                <p>Las embajadoras recibirán el 15% de comisión sobre el subtotal de cada venta confirmada realizada a través de su código de referencia.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-2">2. Pagos</h3>
                                <p>Los pagos se realizan mensualmente. El mínimo para retiro es de $50 USD. Los pagos se procesan 15 días después del cierre del mes para verificar que no haya devoluciones.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-2">3. Periodo de Retención</h3>
                                <p>Existe un periodo de retención de 15 días para verificar que no haya devoluciones o cancelaciones de pedidos.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-2">4. Uso de la Marca</h3>
                                <p>Las afiliadas pueden usar el nombre y logo de SuperPreciosa en sus publicaciones, pero no pueden crear páginas o perfiles haciéndose pasar por la marca oficial.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-2">5. Prácticas Prohibidas</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Spam en redes sociales o mensajes directos</li>
                                    <li>Publicidad pagada compitiendo con la marca (Google Ads, Facebook Ads)</li>
                                    <li>Auto-referencia (comprar con tu propio código)</li>
                                    <li>Hacer promesas que la marca no cumple</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-2">6. Terminación</h3>
                                <p>SuperPreciosa se reserva el derecho de suspender o terminar la cuenta de cualquier afiliada que incurra en prácticas fraudulentas, spam, o que afecte negativamente la reputación de la marca.</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowTerms(false)}
                            className="w-full mt-6 bg-gold-500 text-black py-3 rounded-xl font-bold hover:bg-gold-400 transition-colors"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
