"use client";

import { Instagram, ArrowRight } from 'lucide-react';
import { links } from '@/lib/data';

export default function CTAInstagram() {
  return (
    // CAMBIO: Eliminé 'bg-gradient-to-b...' para que sea transparente
    <section className="py-20 border-t border-white/5 relative overflow-hidden group cursor-pointer" onClick={() => window.open(links.instagramJules)}>
        
        {/* Fondo animado sutil púrpura al pasar el mouse */}
        <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center relative z-10">
            <Instagram size={40} className="text-white mb-6 group-hover:scale-110 transition-transform duration-300" />
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

