"use client";

import React from 'react';

const style = `
  @keyframes nebula-move-1 {
    0% { transform: translate(0, 0) scale(1.1); opacity: 0.8; }
    30% { transform: translate(-10vw, 15vh) scale(0.9); opacity: 0.6; }
    60% { transform: translate(10vw, -10vh) scale(1.2); opacity: 0.9; }
    100% { transform: translate(0, 0) scale(1.1); opacity: 0.8; }
  }

  @keyframes nebula-move-2 {
    0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    40% { transform: translate(-15vw, -20vh) scale(1.4); opacity: 0.8; }
    80% { transform: translate(5vw, -10vh) scale(1.1); opacity: 0.7; }
    100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  }

  @keyframes nebula-move-3 {
    0% { transform: translate(0, 0) scale(0.9); opacity: 0.5; }
    30% { transform: translate(20vw, -10vh) scale(1.1); opacity: 0.7; }
    70% { transform: translate(-5vw, 15vh) scale(1.0); opacity: 0.6; }
    100% { transform: translate(0, 0) scale(0.9); opacity: 0.5; }
  }

  @keyframes nebula-move-4 {
    0% { transform: translate(0, 0) scale(1.2); opacity: 0.8; }
    50% { transform: translate(-20vw, 5vh) scale(1.0); opacity: 0.7; }
    100% { transform: translate(0, 0) scale(1.2); opacity: 0.8; }
  }

  @keyframes nebula-move-5 {
    0% { transform: translate(0, 0) scale(0.8); opacity: 0.6; }
    40% { transform: translate(10vw, -25vh) scale(1.1); opacity: 0.8; }
    100% { transform: translate(0, 0) scale(0.8); opacity: 0.6; }
  }

  /* Keyframes para las partículas */
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.8; }
  }

  /* Nuevos keyframes de drift para partículas */
  @keyframes particle-drift-1 {
    0% { transform: translate(0, 0); }
    50% { transform: translate(10px, 8px); }
    100% { transform: translate(0, 0); }
  }

  @keyframes particle-drift-2 {
    0% { transform: translate(0, 0); }
    50% { transform: translate(-12px, 5px); }
    100% { transform: translate(0, 0); }
  }

  @keyframes particle-drift-3 {
    0% { transform: translate(0, 0); }
    50% { transform: translate(7px, -10px); }
    100% { transform: translate(0, 0); }
  }
`;

export default function NebulaBackground() {
  const numParticles = 100;
  const driftAnimations = ['particle-drift-1', 'particle-drift-2', 'particle-drift-3'];

  const particles = Array.from({ length: numParticles }).map((_, i) => {
    const size = Math.random() * 2 + 1; // 1-3px
    const delay = Math.random() * 10; // 0-10s
    const twinkleDuration = Math.random() * 3 + 2; // 2-5s
    const driftDuration = Math.random() * 15 + 10; // 10-25s
    const randomDrift = driftAnimations[Math.floor(Math.random() * driftAnimations.length)];

    return (
      <div
        key={i}
        className="absolute rounded-full bg-white/50 blur-[0.5px] mix-blend-screen"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation:
            `twinkle ${twinkleDuration}s ease-in-out infinite alternate ${delay}s, ` +
            `${randomDrift} ${driftDuration}s ease-in-out infinite alternate ${delay}s`,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <style>{style}</style>

      {/* Orbe 1: Violeta Cósmico - Fondo */}
      <div
        className="absolute w-[70vw] h-[70vw] bg-[#6C4AB6]/15 rounded-full blur-[250px] mix-blend-screen"
        style={{
          bottom: '0%', right: '0%', transform: 'translate(20%, 20%)',
          animation: 'nebula-move-1 75s linear infinite'
        }}
      />

      {/* Orbe 2: Azul Noche - Medio */}
      <div
        className="absolute w-[50vw] h-[50vw] bg-[#2A0B40]/20 rounded-full blur-[180px] mix-blend-screen"
        style={{
          top: '40%', left: '30%', transform: 'translate(-50%, -50%)',
          animation: 'nebula-move-2 50s ease-in-out infinite'
        }}
      />

      {/* Orbe 3: Ámbar Quemado - Medio */}
      <div
        className="absolute w-[40vw] h-[40vw] bg-[#FFBF00]/15 rounded-full blur-[160px] mix-blend-screen"
        style={{
          bottom: '15%', left: '5%',
          animation: 'nebula-move-3 45s linear infinite'
        }}
      />

      {/* Orbe 4: Verde Hacker más intenso - Primer Plano */}
      <div
        className="absolute w-[35vw] h-[35vw] bg-[#90EE90]/25 rounded-full blur-[130px] mix-blend-screen"
        style={{
          top: '20%', right: '10%',
          animation: 'nebula-move-4 35s ease-in-out infinite'
        }}
      />

      {/* Orbe 5: Violeta Cósmico más intenso - Primer Plano */}
      <div
        className="absolute w-[40vw] h-[40vw] bg-[#6C4AB6]/25 rounded-full blur-[140px] mix-blend-screen"
        style={{
          bottom: '25%', right: '30%',
          animation: 'nebula-move-5 40s linear infinite'
        }}
      />

      {/* Partículas Cósmicas */}
      {particles}
    </div>
  );
}