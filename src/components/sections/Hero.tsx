import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { services } from '@/data/services';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduceMotion ? 1 : 0]);

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <m.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
        <m.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          <Photo
            src="marriage2.webp"
            mobileSrc="marriage3.webp"
            alt="Bride and groom holding hands in warm evening light, photographed by SR Creations"
            sizes="100vw"
            fill
            priority
            focus="62% 40%"
          />
        </m.div>
        {/* Legibility gradients: strong on the text side, light over the couple. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10 md:bg-gradient-to-r md:from-ink/95 md:via-ink/55 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />
      </m.div>

      <m.div style={{ opacity: contentOpacity }} className="container-wide flex flex-1 flex-col justify-end pt-32 pb-10 md:justify-center md:pb-24">
        <div className="max-w-2xl">
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="eyebrow flex items-center gap-4 text-gold-light"
          >
            <span className="h-px w-10 bg-gold" />
            SR Event Photography
          </m.p>

          <m.h1
            id="hero-title"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease }}
            className="mt-6 font-serif text-[clamp(2.9rem,8.4vw,6.5rem)] leading-[0.98] font-normal tracking-[-0.03em] text-balance"
          >
            Capturing your most <em className="text-gold-light">precious</em> moments.
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease }}
            className="mt-7 max-w-md text-base leading-relaxed text-paper/80 md:text-lg"
          >
            Creating timeless memories through cinematic storytelling and elegant photography.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease }}
            className="mt-10 flex flex-col gap-3 xs:flex-row"
          >
            <ButtonLink href="#portfolio" size="lg" icon={<ArrowUpRight className="size-4" />}>
              Explore Portfolio
            </ButtonLink>
            <ButtonLink href="#contact" size="lg" variant="outline">
              Book a Session
            </ButtonLink>
          </m.div>
        </div>
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="container-wide hidden items-end justify-between gap-8 border-t border-line pt-6 pb-8 md:flex"
      >
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-xs tracking-[0.12em] text-paper/70 uppercase">
          {services.slice(0, 5).map((s) => (
            <li key={s.id} className="flex items-center gap-3">
              <span className="size-1 rounded-full bg-gold" />
              {s.title.replace(' Photography', '')}
            </li>
          ))}
        </ul>
        <a href="#about" className="group flex shrink-0 items-center gap-3 text-xs tracking-[0.2em] text-paper/70 uppercase hover:text-gold-light">
          Scroll
          <span className="flex size-10 items-center justify-center rounded-full border border-line transition group-hover:border-gold">
            <ArrowDown className="size-4 motion-safe:animate-bounce" />
          </span>
        </a>
      </m.div>
    </section>
  );
}
