import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useBooking } from '@/context/BookingContext';
import { services } from '@/data/services';
import { cn } from '@/lib/cn';

export function Services() {
  const [active, setActive] = useState(0);
  const { requestBooking } = useBooking();

  return (
    <section id="services" aria-labelledby="services-title" className="bg-paper py-24 text-ink md:py-36">
      <div className="container-wide">
        <SectionHeading
          id="services-title"
          tone="light"
          index="02"
          eyebrow="What we capture"
          title={
            <>
              Our photography <em className="text-gold-deep">services</em>
            </>
          }
          intro="Professional photography and cinematic storytelling crafted to preserve your most precious memories."
        />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Sticky preview (desktop) — crossfades to the hovered or focused service. */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden">
                {services.map((service, i) => (
                  <div
                    key={service.id}
                    aria-hidden={i !== active}
                    className={cn(
                      'absolute inset-0 transition-[opacity,transform] duration-700 ease-(--ease-editorial)',
                      i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0',
                    )}
                  >
                    <Photo src={service.image} alt={i === active ? service.imageAlt : ''} sizes="40vw" fill focus={service.focus} />
                  </div>
                ))}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent p-6 pt-20 text-paper">
                  <span className="font-serif text-xl italic">{services[active].title}</span>
                  <span className="font-serif text-sm text-gold-light">
                    {String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {services.map((service, i) => (
              <li key={service.id} className="border-t border-line-dark last:border-b">
                <Reveal y={20} delay={i * 0.04}>
                  <article
                    onMouseEnter={() => setActive(i)}
                    onFocusCapture={() => setActive(i)}
                    className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-5 py-8 sm:gap-x-8 md:py-10"
                  >
                    <span className={cn('pt-2 font-serif text-sm italic transition-colors', i === active ? 'text-gold-deep' : 'text-stone')}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      {/* Inline photo on smaller screens */}
                      <div className="mb-6 lg:hidden">
                        <Photo src={service.image} alt={service.imageAlt} sizes="(min-width: 640px) 80vw, 90vw" ratio="16 / 10" focus={service.focus} />
                      </div>
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <h3
                            className={cn(
                              'font-serif text-[clamp(1.75rem,3.2vw,2.6rem)] leading-tight tracking-[-0.015em] transition-colors duration-500',
                              i === active ? 'lg:text-ink' : 'lg:text-ink/45',
                            )}
                          >
                            {service.title}
                          </h3>
                          <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-stone">{service.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => requestBooking(service.eventType)}
                          className="group/enq inline-flex shrink-0 items-center gap-2 self-start border-b border-ink/30 pb-1 text-[0.6875rem] font-semibold tracking-[0.18em] text-ink uppercase transition hover:border-gold-deep hover:text-gold-deep sm:self-auto"
                          aria-label={`Enquire about ${service.title}`}
                        >
                          Enquire
                          <ArrowUpRight className="size-3.5 transition-transform group-hover/enq:translate-x-0.5 group-hover/enq:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
