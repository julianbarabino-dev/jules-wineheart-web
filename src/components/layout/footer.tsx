"use client";

import { links } from '@/lib/data';
import { Instagram, Youtube, Download, Mail, ArrowUp, Heart } from 'lucide-react'; 
import { motion } from "framer-motion";

// --- SVG DE SPOTIFY ---
const SpotifyIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14.5c2.5-1 5.5-1 8 0"/><path d="M7 12c3-1.5 7-1.5 10 0"/><path d="M6.5 9.5c3.5-2 7.5-2 11 0"/></svg>
);

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="diary" className="bg-[#030303] pt-20 pb-10 border-t border-white/10 relative z-10">
        
        {/* BOTÓN BACK TO HEADER */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.button 
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(74, 222, 128, 0.2)" }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-[#030303] backdrop-blur-md border border-white/10 text-white/50 hover:text-green-400 hover:border-green-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,1)] hover:shadow-[0_0_15px_rgba(74,222,128,0.5)] flex items-center justify-center"
                title="Volver al inicio"
            >
                <ArrowUp size={20} />
            </motion.button>
        </div>

        <div className="container mx-auto px-6 max-w-[1080px]">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                
                {/* Columna 1: Marca */}
                <div className="md:col-span-1">
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
                    <h5 className="text-xl font-black text-white uppercase italic tracking-tighter mb-6">Contacto</h5>
                    <a href={links.email} className="text-neutral-400 hover:text-purple-400 transition-colors block mb-2 text-xs font-mono flex items-center gap-2">
                        <Mail size={12}/> juleswineheart@gmail.com
                    </a>
                    <p className="text-neutral-600 text-[10px] font-mono mb-6">Buenos Aires, CABA</p>
                    <a href="#" className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all rounded hover:border-white/40">
                        <Download size={12} /> Descargar EPK
                    </a>
                </div>

                {/* Columna 3: Redes (COLORES CORREGIDOS) */}
                <div className="md:col-span-1">
                    <h5 className="text-xl font-black text-white uppercase italic tracking-tighter mb-6">Conectar</h5>
                    <div className="flex gap-4">
                        {/* INSTAGRAM (Ahora es ROSA fuerte #ec4899) */}
                        <a 
                            href={links.instagramJules} 
                            target="_blank" 
                            title="Instagram" 
                            className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-neutral-400 hover:text-[#ec4899] hover:border-[#ec4899]/30 hover:bg-[#ec4899]/5 transition-all"
                        >
                            <Instagram size={18}/>
                        </a>

                        {/* YOUTUBE (Rojo) */}
                        <a 
                            href={links.youtube} 
                            target="_blank" 
                            title="YouTube" 
                            className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-neutral-400 hover:text-[#FF0000] hover:border-[#FF0000]/30 hover:bg-[#FF0000]/5 transition-all"
                        >
                            <Youtube size={18}/>
                        </a>

                        {/* SPOTIFY (Verde) */}
                        <a 
                            href={links.spotify} 
                            target="_blank" 
                            title="Spotify" 
                            className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-neutral-400 hover:text-[#1DB954] hover:border-[#1DB954]/30 hover:bg-[#1DB954]/5 transition-all"
                        >
                            <SpotifyIcon size={18}/>
                        </a>
                    </div>
                </div>

                {/* Columna 4: BANDCAMP (DORADO) */}
                <div className="md:col-span-1 border border-white/10 p-6 bg-[#080808] rounded-xl group hover:border-yellow-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-3 text-yellow-500 animate-pulse">
                        <Heart size={14} fill="currentColor" />
                        <h5 className="text-xs font-bold uppercase tracking-widest">Support the Art</h5>
                    </div>
                    <p className="text-neutral-500 text-[10px] mb-4 leading-relaxed">
                        La mejor forma de apoyar este proyecto es adquiriendo la música en alta calidad.
                    </p>
                    <a 
                        href="https://bandcamp.com" 
                        target="_blank"
                        className="block w-full text-center bg-white text-black py-2 text-[10px] font-black uppercase tracking-widest hover:bg-yellow-600 hover:text-white transition-colors rounded-sm"
                    >
                        Ir a Bandcamp
                    </a>
                </div>

            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
                <p>© 2025 Jules Wineheart</p>
                <p className="hover:text-neutral-400 transition-colors cursor-default">Desarrollado por Metaflow - Julián Barabino</p>
            </div>
        </div>
    </footer>
  );
}