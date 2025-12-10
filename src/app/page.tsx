import Header from '@/components/layout/header';
import Hero from '@/app/hero';
import Releases from '@/components/sections/releases';
import Projects from '@/components/sections/projects';
import CosmicVicar from '@/components/sections/cosmic-vicar';
import Bunker from '@/components/sections/bunker';
import SoundDiary from '@/components/sections/sound-diary';
import Footer from '@/components/sections/footer';
import { generateBunkerSignals } from '@/ai/flows/generate-bunker-signals';
import AnimatedSection from '@/components/layout/animated-section';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/i18n-config';

export default async function Home() {
  const lang: Locale = 'es'; // Hardcoded to spanish for now
  const bunkerSignals = await generateBunkerSignals();
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header dictionary={dictionary.header} />
      <main className="flex flex-col">
        <Hero dictionary={dictionary.hero} />
        <AnimatedSection>
          <Releases dictionary={dictionary.releases} />
        </AnimatedSection>
        <AnimatedSection>
          <Projects dictionary={dictionary.projects} />
        </AnimatedSection>
        <AnimatedSection>
          <CosmicVicar dictionary={dictionary.cosmicVicar} />
        </AnimatedSection>
        <AnimatedSection>
          <Bunker signals={bunkerSignals} dictionary={dictionary.bunker} />
        </AnimatedSection>
        <AnimatedSection>
          <SoundDiary dictionary={dictionary.soundDiary} />
        </AnimatedSection>
        <AnimatedSection>
          <Footer dictionary={dictionary.footer} />
        </AnimatedSection>
      </main>
    </>
  );
}
