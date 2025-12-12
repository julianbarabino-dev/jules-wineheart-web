"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Play, Pause } from "lucide-react";

// Enlaces del menú
const navItems = [
  { name: "Música", href: "#releases" },
  { name: "Proyectos", href: "#projects" },
  { name: "CVR", href: "#cosmic-vicar" },
  { name: "Bunker", href: "#bunker" },
];

// --- TU PLAYLIST ---
const PLAYLIST = [
  "/tracks/track-1.mp3",
  // "/tracks/track-2.mp3",
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // --- LÓGICA DE RADIO ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackName, setTrackName] = useState("");      // El nombre real completo
  const [displayedText, setDisplayedText] = useState(""); // El nombre que se va escribiendo de a poco
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- EFECTO MAQUINA DE ESCRIBIR (DOS STYLE) ---
  useEffect(() => {
    if (!trackName) {
        setDisplayedText("");
        return;
    }

    // Reseteamos el texto visible antes de empezar a escribir el nuevo
    setDisplayedText("");
    
    let currentIndex = 0;
    const typingSpeed = 150; // Velocidad en ms (más alto = más lento). 150ms es bien retro.

    const typingInterval = setInterval(() => {
      // Tomamos desde el inicio hasta el índice actual + 1
      setDisplayedText(trackName.slice(0, currentIndex + 1));
      currentIndex++;

      // Si terminamos de escribir toda la palabra, limpiamos el intervalo
      if (currentIndex >= trackName.length) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    // Limpieza si el componente se desmonta o cambia el track rápido
    return () => clearInterval(typingInterval);
  }, [trackName]); // Se ejecuta cada vez que cambia el trackName

  const playRandomTrack = () => {
    if (!audioRef.current) return;
    
    const randomIndex = Math.floor(Math.random() * PLAYLIST.length);
    const selectedTrack = PLAYLIST[randomIndex];
    
    // Extraemos el nombre limpio del archivo (ej: "track-1.mp3")
    const cleanName = selectedTrack.split('/').pop() || "unknown.mp3";
    setTrackName(cleanName); // Esto dispara el efecto de escritura

    audioRef.current.src = selectedTrack;
    audioRef.current.play().catch(e => console.error("Error playing:", e));
    setIsPlaying(true);
  };

  const toggleRadio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src) {
        playRandomTrack();
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.5;

    const handleEnded = () => { playRandomTrack(); };
    const handleRemotePlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        playRandomTrack();
      }
    };

    audioRef.current.addEventListener('ended', handleEnded);
    window.addEventListener('trigger-jules-radio', handleRemotePlay);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('trigger-jules-radio', handleRemotePlay);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled ? "bg-black/95 backdrop-blur-md py-2 border-b border-white/5" : "bg-transparent py-4"
  }`;

  return (
    <header className={baseClass}>
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        
        {/* --- LOGO + RADIO + CONSOLA DOS --- */}
        <button 
          onClick={toggleRadio} 
          className="group flex items-center gap-4 outline-none text-left"
          title="JVLES Radio"
        >
          
          {/* GRUPO DE ICONOS (Play + Logo) */}
          <div className="flex items-center gap-3">
            {/* 1. EL ÍCONO PLAY/PAUSE */}
            <div className={`transition-colors duration-300 ${
                isPlaying ? "text-green-500 drop-shadow-[0_0_8px_#4ade80]" : "text-white/40 group-hover:text-green-500"
            }`}>
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </div>

            {/* 2. EL LOGO SVG */}
            <div className="relative h-6 w-auto md:h-7 transition-all duration-300 filter brightness-125 group-hover:sepia-[100%] group-hover:saturate-[1000%] group-hover:hue-rotate-[80deg] group-hover:scale-105">
                <img 
                src="/icons/jv-logo-icon.svg"
                alt="JV Logo"
                className="h-full w-full object-contain"
                />
            </div>
          </div>

          {/* 3. CONSOLA DOS (Typewriter Effect) */}
          <AnimatePresence>
            {isPlaying && (
                <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="overflow-hidden whitespace-nowrap hidden sm:block" 
                >
                    <div className="font-mono text-[10px] md:text-xs text-green-500 font-bold tracking-wider bg-green-500/5 px-2 py-1 rounded border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)] min-w-[120px]">
                        <span className="opacity-70">C:\jvmusic&gt;</span>
                        {/* AQUI SE IMPRIME LA VARIABLE ANIMADA */}
                        <span className="text-green-400">{displayedText}</span>
                        {/* Cursor parpadeante */}
                        <span className="animate-pulse ml-1 inline-block bg-green-500 w-1.5 h-3 align-middle"></span>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
          
        </button>

        {/* --- NAVEGACIÓN ESCRITORIO --- */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-green-400 transition-colors duration-300
              after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full after:shadow-[0_0_8px_#4ade80]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* BOTÓN MENÚ MÓVIL */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white/70 hover:text-green-500 transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 md:hidden"
          >
            <nav className="flex flex-col items-center py-8 gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-sm uppercase tracking-[0.2em] text-white/80 hover:text-green-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}