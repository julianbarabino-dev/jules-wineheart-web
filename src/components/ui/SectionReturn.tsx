"use client";

import React from "react";
import { ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

interface SectionReturnProps {
  href: string; 
}

export default function SectionReturn({ href }: SectionReturnProps) {
  const scrollToSection = () => {
    if (href === "#hero" || href === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex justify-center py-8 z-10 relative pointer-events-none">
      <motion.button
        onClick={scrollToSection}
        // CAMBIO: Opacidad al 100% desde el inicio
        initial={{ opacity: 1, y: 0 }} 
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-auto p-2 rounded-full hover:bg-white/10 group transition-all cursor-pointer"
        title="Volver a la sección anterior"
      >
        {/* CAMBIO: text-white/80 para que sea bien visible (antes era /30) */}
        <ChevronUp 
          className="text-white/80 group-hover:text-green-400 transition-colors duration-300" 
          size={30} 
        />
      </motion.button>
    </div>
  );
}
