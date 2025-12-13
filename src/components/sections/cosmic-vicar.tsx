"use client";

import { useState } from 'react';
import { cosmicServices, links } from '@/lib/data';
import { Play, Instagram, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'; // Importamos LayoutGroup por seguridad

const descriptions = [
    "Transformamos tus demos en canciones completas. Arreglos, instrumentación y dirección artística para potenciar tu identidad sonora.",
    "Logramos el balance perfecto, profundidad y loudness competitivo. Tu música lista para sonar increíble en Spotify y todas las plataformas.",
    "Limpieza de ruido, afinación de voces y cuantización rítmica. La base técnica sólida e imperceptible que tu producción necesita.",
    "Diseño sonoro inmersivo, foley y música adaptativa/interactiva (FMOD/Wwise) para llevar la narrativa de tu videojuego al siguiente nivel."
];

export default function CosmicVicar() {
  const [activeService, setActiveService] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setActiveService(activeService === index ? null : index);
  };

  return (
    <section id="cosmic-vicar" className="py-32 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 max-w-[1080px]">
            <div className="border border-white/10 bg-neutral-900/30 relative text-left overflow-hidden rounded-xl backdrop-blur-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600"></div>
                
                <div className="p-8 md:p-14">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-10">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 animate-pulse bg-red-900/20 border border-red-500/30 px-3 py-1 rounded-full">
                                <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                                <h2 className="text-[10px] font-mono text-red-400 tracking-widest uppercase font-bold">REC</h2>
                            </div>
                            <a href={links.instagramCosmic} target="_blank" className="text-neutral-500 hover:text-white transition-all hover:scale-110" title="Instagram Cosmic Vicar">
                                <Instagram size={18} />
                            </a>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">Cosmic Vicar Records</h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 justify-between">
                        {/* Servicios (ACORDEÓN) */}
                        <div className="flex-1">
                            <p className="text-neutral-300 text-sm leading-relaxed mb-8 max-w-lg border-l border-white/20 pl-4">
                                Identidad sonora para artistas independientes. Un espacio donde lo análogo y lo digital convergen bajo la dirección de Julián Barabino.
                            </p>
                            
                            {/* LayoutGroup ayuda a que los items hermanos se coordinen mejor */}
                            <LayoutGroup>
                                <div className="flex flex-col gap-3">
                                    {cosmicServices.map((service, i) => {
                                        const isOpen = activeService === i;
                                        return (
                                            <motion.div 
                                                layout // 1. VOLVEMOS A PONER ESTO para que empuje a los de abajo
                                                key={i} 
                                                onClick={() => toggleService(i)}
                                                initial={false}
                                                transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
                                                className={`
                                                    cursor-pointer p-4 border rounded overflow-hidden relative z-0
                                                    ${isOpen 
                                                        ? 'bg-purple-900/10 border-purple-500/40' 
                                                        : 'bg-neutral-900/50 border-white/5 hover:border-white/20'}
                                                `}
                                                // Border radius fix para motion
                                                style={{ borderRadius: 12 }} 
                                            >
                                                {/* 2. EL SECRETO: layout="position" en el header. 
                                                   Esto evita que el texto se deforme/estire cuando la caja crece. */}
                                                <motion.div 
                                                    layout="position" 
                                                    className="flex items-center justify-between gap-3"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <service.icon size={18} className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"/> 
                                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isOpen ? "text-white" : "text-neutral-300"}`}>
                                                            {service.label}
                                                        </span>
                                                    </div>
                                                    <ChevronDown 
                                                        size={14} 
                                                        className={`text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-purple-400" : ""}`} 
                                                    />
                                                </motion.div>

                                                <AnimatePresence mode="sync">
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        >
                                                            <p className="pt-3 text-[11px] text-neutral-400 leading-relaxed font-mono pl-8 border-l border-purple-500/20 ml-1 pb-1">
                                                                {descriptions[i] || "Consultar por detalles específicos de este servicio."}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </LayoutGroup>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex flex-col gap-4 min-w-[240px] mt-6 lg:mt-0 justify-end">
                            <a 
                                href={`${links.whatsapp}?text=Hola%20Cosmic%20Vicar%20Records%2C%20quiero%20iniciar%20un%20proyecto.`} 
                                target="_blank" 
                                className="bg-white text-black px-6 py-4 text-xs font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all w-full text-center flex items-center justify-center gap-2 rounded shadow-lg hover:shadow-purple-500/20"
                            >
                                <Play size={16} fill="currentColor" /> Iniciar Proyecto
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}