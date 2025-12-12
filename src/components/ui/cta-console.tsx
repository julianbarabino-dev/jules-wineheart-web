"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion"; 
import { Terminal } from "lucide-react";

export default function CTAConsole() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inputVal, setInputVal] = useState("");

  const [isIntroDone, setIsIntroDone] = useState(false);

  // Referencia para saber cuándo la sección es visible
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 }); 

  // --- EFECTO DE ESCRITURA ---
  const fullIntroText = "Deja tu mail para enterarte de los próximos lanzamientos y novedades. Gracias por apoyar.";
  const [displayedIntro, setDisplayedIntro] = useState("");
  
  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedIntro(fullIntroText.slice(0, index + 1));
      index++;
      
      if (index > fullIntroText.length) {
        clearInterval(intervalId);
        setIsIntroDone(true);
      }
    }, 50); 

    return () => clearInterval(intervalId);
  }, [isInView]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // --- AUTOFOCUS AUTOMÁTICO AL TERMINAR DE ESCRIBIR ---
  useEffect(() => {
    if (isIntroDone) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isIntroDone]);

  const keepFocus = () => {
    if (isIntroDone) {
      inputRef.current?.focus();
    }
  };

  // --- AQUÍ ESTÁ LA MAGIA: CONEXIÓN CON EL BACKEND ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    if (step === 0) {
      // Paso 1: Guardamos Nombre
      setName(inputVal);
      setInputVal("");
      setStep(1);
    } else if (step === 1) {
      // Paso 2: Guardamos Mail y ENVIAMOS
      const emailValue = inputVal;
      setEmail(emailValue);
      setInputVal("");
      setStep(2); // Muestra "ENCRIPTANDO DATOS..."

      try {
        // Llamada a tu API (que guarda en Firebase)
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, email: emailValue }),
        });

        if (response.ok) {
          // Si el servidor dice OK, esperamos 1.5s para dramatismo y mostramos ÉXITO
          setTimeout(() => {
            setStep(3);
          }, 1500);
        } else {
          console.error("Error del servidor");
          // Aquí podrías manejar un error visual si quisieras, por ahora solo loguea
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="w-full py-20 px-4 flex justify-center" 
      onClick={keepFocus}
    >
      {/* TEMA AMARILLO (AMBER) */}
      <div className="w-full max-w-2xl bg-black/90 border border-yellow-500/30 rounded-lg p-6 sm:p-10 font-mono text-sm sm:text-base shadow-[0_0_30px_rgba(234,179,8,0.15)] relative overflow-hidden group cursor-text">
        
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_50%,rgba(234,179,8,0.2)_50%)] bg-[length:100%_4px]" />

        <div className="flex justify-between items-center text-yellow-700 mb-6 border-b border-yellow-900/50 pb-2 select-none">
          <div className="flex gap-2 items-center text-yellow-600">
            <Terminal size={16} />
            <span>JV_NET_UPLINK.EXE</span>
          </div>
          <span className="text-yellow-400 font-bold tracking-widest animate-pulse drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
            CONTACT
          </span>
        </div>

        <div className="flex flex-col gap-2 text-yellow-500">
            
          {/* Texto Intro */}
          <div className="opacity-90 mb-4 text-yellow-400/80 leading-relaxed min-h-[3rem]">
            <span className="animate-pulse font-bold mr-2">{">"}</span>
            {displayedIntro}
            
            {!isIntroDone && (
              <span className="animate-pulse ml-1 inline-block bg-yellow-500 w-2 h-4 align-middle" />
            )}
          </div>

          {/* --- ZONA DE INTERACCIÓN --- */}
          {isIntroDone && (
            <>
              {/* Paso 0: Nombre */}
              {step >= 0 && (
                 <div className="flex flex-col">
                    <span className="text-yellow-400 font-bold drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
                      <span className="animate-pulse mr-2">{">"}</span>
                      INGRESE IDENTIDAD (NOMBRE):
                    </span>
                    {step > 0 && <span className="text-yellow-600/60 ml-4">{name}</span>}
                 </div>
              )}

              {/* Paso 1: Mail */}
              {step >= 1 && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col mt-2">
                    <span className="text-yellow-400 font-bold drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
                      <span className="animate-pulse mr-2">{">"}</span>
                      INGRESE FRECUENCIA (EMAIL):
                    </span>
                    {step > 1 && <span className="text-yellow-600/60 ml-4">{email}</span>}
                 </motion.div>
              )}

              {/* Paso 2: Procesando */}
              {step === 2 && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-yellow-200 animate-pulse">
                    {">"} ENCRIPTANDO DATOS... SUBIENDO AL SISTEMA...
                 </motion.div>
              )}

              {/* Paso 3: Éxito */}
              {step === 3 && (
                 <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="mt-4 text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"
                 >
                    {">"} ¡EXITO! GRACIAS POR REGISTRARTE {name.toUpperCase()}. BIENVENID@ A LA RED. JVLES.
                 </motion.div>
              )}

              {/* Input */}
              {step < 2 && (
                <form onSubmit={handleSubmit} className="relative mt-2 flex items-center">
                  <span className="text-yellow-500 mr-2 animate-pulse">{">"}</span>
                  
                  <input
                    ref={inputRef}
                    type={step === 1 ? "email" : "text"}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-yellow-100 font-bold uppercase tracking-wider caret-transparent placeholder-yellow-900/50"
                    autoComplete="off"
                  />
                  
                  <motion.span 
                     className="absolute pointer-events-none bg-yellow-500 text-black px-1 shadow-[0_0_10px_#eab308]"
                     style={{ left: `calc(${inputVal.length}ch + 20px)` }}
                     animate={{ opacity: [1, 0] }}
                     transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    █
                  </motion.span>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}