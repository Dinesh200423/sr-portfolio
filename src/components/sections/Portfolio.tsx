import { m } from 'framer-motion';
import { Expand } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Lightbox } from '@/components/portfolio/Lightbox';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { gallery, galleryFilters } from '@/data/gallery';
import { cn } from '@/lib/cn';
import type { GalleryCategory } from '@/types';

type Filter = GalleryCategory | 'all';

const counts = gallery.reduce<Record<string, number>>(
  (acc, img) => ({ ...acc, [img.category]: (acc[img.category] ?? 0) + 1 }),
  { all: gallery.length },
);

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = useMemo(() => (filter === 'all' ? gallery : gallery.filter((img) => img.category === filter)), [filter]);
  const filterLabel = galleryFilters.find((f) => f.value === filter)?.label ?? '';

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="py-24 md:py-36">
      <div className="container-wide">
        <SectionHeading
          id="portfolio-title"
          index="03"
          eyebrow="Portfolio"
          title={
            <>
              Signature <em className="text-gold-light">events</em>
            </>
          }
          intro="A collection of unforgettable celebrations, timeless emotions, and beautifully captured memories."
        />

        <Reveal className="mt-14 flex flex-col gap-4 border-y border-line py-4 md:mt-20 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter photographs by category" className="-mx-1 flex gap-1 overflow-x-auto pb-1 md:pb-0">
            {galleryFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'shrink-0 px-4 py-2.5 text-[0.71875rem] tracking-[0.14em] uppercase transition-colors duration-300',
                  filter === f.value ? 'bg-gold text-ink' : 'text-paper/70 hover:text-gold-light',
                )}
              >
                {f.label}
                <sup className={cn('ml-1 font-serif text-[0.625rem] tracking-normal', filter === f.value ? 'text-ink/70' : 'text-gold')}>
                  {counts[f.value] ?? 0}
                </sup>
              </button>
            ))}
          </div>
          <p className="text-xs tracking-[0.12em] text-mist uppercase" aria-live="polite">
            Showing {visible.length} {filter === 'all' ? 'photographs' : filterLabel.toLowerCase()}
          </p>
        </Reveal>

        {/* Masonry via CSS columns: every photo keeps its natural ratio, nothing is cropped. */}
        <m.ul
          key={filter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 columns-1 gap-4 xs:columns-2 md:gap-5 lg:columns-3"
        >
          {visible.map((img, i) => (
            <li key={img.id} className="mb-4 break-inside-avoid md:mb-5">
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative block w-full overflow-hidden text-left"
                aria-label={`View “${img.title}” full screen`}
              >
                <Photo
                  src={img.src}
                  alt={img.alt}
                  sizes="(min-width: 1024px) 30vw, (min-width: 416px) 48vw, 100vw"
                  imgClassName="group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 opacity-70 transition-opacity duration-500 group-hover:opacity-100 md:opacity-0 md:group-focus-visible:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 transition-all duration-500 md:translate-y-3 md:p-5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                  <span>
                    <span className="eyebrow block text-[0.5625rem] text-gold-light">
                      {galleryFilters.find((f) => f.value === img.category)?.label}
                    </span>
                    <span className="mt-1 block font-serif text-lg leading-snug text-paper md:text-xl">{img.title}</span>
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-paper/40 text-paper">
                    <Expand className="size-4" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </m.ul>
      </div>

      <Lightbox images={visible} index={lightboxIndex} onIndexChange={setLightboxIndex} />
    </section>
  );
}
