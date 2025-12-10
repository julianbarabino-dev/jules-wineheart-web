import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Releases from '@/components/sections/releases';
import Projects from '@/components/sections/projects';
import CosmicVicar from '@/components/sections/cosmic-vicar';
import Bunker from '@/components/sections/bunker';
import SoundDiary from '@/components/sections/sound-diary';
import Footer from '@/components/sections/footer';
import { generateBunkerSignals } from '@/ai/flows/generate-bunker-signals';

export default async function Home() {
  const bunkerSignals = await generateBunkerSignals();

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Releases />
        <Projects />
        <CosmicVicar />
        <Bunker signals={bunkerSignals} />
        <SoundDiary />
        <Footer />
      </main>
    </>
  );
}
