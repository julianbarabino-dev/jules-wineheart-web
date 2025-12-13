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
        // CAMBIO 1: Al hacer hover, el fondo se pone verde matrix transparente
        whileHover={{ scale: 1.1, backgroundColor: "rgba(74, 222, 128, 0.2)" }}
        whileTap={{ scale: 0.9 }}
        // CAMBIOS DE CLASES CSS:
        // - text-white/50 hover:text-green-400  -> Texto pasa a verde neón
        // - hover:border-green-500/50           -> El borde se ilumina en verde
        // - hover:shadow-[0_0_15px_...]         -> Agregamos un resplandor verde intenso
        className="pointer-events-auto p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/50 hover:text-green-400 hover:border-green-500/50 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(74,222,128,0.5)] flex items-center justify-center"
        aria-label="Volver a la sección anterior"
      >
        <ChevronUp size={24} />
      </motion.a>
    </div>
  );
}