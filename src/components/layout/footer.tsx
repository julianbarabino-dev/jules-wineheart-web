"use client";

import { links } from '@/lib/data';
import { Instagram, Youtube, Music, Download, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="diary" className="bg-[#030303] pt-20 pb-10 border-t border-white/10 relative z-10">
        
        {/* BOTÓN BACK TO HEADER */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <button 
                onClick={scrollToTop}
                className="bg-[#030303] border border-white/10 p-2 rounded-full text-neutral-500 hover:text-white hover:border-white/40 transition-all shadow-[0_0_15px_rgba(0,0,0,1)]"
                title="Volver al inicio"
            >
                <ArrowUp size={18} />
            </button>
        </div>

        <div className="container mx-auto px-6 max-w-[1080px]">
            
            {/* Grid Principal */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                
                {/* Columna 1: Marca */}
                <div className="md:col-span-1">
                    
                    {/* JV.CVR - Estilo Base */}
                    <div className="flex items-center gap-3 mb-6">
                        <img 
                            src="/icons/jv-logo-icon.svg" 
                            alt="JV Logo" 
                            className="w-6 h-6 object-contain filter brightness-125"
                        />
                        <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">JV.CVR</h4>
                    </div>

                    <p className="text-neutral-500 text-xs leading-relaxed">
                        Exploraciones sonoras desde el fin del mundo. Lo-fi, texturas y sentimientos digitales.
                    </p>
                </div>

                {/* Columna 2: Contacto & EPK */}
                <div className="md:col-span-1">
                    {/* CAMBIO AQUI: Misma tipografía que JV.CVR */}
                    <h5 className="text-xl font-black text-white uppercase italic tracking-tighter mb-6">Contacto</h5>
                    
                    <a href={links.email} className="text-neutral-400 hover:text-purple-400 transition-colors block mb-2 text-xs font-mono flex items-center gap-2">
                        <Mail size={12}/> juleswineheart@gmail.com
                    </a>
                    <p className="text-neutral-600 text-[10px] font-mono mb-6">Buenos Aires, CABA</p>
                    
                    <a href="#" className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all rounded hover:border-white/40">
                        <Download size={12} /> Descargar EPK
                    </a>
                </div>

                {/* Columna 3: Redes */}
                <div className="md:col-span-1">
                    {/* CAMBIO AQUI: Misma tipografía que JV.CVR */}
                    <h5 className="text-xl font-black text-white uppercase italic tracking-tighter mb-6">Conectar</h5>
                    
                    <div className="flex gap-4">
                        <a href={links.instagramJules} target="_blank" className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"><Instagram size={18}/></a>
                        <a href={links.youtube} target="_blank" className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"><Youtube size={18}/></a>
                        <a href={links.spotify} target="_blank" className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"><Music size={18}/></a>
                    </div>
                </div>

                {/* Columna 4: Sound Diary (CTA) */}
                <div className="md:col-span-1 border border-white/10 p-6 bg-[#080808] rounded-xl">
                    <h5 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Sound Diary</h5>
                    <p className="text-neutral-500 text-[10px] mb-4 leading-relaxed">Únete a la lista para recibir demos y noticias secretas.</p>
                    <button className="w-full bg-white text-black py-2 text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-colors">Suscribirse</button>
                </div>
            </div>

            {/* Barra Inferior */}
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
                <p>© 2025 Jules Wineheart</p>
                <p className="hover:text-neutral-400 transition-colors cursor-default">Desarrollado por Metaflow - Julián Barabino</p>
            </div>
        </div>
    </footer>
  );
}
