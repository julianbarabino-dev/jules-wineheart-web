"use client";

import { ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

export default function SectionReturn({ href }: { href: string }) {
  const scrollToSection = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex justify-center py-10 z-20 relative pointer-events-none">
      <motion.a
        href={href}
        onClick={scrollToSection}
        // Al hacer hover (desktop) o tap (mobile), el círculo RECIÉN ahí se pone verde
        whileHover={{ 
            scale: 1.1, 
            backgroundColor: "rgba(74, 222, 128, 0.2)", // Fondo verde sutil
            borderColor: "rgba(74, 222, 128, 0.6)", // Borde verde
            boxShadow: "0 0 20px rgba(74, 222, 128, 0.3)" // Glow verde
        }}
        whileTap={{ scale: 0.9 }} // Click rápido en mobile

        // CLASES BASE:
        // - text-[#4ade80]: La flecha es VERDE SIEMPRE.
        // - border-white/10: El borde base es gris/blanco sutil (SIN GLOW VERDE).
        // - bg-white/5: Fondo oscuro transparente.
        className="pointer-events-auto p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[#4ade80] transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center"
        aria-label="Volver a la sección anterior"
      >
        <ChevronUp size={24} />
      </motion.a>
    </div>
  );
}