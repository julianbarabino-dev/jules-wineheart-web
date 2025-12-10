"use client";

import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

export default function SoundDiary() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Aquí conectaremos la base de datos real más adelante
    console.log("Suscripto:", email);
  };

  return (
    <section id="diary" className="py-24 border-t border-white/5 relative z-10 bg-black/20">
      <div className="container mx-auto px-6 max-w-xl text-center">
        <div className="inline-flex items-center gap-2 text-purple-400 mb-6 bg-purple-900/10 px-4 py-1.5 rounded-full border border-purple-500/20">
            <Mail size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Sound Diary</span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter mb-4">
          Únete a la Transmisión
        </h3>
        <p className="text-neutral-500 text-sm leading-relaxed mb-8">
          Recibe demos inéditos, pensamientos analógicos y noticias antes que nadie. Sin spam, solo señales.
        </p>

        {isSubmitted ? (
            <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl flex flex-col items-center animate-in fade-in zoom-in">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black mb-3 shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                    <Check size={20} strokeWidth={3} />
                </div>
                <h4 className="text-green-400 font-bold uppercase tracking-widest text-xs">¡Suscripción Confirmada!</h4>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 relative">
                <div className="relative">
                    <input 
                        type="email" 
                        placeholder="tu@email.com" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-sm font-mono placeholder:text-neutral-600"
                    />
                    <button 
                        type="submit" 
                        className="absolute right-2 top-2 bottom-2 bg-white text-black px-4 rounded font-bold uppercase text-[10px] tracking-widest hover:bg-purple-500 hover:text-white transition-all flex items-center gap-2"
                    >
                        <span>Enviar</span> <ArrowRight size={12}/>
                    </button>
                </div>
                <p className="text-neutral-600 text-[10px] uppercase tracking-widest">
                    * Solo emails importantes.
                </p>
            </form>
        )}
      </div>
    </section>
  );
}

