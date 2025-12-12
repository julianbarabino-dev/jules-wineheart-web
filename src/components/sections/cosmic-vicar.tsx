"use client";

import { cosmicServices, links } from '@/lib/data';
import { Play, Instagram } from 'lucide-react';

export default function CosmicVicar() {
  return (
    <section id="cosmic-vicar" className="py-32 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 max-w-[1080px]">
            <div className="border border-white/10 bg-neutral-900/30 relative text-left overflow-hidden rounded-xl backdrop-blur-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600"></div>
                
                <div className="p-8 md:p-14">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-10">
                        
                        {/* GRUPO: REC + INSTAGRAM (Juntos aquí) */}
                        <div className="flex items-center gap-3">
                            {/* Etiqueta REC */}
                            <div className="flex items-center gap-2 animate-pulse bg-red-900/20 border border-red-500/30 px-3 py-1 rounded-full">
                                <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                                <h2 className="text-[10px] font-mono text-red-400 tracking-widest uppercase font-bold">REC</h2>
                            </div>

                            {/* Icono Instagram (Pequeño y sutil al lado de REC) */}
                            <a 
                                href={links.instagramCosmic} 
                                target="_blank" 
                                className="text-neutral-500 hover:text-white transition-all hover:scale-110" 
                                title="Instagram Cosmic Vicar"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">Cosmic Vicar Records</h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 justify-between">
                        {/* Servicios */}
                        <div className="flex-1">
                            <p className="text-neutral-300 text-sm leading-relaxed mb-8 max-w-lg border-l border-white/20 pl-4">
                                Identidad sonora para artistas independientes. Un espacio donde lo análogo y lo digital convergen bajo la dirección de Julián Barabino.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {cosmicServices.map((service, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-neutral-900/50 p-3 border border-white/5 rounded hover:border-purple-500/30 transition-colors">
                                        <service.icon size={16} className="text-purple-400"/> 
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">{service.label}</span>
                                    </div>
                                ))}
                            </div>
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
                            
                            {/* ELIMINADO EL ICONO DE INSTAGRAM DE ACÁ ABAJO */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

