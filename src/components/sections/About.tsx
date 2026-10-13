import { animate, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { instagramHandle, site } from '@/config/site';
import type { Stat } from '@/types';

function Counter({ value, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <div ref={ref} className="border-t border-line pt-5">
      <dd className="font-serif text-[clamp(2.25rem,4vw,3.25rem)] leading-none text-gold-light tabular-nums">
        {/* Screen readers get the final figure immediately rather than the animation. */}
        <span aria-hidden>{display}</span>
        <span className="sr-only">{value}</span>
        <span className="text-gold">{suffix}</span>
      </dd>
      <dt className="mt-3 text-xs tracking-[0.14em] text-mist uppercase">{label}</dt>
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-36">
      <div className="container-wide grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Image composition */}
        <Reveal className="relative lg:col-span-6" y={40}>
          <div className="relative mr-10 sm:mr-24 lg:mr-16">
            <Photo
              src="babyshower.webp"
              alt="Expectant mother at golden hour as her husband and daughter kiss her baby bump"
              sizes="(min-width: 1024px) 40vw, 85vw"
              ratio="4 / 5"
              focus="50% 30%"
            />
            <span className="eyebrow absolute top-6 -left-3 origin-top-left -rotate-90 -translate-x-full text-gold max-sm:hidden">
              Baby Shower · Golden hour
            </span>
          </div>
          <div className="absolute right-0 -bottom-10 w-[46%] border-[6px] border-ink sm:w-[40%] lg:-bottom-14">
            <Photo
              src="makeup1.JPG.webp"
              alt="Bride in a royal blue and gold saree in soft studio light"
              sizes="(min-width: 1024px) 18vw, 40vw"
              ratio="3 / 4"
              focus="50% 25%"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-gold">
              <span className="font-serif text-sm tracking-normal normal-case italic">01</span>
              <span className="h-px w-10 bg-gold/50" />
              About our studio
            </p>
            <h2
              id="about-title"
              className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.04] tracking-[-0.025em] text-balance"
            >
              Emotions, celebrations &amp; <em className="text-gold-light">unforgettable</em> moments.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 max-w-xl space-y-5 text-[0.9375rem] leading-[1.85] text-mist">
            <p>{site.description}</p>
            <p>
              From the rituals of a wedding day to a first birthday, a baby shower or a bridal portrait session, we bring the same
              care to every celebration: patient, observant and focused on the people at its heart.
            </p>
          </Reveal>

          {site.showStats && (
            <Reveal delay={0.2}>
              <dl className="mt-12 grid grid-cols-3 gap-5 sm:gap-8">
                {site.stats.map((stat) => (
                  <Counter key={stat.label} {...stat} />
                ))}
              </dl>
            </Reveal>
          )}

          {site.social.instagram && (
            <Reveal delay={0.3}>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-12 inline-flex items-center gap-3 border-b border-gold/60 pb-2 text-xs tracking-[0.16em] text-gold-light uppercase transition hover:border-gold-light"
              >
                See recent work on Instagram {instagramHandle}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
