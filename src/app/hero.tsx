"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Headphones, ChevronDown, Guitar, Laptop, Book, Keyboard, Terminal, Moon, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from '@/components/ui/button';

// --- CONFIGURACIÓN DE LOS MODOS SECRETOS ---
const SECRET_MODES = {
  default: { 
    text: "JULES WINEHEART", 
    style: "text-white" 
  },
  ghost: { 
    text: "LISTEN", 
    style: "text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] font-serif" 
  },
  hacker: { 
    text: "TRUE LIES", 
    style: "text-green-500 font-mono tracking-widest drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" 
  },
  blood: { 
    text: "LUNA", 
    style: "text-red-600 font-black tracking-tighter drop-shadow-[0_0_30px_rgba(220,38,38,1)]" 
  },
  ritual: { 
    text: "RITUAL", 
    style: "text-neutral-400 font-serif tracking-[1em] uppercase" 
  }
};

// --- COMPONENTE: TÍTULO INTERACTIVO ---
const DraggableTitle = ({ 
  mode, 
  onLetterClick, 
  activeBuffer 
}: { 
  mode: string, 
  onLetterClick: (char: string) => void,
  activeBuffer: string 
}) => {
  const constraintsRef = useRef(null);
  const currentConfig = SECRET_MODES[mode as keyof typeof SECRET_MODES] || SECRET_MODES.default;
  const letters = currentConfig.text.split("");

  return (
    <div className="relative z-50 mb-8 w-full max-w-6xl mx-auto">
      <motion.div className="absolute inset-0 w-full h-full pointer-events-none" ref={constraintsRef} />
      
      <AnimatePresence mode="wait">
        <motion.h1
          key={mode} 
          className={`text-5xl sm:text-7xl md:text-9xl font-black leading-none select-none flex flex-wrap justify-center gap-1 sm:gap-2 ${currentConfig.style}`}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ 
            opacity: 0, 
            y: 50, 
            rotateX: 90, 
            filter: "blur(20px)",
            transition: { duration: 0.5 } 
          }}
        >
          {letters.map((char, index) => {
            if (char === " ") return <span key={index} className="w-4 md:w-8" />;
            
            const isSecret = mode !== 'default';
            // ¿Está esta letra en el buffer reciente? (Ej: Si escribí "LIS", la L, I y S se iluminan)
            const isActive = !isSecret && activeBuffer.includes(char);

            // Animación de "Sacudida" para modos secretos
            const shake = isSecret ? {
              x: [0, -2, 2, -1, 1, 0],
              y: [0, 1, -1, 0],
              transition: { repeat: Infinity, duration: 0.2 + Math.random() * 0.3 }
            } : {};

            return (
              <motion.span
                key={`${mode}-${index}`}
                onTap={() => onLetterClick(char)}
                drag={!isSecret}
                dragConstraints={constraintsRef}
                dragElastic={0.2}
                // Si está activa (tocada), se pone Púrpura y brilla. Si no, blanco normal.
                animate={isActive ? { color: "#d8b4fe", textShadow: "0 0 20px #a855f7", scale: 1.1 } : shake}
                whileHover={!isSecret ? { scale: 1.2, color: "#a855f7", rotate: Math.random() * 15 - 7.5 } : {}}
                whileTap={{ scale: 0.9, cursor: "grabbing", color: "#fff" }}
                className={`inline-block transition-colors duration-300 ${!isSecret ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
              >
                {char}
              </motion.span>
            );
          })}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

// --- HERO PRINCIPAL ---
export default function Hero() {
  const [mode, setMode] = useState('default'); 
  const [buffer, setBuffer] = useState(""); // Estado para guardar las letras tocadas
  const [showHelper, setShowHelper] = useState(true);
  
  // LOGICA CENTRAL DE INPUT
  const handleInput = (char: string) => {
    if (mode !== 'default') {
        setMode('default');
        setBuffer("");
        return;
    }

    const upperChar = char.toUpperCase();
    
    // Actualizamos el buffer visual y lógico
    setBuffer(prev => {
        const newBuffer = (prev + upperChar).slice(-10); // Guardamos ultimas 10
        
        // Chequeo de códigos
        if (newBuffer.endsWith('LISTEN')) setMode('ghost');
        else if (newBuffer.endsWith('TRUELIES')) setMode('hacker');
        else if (newBuffer.endsWith('LUNA')) setMode('blood');
        else if (newBuffer.endsWith('RITUAL')) setMode('ritual');
        
        return newBuffer;
    });

    // Reset automático del buffer si deja de escribir por 3 segundos (para apagar las luces)
    clearTimeout((window as any).resetTimer);
    (window as any).resetTimer = setTimeout(() => setBuffer(""), 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMode('default');
        setBuffer("");
        return;
      }
      if (/^[a-zA-Z]$/.test(e.key)) {
        handleInput(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => setShowHelper(false), 8000);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [mode]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden transition-colors duration-1000 z-20
      ${mode === 'default' ? '' : ''}
      ${mode === 'hacker' ? 'bg-black text-green-500 font-mono' : ''}
      ${mode === 'blood' ? 'bg-[#1a0505] text-red-400' : ''}
      ${mode === 'ritual' ? 'bg-gray-950 text-neutral-500 grayscale' : ''}
      ${mode === 'ghost' ? 'bg-[#0a0a0a] text-white' : ''}
    `}>
      
      {/* OVERLAYS GLOBALES */}
      <AnimatePresence>
        {mode === 'hacker' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-black border border-green-500 text-green-500 px-6 py-2 font-mono text-sm shadow-[0_0_20px_rgba(0,255,0,0.6)] animate-pulse z-50">
              &gt; SYSTEM BREACH DETECTED.
            </div>
          </motion.div>
        )}

        {mode === 'ghost' && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-12 right-6 md:right-12 z-50 pointer-events-none">
            <div className="w-72 h-44 bg-zinc-900 border-4 border-zinc-700 rounded-xl p-3 shadow-2xl relative rotate-3">
              <div className="w-full h-full border border-neutral-800 rounded bg-black flex items-center justify-center gap-6 relative overflow-hidden">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-12 h-12 rounded-full border-4 border-neutral-700 bg-black z-10" />
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-12 h-12 rounded-full border-4 border-neutral-700 bg-black z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-12 bg-white/5 backdrop-blur rounded z-0"></div>
              </div>
              <div className="absolute bottom-5 left-0 w-full text-center z-20">
                <span className="text-[9px] font-mono text-white/70 bg-black/80 px-2 py-1 rounded border border-white/10">PLAYING: GHOST_TRACK.MP3</span>
              </div>
            </div>
            <audio src="/ghost-track.mp3" autoPlay loop />
          </motion.div>
        )}

        {mode === 'blood' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none mix-blend-multiply bg-red-950/20">
             <div className="absolute w-[600px] h-[600px] bg-red-600 rounded-full blur-[180px] opacity-20 animate-pulse"></div>
             <Moon size={400} className="text-red-500 opacity-5 rotate-12" />
          </motion.div>
        )}

        {mode === 'ritual' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-gray-950 via-gray-900/50 to-transparent z-0 flex justify-center items-end pb-20 gap-20 pointer-events-none">
             <Flame className="text-white/80 w-16 h-16 animate-bounce opacity-50 blur-sm" />
             <Flame className="text-white w-24 h-24 animate-pulse opacity-90 blur-sm -mt-10" />
             <Flame className="text-white/80 w-16 h-16 animate-bounce opacity-50 blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- VISUALIZER --- */}
      <div className="mb-8 flex gap-1 h-8 items-end opacity-70">
           {[1,2,3,4,5].map(i => (
             <motion.div 
               key={i} 
               className={`w-2 bg-current ${mode === 'hacker' ? 'bg-green-500' : 'bg-white'}`}
               animate={{ height: [10, 32, 15, 28, 10] }}
               transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "easeInOut" }}
             />
           ))}
      </div>

      {/* TÍTULO CON FEEDBACK VISUAL */}
      <DraggableTitle 
        mode={mode} 
        onLetterClick={handleInput} 
        activeBuffer={buffer} // Pasamos las letras activas
      />

      <motion.div 
          animate={{ opacity: mode === 'default' ? 1 : 0.3, filter: mode === 'default' ? 'blur(0px)' : 'blur(4px)' }}
          className="relative z-10 flex flex-col items-center max-w-4xl"
      >
          {/* Subtítulos */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-12 opacity-80">
            <span>Lo-fi Folk</span>
            <span className={mode === 'default' ? 'text-purple-500' : 'text-current'}>•</span>
            <span>Electronic</span>
            <span className={mode === 'default' ? 'text-purple-500' : 'text-current'}>•</span>
            <span>Ambient</span>
          </div>

          {/* Iconos de Navegación */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-16">
            {[
              { icon: Guitar, label: "Música", id: "#releases" },
              { icon: Laptop, label: "Proyectos", id: "#projects" },
              { icon: Book, label: "Diary", id: "#diary" },
              { icon: Terminal, label: "Bunker", id: "#bunker" }
            ].map((tool, i) => (
              <Button
                variant="ghost"
                key={i}
                onClick={() => scrollTo(tool.id)}
                className="group flex flex-col items-center gap-2 text-current hover:text-purple-400 hover:-translate-y-1 transition-all duration-300 w-auto h-auto p-0"
              >
                <div className="p-3 bg-white/5 border border-white/10 rounded-full group-hover:border-purple-500/50 backdrop-blur-sm">
                   <tool.icon size={20} />
                </div>
                <span className="text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap">{tool.label}</span>
              </Button>
            ))}
          </div>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Button
              onClick={() => scrollTo('#releases')}
              className="px-8 py-4 bg-white text-black font-black uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-2 rounded-sm"
            >
              <Play size={16} fill="currentColor" /> Bloodmoon EP
            </Button>
            
            <Button
              onClick={() => scrollTo('#cosmic')}
              variant='outline'
              className="px-8 py-4 border-white/20 text-current font-bold uppercase tracking-wider hover:bg-white/10 backdrop-blur-md flex items-center gap-2 rounded-sm"
            >
              <Headphones size={16} /> Productora
            </Button>
          </div>
      </motion.div>

      <div className="absolute bottom-12 animate-bounce opacity-50">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}

    