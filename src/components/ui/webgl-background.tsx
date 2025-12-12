"use client";

import React, { useEffect, useRef } from 'react';

export default function WebglBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  
  const speedRef = useRef(0.2);       
  const isRadioActiveRef = useRef(false);
  // Nueva referencia para guardar el BPM actual
  const currentBpmRef = useRef(120); 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- CONFIGURACIÓN ---
    const NUM_STARS = 400;
    const STAR_DEPTH = 1500; 
    const BASE_SPEED = 0.2;
    
    // NOTA: La velocidad "WARP" ahora se calcula dinámicamente

    const stars: { x: number; y: number; z: number; prevZ: number }[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: Math.random() * window.innerWidth - centerX,
        y: Math.random() * window.innerHeight - centerY,
        z: Math.random() * STAR_DEPTH,
        prevZ: Math.random() * STAR_DEPTH
      });
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // --- LOOP DE ANIMACIÓN ---
    const animate = () => {
      // CALCULO DINÁMICO DE VELOCIDAD
      // Si está activo, usamos (BPM / 15). Ejemplo: 120 / 15 = 8 (Tu velocidad favorita)
      // Si el track es rápido (150bpm), irá a 10. Si es lento (90bpm), irá a 6.
      const warpSpeed = currentBpmRef.current / 15;
      
      const targetSpeed = isRadioActiveRef.current ? warpSpeed : BASE_SPEED;
      
      // Aceleración de 0.02 (lenta y épica)
      speedRef.current += (targetSpeed - speedRef.current) * 0.02; 

      ctx.fillStyle = isRadioActiveRef.current ? 'rgba(3, 3, 3, 0.3)' : 'rgba(3, 3, 3, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach((star) => {
        star.z -= speedRef.current;

        if (star.z <= 0) {
          star.z = STAR_DEPTH;
          star.prevZ = STAR_DEPTH;
          star.x = Math.random() * canvas.width - cx;
          star.y = Math.random() * canvas.height - cy;
        }

        const k = 128.0 / star.z;
        const x = star.x * k + cx;
        const y = star.y * k + cy;

        const prevK = 128.0 / (star.prevZ > star.z ? star.prevZ : star.z + speedRef.current); 
        const prevX = star.x * prevK + cx;
        const prevY = star.y * prevK + cy;

        star.prevZ = star.z;

        const size = (1 - star.z / STAR_DEPTH) * 2.5;
        let alpha = (1 - star.z / STAR_DEPTH);
        if (alpha < 0) alpha = 0;

        ctx.beginPath();
        
        if (speedRef.current > 2) {
            ctx.lineWidth = size;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`; 
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.arc(x, y, size > 0 ? size : 0, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // --- ESCUCHAR EVENTOS (CON BPM) ---
    const handleRadioChange = (e: CustomEvent) => {
        isRadioActiveRef.current = e.detail.isPlaying;
        if (e.detail.bpm) {
            currentBpmRef.current = e.detail.bpm;
        }
    };

    window.addEventListener('radio-state-change' as any, handleRadioChange);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('radio-state-change' as any, handleRadioChange);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1] pointer-events-none bg-[#030303]"
    />
  );
}
