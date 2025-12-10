"use client";

import { secondaryReleases, links } from '@/lib/data';
import { Play, ShoppingBag, Disc, ExternalLink, Music } from 'lucide-react';
import { useState } from 'react';

export default function Releases() {
  const [activeRelease, setActiveRelease] = useState<number | null>(null);

  const handleReleaseClick = (index: number) => {
    setActiveRelease(activeRelease === index ? null : index);
  };

  return (
    <section id="releases" className="py-32 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-[1080px]">
        {/* HEADER DE LA SECCIÓN */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-purple-500 font-mono text-xs mb-2 block tracking-widest">01. DISCOGRAFÍA</span>
            <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">
              Lanzamientos
            </h2>
          </div>
          <a href={links.spotify} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-white pb-1 flex items-center gap-2">
            Spotify <ExternalLink size={12}/>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* BLOODMOON (Principal) */}
            <div className="lg:col-span-1 group relative aspect-[3/4] bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-500 cursor-pointer overflow-hidden rounded-2xl flex flex-col hover:shadow-[0_0_40px_rgba(147,51,234,0.3)] backdrop-blur-sm">
                <div className="absolute top-3 right-3 bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 uppercase z-20 animate-pulse rounded-full shadow-lg">Nuevo</div>
                
                <div className="relative flex-1 overflow-hidden">
                    {/* Usamos img estándar para evitar problemas */}
                    <img 
                        src="/fotos/bloodmoon-cover.jpg" 
                        alt="Bloodmoon" 
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                </div>

                <div className="p-6 flex flex-col justify-end relative z-10 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-3xl font-black text-white uppercase italic leading-none mb-2 drop-shadow-lg">BLOODMOON</h3>
                    <p className="text-purple-300 font-mono text-[10px] uppercase tracking-wider mb-6 font-bold">EP • 2025</p>
                    <div className="flex gap-2">
                        <button onClick={() => window.open(links.spotify)} className="flex-1 bg-white text-black py-2 text-[9px] font-bold uppercase hover:bg-purple-500 hover:text-white transition-colors flex items-center justify-center gap-1 rounded"><Play size={10} fill="currentColor"/> Stream</button>
                        <button onClick={() => window.open(links.bandcamp)} className="flex-1 border border-white/30 text-white py-2 text-[9px] font-bold uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-1 rounded"><ShoppingBag size={10}/> Buy</button>
                    </div>
                </div>
            </div>

            {/* SLIDER / LISTA SECUNDARIA */}
            <div className="lg:col-span-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-2">
                    <Disc size={12} /> Archivo (Desliza para ver más)
                </h3>
                
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 scrollbar-hide">
                    {secondaryReleases.map((release, index) => (
                        <div 
                            key={index}
                            onClick={(e) => { e.stopPropagation(); handleReleaseClick(index); }}
                            className={`min-w-[280px] snap-center shrink-0 group relative aspect-square bg-white/5 border transition-all duration-500 cursor-pointer overflow-hidden rounded-xl backdrop-blur-sm ${activeRelease === index ? (release.color || '') + ' border-opacity-100' : 'border-white/10 hover:border-white/30'}`}
                        >
                            <img 
                                src={release.img} 
                                alt={release.altText} 
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-80 group-hover:opacity-100" 
                            />
                            
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>

                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-5 transition-all duration-300 ${activeRelease === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                                <h3 className="text-lg font-bold text-white leading-tight mb-1">{release.title}</h3>
                                <p className={`${release.textColor} text-[10px] font-mono uppercase tracking-wider mb-4 font-bold`}>{release.type}</p>
                                <div className="flex gap-2">
                                    <button onClick={() => window.open(release.streamUrl)} className="flex-1 bg-white text-black py-1.5 text-[8px] font-bold uppercase hover:bg-neutral-200 flex items-center justify-center gap-1 rounded"><Play size={8} fill="currentColor"/> Play</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="w-1 shrink-0"></div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
