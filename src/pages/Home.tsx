import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Services } from '@/components/sections/Services';
import { Showcase } from '@/components/sections/Showcase';
import { Testimonials } from '@/components/sections/Testimonials';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Showcase />
      <Portfolio />
      <Testimonials />
      <Contact />
    </>
  );
}
