import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function Accordion({ items }) {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-all duration-300"
                >
                    <button
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        onClick={() => toggleItem(index)}
                    >
                        <span className="text-lg font-medium text-white">{item.question}</span>
                        {openIndex === index ? (
                            <ChevronUp className="text-gold-500" size={20} />
                        ) : (
                            <ChevronDown className="text-gray-400" size={20} />
                        )}
                    </button>

                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
