"use client";

import { Instagram, ArrowRight } from 'lucide-react';
import { links } from '@/lib/data';

export default function CTAInstagram() {
  return (
    <section 
      className="py-20 border-t border-white/5 relative overflow-hidden group cursor-pointer" 
      onClick={() => window.open(links.instagramJules)}
    >
        {/* ELIMINÉ EL DIV QUE PINTABA EL FONDO DE VIOLETA AQUÍ */}
        
        <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center relative z-10">
            {/* El ícono sí crece un poquito, queda bien */}
            <Instagram size={40} className="text-white mb-6 group-hover:scale-110 transition-transform duration-300" />
            
            {/* El texto cambia a Púrpura, pero el fondo sigue negro */}
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter mb-2 group-hover:text-purple-400 transition-colors">
                Social Media
            </h3>
            
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                @JulesWineheart <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
            </p>
        </div>
    </section>
  );
}