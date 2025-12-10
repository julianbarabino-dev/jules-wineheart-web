"use client";
import { useEffect } from 'react';

export default function ConsoleMessage() {
  useEffect(() => {
    const message = `
    %c JULES WINEHEART - SYSTEM ACCESS %c
    
    > ESTADO: CONECTADO
    > MENSAJE ENTRANTE:
    
    ---------------------------------------------------
    "Are you There?"
    ---------------------------------------------------
    
    `;
    console.log(message, "color: #a855f7; font-weight: bold; font-size: 16px; background: #000; padding: 10px;", "color: #fff");
  }, []);

  return null; // No renderiza nada visual
}
