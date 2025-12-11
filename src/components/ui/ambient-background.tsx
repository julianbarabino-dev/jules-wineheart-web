"use client";

// Ya NO necesitamos 'motion' de framer-motion, solo CSS y React
import React from 'react';

// Estilos de la animación CSS inyectados
const style = `
  @keyframes nebula-move-1 {
    0% { transform: translate(0, 0) scale(1); opacity: 0.7; }
    50% { transform: translate(150px, 100px) scale(1.3); opacity: 0.9; }
    100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
  }

  @keyframes nebula-move-2 {
    0% { transform: translate(0, 0) scale(1.1); opacity: 0.8; }
    40% { transform: translate(-100px, 50px) scale(0.9); opacity: 0.6; }
    80% { transform: translate(50px, -50px) scale(1.2); opacity: 0.9; }
    100% { transform: translate(0, 0) scale(1.1); opacity: 0.8; }
  }

  @keyframes nebula-move-3 {
    0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    60% { transform: translate(-50px, -150px) scale(1.4); opacity: 0.8; }
    100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  }
`;

export default function AmbientBackground() {
  return (
    // Aseguramos que el contenedor esté detrás de todo, pero visible (z-1)
    <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
      
      {/* INYECTAMOS LOS ESTILOS CSS CON LA ANIMACIÓN NATIVA */}
      <style>{style}</style>

      {/* Orbe 1: Verde Menta (Usando la animación CSS) */}
      <div
        className="absolute w-[45vw] h-[45vw] bg-green-400/20 rounded-full blur-[150px] mix-blend-screen"
        style={{ 
          top: '10%', left: '15%', 
          animation: 'nebula-move-1 30s ease-in-out infinite' 
        }}
      />

      {/* Orbe 2: Violeta Cósmico (Usando la animación CSS) */}
      <div
        className="absolute w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[180px] mix-blend-screen"
        style={{ 
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)', // Centrado
          animation: 'nebula-move-2 45s linear infinite' 
        }}
      />

      {/* Orbe 3: Azul Profundo (Usando la animación CSS) */}
      <div
        className="absolute w-[30vw] h-[30vw] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen"
        style={{ 
          bottom: '5%', right: '10%', 
          animation: 'nebula-move-3 40s ease-in-out infinite' 
        }}
      />

    </div>
  );
}
