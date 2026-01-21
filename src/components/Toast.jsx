import React from 'react';
import { CheckCircle } from 'lucide-react';

export function Toast({ message, isVisible }) {
    return (
        <div
            className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50
        bg-gradient-to-r from-gold-500 to-yellow-400 text-black 
        px-6 py-3 rounded-full shadow-2xl
        transition-all duration-300 flex items-center gap-2
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
            role="alert"
            aria-live="polite"
        >
            <CheckCircle size={20} className="flex-shrink-0" />
            <span className="font-semibold">{message}</span>
        </div>
    );
}
