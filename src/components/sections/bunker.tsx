"use client";

import { Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Componente Typewriter mejorado: Espera la señal de 'start' y escribe con ritmo humano
const Typewriter = ({ text, start }: { text: string, start: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (start && !hasStarted) {
      setHasStarted(true);
      let i = 0;
      
      const typeChar = () => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
          // Velocidad variable (entre 50ms y 150ms) para que parezca humano
          const randomSpeed = Math.floor(Math.random() * 100) + 50; 
          setTimeout(typeChar, randomSpeed);
        }
      };
      
      typeChar();
    }
  }, [start, hasStarted, text]);

  return <span>{displayedText}</span>;
};

export default function Bunker({ signals }: { signals: any[] }) {
  // Ref para detectar cuándo la sección entra en pantalla
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Se activa cuando entra bien en pantalla

  return (
    <section id="bunker" className="py-24 border-t border-white/5 relative z-10" ref={ref}>
        <div className="container mx-auto px-6 max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
                <Terminal size={20} className="text-green-500" />
                <h3 className="text-xl font-bold uppercase tracking-widest text-green-500 font-mono">Signal from the Bunker</h3>
                {/* Luz de estado: Parpadea rápido si está activo */}
                <div className={`w-2 h-2 bg-green-500 rounded-full ml-auto shadow-[0_0_10px_#22c55e] ${isInView ? 'animate-ping' : 'opacity-50'}`}></div>
            </div>

            <div className="border border-green-900/30 bg-black/40 backdrop-blur-sm p-6 font-mono text-xs md:text-sm shadow-[0_0_20px_rgba(34,197,94,0.05)] rounded-lg">
                <div className="flex flex-col gap-8">
                    {signals.map((signal, index) => (
                        <div key={index} className="flex flex-col gap-2 border-b border-green-900/20 pb-6 last:border-0 last:pb-0 min-h-[3em]">
                            <div className="flex items-center gap-3 text-green-700 text-[10px] font-bold">
                                <span>[{signal.date}]</span>
                                <span>{signal.time}</span>
                                <span className="text-green-500">__{signal.status}</span>
                            </div>
                            <p className="text-green-400/90 leading-relaxed">
                                {index === 0 ? (
                                    <>
                                        {/* Solo escribe si 'isInView' es true */}
                                        <Typewriter text={signal.text} start={isInView} />
                                        <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle ml-1"></span>
                                    </>
                                ) : (
                                    signal.text
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
}

