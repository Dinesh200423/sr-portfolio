import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';

/** Full-bleed cinematic band featuring the wedding ceremony photograph. */
export function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-8%', '8%']);

  return (
    <section ref={ref} aria-label="Featured wedding photograph" className="relative isolate flex min-h-[85svh] items-end overflow-hidden">
      <m.div className="absolute -inset-y-[10%] inset-x-0 -z-10" style={{ y }}>
        <Photo
          src="marriage.jpg.webp"
          alt="Bride in a red silk saree smiling beside the groom, both wearing marigold garlands, as family bless them during the wedding ritual"
          sizes="100vw"
          fill
          focus="62% 45%"
        />
      </m.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />

      <div className="container-wide pt-40 pb-16 md:pb-24">
        <Reveal className="max-w-3xl">
          <span aria-hidden className="block font-serif text-7xl leading-none text-gold md:text-8xl">
            &ldquo;
          </span>
          <p className="-mt-4 font-serif text-[clamp(1.85rem,4.4vw,3.6rem)] leading-[1.12] tracking-[-0.02em] text-balance">
            Every frame is carefully crafted to preserve memories that last <em className="text-gold-light">a lifetime.</em>
          </p>
          <p className="eyebrow mt-8 flex items-center gap-4 text-paper/70">
            <span className="h-px w-10 bg-gold" />
            Wedding · The garland ceremony
          </p>
        </Reveal>
      </div>
    </section>
  );
}
