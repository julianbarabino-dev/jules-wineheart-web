"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  // Ya no necesitamos detectar el scroll porque la barra no te persigue.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#releases", label: "Música" },
    { href: "#projects", label: "Proyectos" },
    { href: "#cosmic", label: "Cosmic Vicar" },
    { href: "#bunker", label: "Bunker" },
    { href: "#diary", label: "Sound Diary" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        // CAMBIO CLAVE: 'absolute' en lugar de 'fixed'.
        // Esto hace que el menú se quede arriba y no baje contigo.
        "absolute top-0 left-0 w-full z-50 py-8 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 max-w-[1080px] flex justify-between items-center">
        
        {/* LOGO */}
        <Link 
            href="/" 
            className="text-xl md:text-2xl font-black font-headline tracking-tighter text-white uppercase italic cursor-pointer z-50 select-none hover:text-purple-500 transition-colors"
        >
          JW<span className="text-purple-500">.</span>CVR
        </Link>

        {/* Menú de Escritorio (Limpio, sin fondos) */}
        <nav className="hidden md:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
          {navLinks.map((link) => (
            <button 
                key={link.href} 
                onClick={() => scrollToSection(link.href)} 
                className="transition-colors hover:text-white hover:line-through decoration-purple-500"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Botón Menú Móvil */}
        <div className="md:hidden flex items-center">
            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 focus:outline-none hover:text-purple-400 transition-colors relative z-50"
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Menú Desplegable Móvil (Full Screen Overlay) */}
        {mobileMenuOpen && (
            <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 animate-in fade-in duration-200">
                {navLinks.map((link) => (
                  <button 
                    key={link.href} 
                    onClick={() => scrollToSection(link.href)} 
                    className="text-xl font-black uppercase tracking-widest text-white hover:text-purple-500 transition-colors"
                  >
                        {link.label}
                  </button>
                ))}
            </div>
        )}

      </div>
    </header>
  );
};

export default Header;
