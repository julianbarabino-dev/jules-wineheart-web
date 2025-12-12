import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer"; 
import Hero from "@/components/sections/hero";
import Releases from "@/components/sections/releases";
import CTAInstagram from "@/components/ui/cta-instagram"; 
import Projects from "@/components/sections/projects";
import CosmicVicar from "@/components/sections/cosmic-vicar"; 
import Bunker from "@/components/sections/bunker";
import ConsoleMessage from "@/components/utils/console-message";
import { bunkerSignals } from "@/lib/data";
import WebglBackground from "@/components/ui/webgl-background";

// 1. IMPORTAMOS TU COMPONENTE NUEVO
import SectionReturn from "@/components/ui/SectionReturn"; 

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen text-white selection:bg-purple-500/30">

      <WebglBackground />
      <ConsoleMessage /> 
      <Header />
      
      {/* SECCIÓN 1: HERO (ID: hero) */}
      <div id="hero">
        <Hero />
      </div>

      {/* SECCIÓN 2: RELEASES (ID: releases) */}
      <div id="releases">
        <Releases />
      </div>
      {/* Botón: Vuelve a Hero */}
      <SectionReturn href="#hero" />
      
      <CTAInstagram /> 
      
      {/* SECCIÓN 3: PROJECTS (ID: projects) */}
      <div id="projects">
        <Projects />
      </div>
      {/* Botón: Vuelve a Releases */}
      <SectionReturn href="#releases" />

      {/* SECCIÓN 4: COSMIC VICAR (ID: cosmic-vicar) */}
      <div id="cosmic-vicar">
        <CosmicVicar />
      </div>
      {/* Botón: Vuelve a Projects */}
      <SectionReturn href="#projects" />

      {/* SECCIÓN 5: BUNKER (ID: bunker) */}
      <div id="bunker">
        <Bunker signals={bunkerSignals} />
      </div>
     
      <Footer />
    </main>
  );
}