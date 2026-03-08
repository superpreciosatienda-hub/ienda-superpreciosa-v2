import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export function HairQuiz() {
    const [step, setStep] = useState('question');
    const [ recommendation, setRecommendation ] = useState(null);

    const handleAnswer = (option) => {
        let result = '';
        if (option === 'maltratado') {
            result = {
                id: 3,
                name: 'Combo Reparador',
                desc: 'Rescate intensivo con Argán y Keratina. Ideal para cabello quebradizo o procesado.',
                color: 'from-orange-500/20 to-red-500/20'
            };
        } else if (option === 'aspero') {
            result = {
                id: 5,
                name: 'Combo Suavizante',
                desc: 'Transformación de textura con Keratina. Ideal para canas rebeldes o cabello grueso.',
                color: 'from-blue-500/20 to-indigo-500/20'
            };
        } else if (option === 'frizz') {
            result = {
                id: 4,
                name: 'Combo Maxicolor',
                desc: 'Mantenimiento y control con Mascarilla Chao Frizz. Ideal para sellar el color y eliminar estática.',
                color: 'from-pink-500/20 to-purple-500/20'
            };
        }
        setRecommendation(result);
        setStep('result');
    };

    const scrollToProduct = (id) => {
        const element = document.getElementById(`product-${id}`);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Highlight effect
            element.classList.add('ring-4', 'ring-gold-500', 'ring-opacity-50');
            setTimeout(() => {
                element.classList.remove('ring-4', 'ring-gold-500', 'ring-opacity-50');
            }, 3000);
        }
    };

    return (
        <section className="py-12 px-4 relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#1a1a1a] border border-gold-500/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.1)] relative z-10 transition-all duration-500">
                    
                    {step === 'question' ? (
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-semibold mb-6">
                                <Sparkles className="w-4 h-4" />
                                ASESORÍA PERSONALIZADA
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                                ¿Cómo sientes tu cabello al tacto?
                            </h2>
                            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                                Además de las canas o que tengas el cabello opaco, selecciona la opción que mejor describa tu melena hoy:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'maltratado', label: 'Muy maltratado', icon: '🆘' },
                                    { id: 'aspero', label: 'Áspero y duro', icon: '🌵' },
                                    { id: 'frizz', label: 'Con mucho frizz', icon: '☁️' }
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleAnswer(opt.id)}
                                        className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300 text-left"
                                    >
                                        <span className="text-3xl mb-4 block">{opt.icon}</span>
                                        <h3 className="text-white font-bold text-lg group-hover:text-gold-400 transition-colors">
                                            {opt.label}
                                        </h3>
                                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-gold-500 mt-4 transform translate-x-0 group-hover:translate-x-2 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className={`absolute inset-0 bg-gradient-to-br ${recommendation.color} opacity-20 pointer-events-none rounded-3xl`}></div>
                            
                            <CheckCircle2 className="w-16 h-16 text-gold-500 mx-auto mb-6" />
                            <h2 className="text-3xl font-serif font-bold text-white mb-2">
                                ¡Tu Combo Perfecto!
                            </h2>
                            <p className="text-gold-400 font-bold mb-6 text-xl">
                                {recommendation.name}
                            </p>
                            
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
                                <p className="text-gray-300 italic">
                                    "{recommendation.desc}"
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => scrollToProduct(recommendation.id)}
                                    className="bg-gold-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-400 transition-all transform hover:scale-105"
                                >
                                    Ver Mi Combo
                                </button>
                                <button
                                    onClick={() => setStep('question')}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Repetir Test
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-0 w-64 h-64 bg-gold-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-500/5 blur-[120px] rounded-full"></div>
            </div>
        </section>
    );
}
