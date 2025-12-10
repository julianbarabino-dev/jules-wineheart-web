"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Headphones, ChevronDown, Guitar, Laptop, Book, Keyboard, Terminal, Moon, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURACIÓN DE LOS MODOS SECRETOS ---
// 'target': la palabra que tienes que escribir.
// 'title': el texto que aparecerá gigante en pantalla al ganar.
const SECRET_MODES = {
  default: { 
    target: "",
    title: "JULES WINEHEART", 
    style: "text-white" 
  },
  ghost: { 
    target: "LISTEN",
    title: "LISTEN", 
    style: "text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] font-serif" 
  },
  hacker: { 
    target: "TRUELIES",
    title: "TRUE LIES", 
    style: "text-green-500 font-mono tracking-widest drop-shadow-[0_0_15px_rgba(34,197,94,0.9)]" 
  },
  blood: { 
    target: "LUNA",
    title: "LUNA", 
    style: "text-red-600 font-black tracking-tighter drop-shadow-[0_0_30px_rgba(220,38,38,1)]" 
  },
  ritual: { 
    target: "RITUAL",
    title: "RITUAL", 
    style: "text-neutral-400 font-serif tracking-[1em] uppercase" 
  }
};

// --- COMPONENTE: LLUVIA MATRIX (Visual) ---
const MatrixRain = () => {
  const columns = Array.from({ length: 20 });
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-30 flex justify-between">
      {columns.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -1000 }}
          animate={{ y: 2000 }}
          transition={{ 
            repeat: Infinity, 
            duration: Math.random() * 5 + 5, 
            ease: "linear",
            delay: Math.random() * 5 
          }}
          className="text-green-500 font-mono text-xs writing-vertical-lr leading-none opacity-50 select-none"
          style={{ writingMode: 'vertical-rl' }}
        >
          {/* Genera una cadena larga de 0s y 1s */}
          {Array.from({ length: 30 }).map(() => Math.round(Math.random())).join(" ")}
        </motion.div>
      ))}
    </div>
  );
};

// --- COMPONENTE: TÍTULO INTERACTIVO ---
const InteractiveTitle = ({ 
  text, 
  usedIndices, 
  onLetterClick, 
  mode,
  shake 
}: { 
  text: string, 
  usedIndices: number[], 
  onLetterClick: (char: string, index: number) => void,
  mode: string,
  shake: boolean
}) => {
  const constraintsRef = useRef(null);
  const words = text.split(" ");
  let globalCharIndex = 0;

  // Animación de Entrada
  const introVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(20px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 1.5, ease: "easeOut" } 
    }
  };

  // Animación de Sacudida
  const shakeVariants = {
    idle: { x: 0 },
    shaking: {
      x: [0, -10, 10, -10, 10, 0],
      y: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  };

  const currentStyle = SECRET_MODES[mode as keyof typeof SECRET_MODES]?.style || SECRET_MODES.default.style;

  return (
    <motion.div 
      className="relative z-50 w-full max-w-7xl mx-auto select-none px-4"
      initial="hidden" 
      animate="visible" 
      variants={introVariants}
    >
      <motion.div className="absolute inset-0 w-full h-full pointer-events-none" ref={constraintsRef} />
      
      <AnimatePresence mode="wait">
        <motion.h1
          key={text} 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={shake ? "shaking" : { opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.3 } }}
          variants={shakeVariants}
          className={`flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-2 ${currentStyle}`}
        >
          {words.map((word, wIndex) => (
            <span key={wIndex} className="whitespace-nowrap inline-block">
              {word.split("").map((char) => {
                const myIndex = globalCharIndex++; 
                const isUsed = usedIndices.includes(myIndex);
                const isSecretMode = mode !== 'default';

                return (
                  <motion.span
                    key={myIndex}
                    onTap={() => !isUsed && !isSecretMode && onLetterClick(char, myIndex)}
                    drag={!isSecretMode}
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    
                    // Feedback visual
                    animate={isUsed ? { 
                      color: "#d8b4fe", 
                      textShadow: "0 0 30px #a855f7", 
                      scale: 1.1,
                      y: -5
                    } : { 
                      y: 0, 
                      color: isSecretMode ? "currentColor" : "#ffffff" 
                    }}
                    
                    whileHover={!isUsed && !isSecretMode ? { 
                      scale: 1.2, 
                      color: "#a855f7", 
                      cursor: "pointer" 
                    } : {}}
                    
                    className="inline-block text-5xl sm:text-7xl md:text-9xl font-black leading-none p-1 transition-colors"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  );
};

// --- COMPONENTE: PROGRESO DE LA PALABRA (Tipo Ahorcado) ---
const WordProgressDisplay = ({ target, current }: { target: string, current: string }) => {
  // Ocupa espacio pero es invisible si no hay palabra objetivo.
  if (!target) return <div className="h-12 mb-12 opacity-0">...</div>; 

  const slots = target.split("");
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 sm:gap-4 mb-12 h-12 items-end justify-center z-50 relative"
    >
      {slots.map((char, i) => {
        const found = current[i]; // Letra encontrada en la posición i
        return (
          <div key={i} className="flex flex-col items-center gap-2 w-6 sm:w-10">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={found ? { opacity: 1, scale: 1 } : { opacity: 0 }}
              className="text-xl sm:text-2xl font-mono text-purple-400 font-bold"
            >
              {found || "_"} {/* Muestra "_" si no se ha encontrado */}
            </motion.span>
            <div className={`w-full h-1 rounded transition-colors duration-300 ${found ? "bg-purple-500 shadow-[0_0_10px_#a855f7]" : "bg-white/10"}`} />
          </div>
        )
      })}
    </motion.div>
  );
};

// --- HERO PRINCIPAL ---
export default function Hero() {
  const [mode, setMode] = useState('default'); 
  
  // LOGICA JUEGO
  const [buffer, setBuffer] = useState("");         
  const [targetWord, setTargetWord] = useState(""); 
  const [usedIndices, setUsedIndices] = useState<number[]>([]); 
  
  const [shake, setShake] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  // MANEJO DE ENTRADA (Teclado o Clic)
  const processInput = (char: string, index: number = -1) => {
    // Si ya estamos en un modo, resetear al default con cualquier tecla
    if (mode !== 'default') {
        setMode('default');
        setShowOverlay(false);
        setBuffer("");
        setTargetWord("");
        setUsedIndices([]);
        return;
    }

    const upperChar = char.toUpperCase();
    const nextCharIndex = buffer.length;

    // 1. Empezar nueva palabra
    let currentTarget = targetWord;
    if (buffer === "") {
      const foundKey = Object.keys(SECRET_MODES).find(key => 
        key !== 'default' && SECRET_MODES[key as keyof typeof SECRET_MODES].target.startsWith(upperChar)
      );
      
      if (foundKey) {
        const wordToMatch = SECRET_MODES[foundKey as keyof typeof SECRET_MODES].target;
        currentTarget = wordToMatch;
        setTargetWord(wordToMatch);
      } else {
        return; 
      }
    }

    // 2. Verificar secuencia
    if (currentTarget && currentTarget[nextCharIndex] === upperChar) {
      // ACIERTO
      const newBuffer = buffer + upperChar;
      setBuffer(newBuffer);
      if (index !== -1) setUsedIndices([...usedIndices, index]); 

      // 3. VICTORIA
      if (newBuffer === currentTarget) {
        const winningModeKey = Object.keys(SECRET_MODES).find(key => 
            key !== 'default' && SECRET_MODES[key as keyof typeof SECRET_MODES].target === currentTarget
        );

        if (winningModeKey) {
          setTimeout(() => {
            setShake(true);      
            setMode(winningModeKey); 
            
            setTimeout(() => {
              setShake(false);
              setShowOverlay(true); 
              setBuffer("");
              setTargetWord("");
              setUsedIndices([]); 
            }, 600);
          }, 200);
        }
      }
    } else {
      // ERROR: Resetear
      setBuffer("");
      setTargetWord("");
      setUsedIndices([]);
    }
  };

  // Listener Teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Solo aceptamos letras, Escape, y no procesamos si hay modificadores (Ctrl, Shift, etc)
      if (e.key === 'Escape') processInput('ESCAPE');
      if (/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.altKey && !e.metaKey) processInput(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, buffer, targetWord]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // TEXTO DEL TÍTULO: Depende del modo actual
  const currentTitleText = SECRET_MODES[mode as keyof typeof SECRET_MODES]?.title || SECRET_MODES.default.title;

  return (
    <section className={`relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden transition-colors duration-1000 z-20
      ${mode === 'default' ? '' : ''}
      ${mode === 'hacker' ? 'bg-black text-green-500 font-mono' : ''}
      ${mode === 'blood' ? 'bg-[#1a0505] text-red-400' : ''}
      ${mode === 'ritual' ? 'bg-gray-950 text-neutral-500 grayscale' : ''}
      ${mode === 'ghost' ? 'bg-[#0a0a0a] text-white' : ''}
    `}>
      
      {/* EFECTOS DE FONDO ESPECIALES */}
      {showOverlay && mode === 'hacker' && <MatrixRain />}

      <AnimatePresence>
        {/* OVERLAYS GLOBALES */}
        {showOverlay && mode === 'hacker' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="bg-black border border-green-500 text-green-500 px-6 py-2 font-mono text-sm shadow-[0_0_20px_rgba(0,255,0,0.6)] animate-pulse">
              &gt; SYSTEM BREACH DETECTED.
            </div>
          </motion.div>
        )}

        {showOverlay && mode === 'ghost' && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-12 right-6 md:right-12 z-50 pointer-events-none">
            <div className="bg-zinc-900 border-4 border-zinc-700 rounded-xl p-4 shadow-2xl rotate-3">
               <div className="flex gap-4 mb-2 justify-center">
                  <div className="w-8 h-8 rounded-full bg-black border-2 border-zinc-600 animate-spin"></div>
                  <div className="w-8 h-8 rounded-full bg-black border-2 border-zinc-600 animate-spin"></div>
               </div>
               <span className="text-white font-mono text-[10px] block text-center bg-black/50 rounded px-2">PLAYING: GHOST_TRACK...</span>
            </div>
            <audio src="/ghost-track.mp3" autoPlay loop />
          </motion.div>
        )}

        {showOverlay && mode === 'blood' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none bg-red-900/20">
             <Moon size={300} className="text-red-600 opacity-20 animate-pulse" />
          </motion.div>
        )}

        {showOverlay && mode === 'ritual' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bottom-0 inset-x-0 flex justify-center pb-20 gap-10 pointer-events-none">
             <Flame className="text-white w-20 h-20 animate-bounce opacity-50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TÍTULO DINÁMICO */}
      <InteractiveTitle 
        text={currentTitleText} 
        usedIndices={usedIndices} 
        onLetterClick={processInput} 
        mode={mode}
        shake={shake}
      />

      {/* PROGRESO DE LA PALABRA (Solo visible en modo default) */}
      {mode === 'default' && <WordProgressDisplay target={targetWord} current={buffer} />}
      {mode !== 'default' && <div className="h-12 mb-12 opacity-0"></div>}
      

      {/* CONTENIDO NORMAL */}
      <motion.div 
          animate={{ opacity: mode === 'default' ? 1 : 0.2, filter: mode === 'default' ? 'blur(0px)' : 'blur(5px)' }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center max-w-4xl"
      >
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-12 opacity-80">
            <span>Lo-fi Folk</span> • <span>Electronic</span> • <span>Ambient</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-16">
            {[
              { icon: Guitar, label: "Música", id: "#releases" },
              { icon: Laptop, label: "Proyectos", id: "#projects" },
              { icon: Book, label: "Diary", id: "#diary" },
              { icon: Terminal, label: "Bunker", id: "#bunker" }
            ].map((tool, i) => (
              <button 
                key={i}
                onClick={() => scrollTo(tool.id)}
                className="group flex flex-col items-center gap-2 text-current hover:text-purple-400 transition-all duration-300"
                title={tool.label}
              >
                <div className="p-3 bg-white/5 border border-white/10 rounded-full group-hover:border-purple-500/50 backdrop-blur-sm">
                   <tool.icon size={20} />
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => scrollTo('#releases')}
              className="px-8 py-4 bg-white text-black font-black uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-2 rounded-sm"
            >
              <Play size={16} fill="currentColor" /> Bloodmoon EP
            </button>
            
            <button 
              onClick={() => scrollTo('#cosmic')}
              className="px-8 py-4 border border-white/20 text-current font-bold uppercase tracking-wider hover:bg-white/10 backdrop-blur-md flex items-center gap-2 rounded-sm"
            >
              <Headphones size={16} /> Productora
            </button>
          </div>
      </motion.div>

      <div className="absolute bottom-12 animate-bounce opacity-50">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
