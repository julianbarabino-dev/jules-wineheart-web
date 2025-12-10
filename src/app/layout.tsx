import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jules Wineheart | Cosmic Vicar Records",
  description: "Lo-fi Folk, Electronic & Ambient Music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      {/* FONDO VIOLETA OSCURO (#13051c) */}
      <body className={`${inter.className} bg-[#13051c] text-white antialiased relative`}>
        
        {/* 1. TEXTURA DE RUIDO (NOISE) */}
        <div 
          className="fixed inset-0 z-[-1] opacity-[0.08] pointer-events-none"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }}
        />

        {/* 2. DEGRADADO COSMIC VIOLET */}
        <div className="fixed inset-0 z-[-2] bg-gradient-to-b from-[#1e0a2e] via-[#13051c] to-[#05020a] pointer-events-none"></div>

        {children}
      </body>
    </html>
  );
}

