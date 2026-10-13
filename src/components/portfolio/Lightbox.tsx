import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, m, type PanInfo } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { galleryFilters } from '@/data/gallery';
import { useBooking } from '@/context/BookingContext';
import { getImage, largestUrl, srcSet } from '@/lib/images';
import type { EventType, GalleryCategory, GalleryImage } from '@/types';

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

const enquiryType: Record<GalleryCategory, EventType> = {
  wedding: 'wedding',
  birthday: 'birthday',
  babyshower: 'babyshower',
  bridal: 'bridal',
};

const categoryLabel = (c: GalleryCategory) => galleryFilters.find((f) => f.value === c)?.label ?? c;

const SWIPE_THRESHOLD = 80;

export function Lightbox({ images, index, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const current = open ? images[index] : null;
  const { requestBooking } = useBooking();
  /** Set when the visitor asks to enquire; applied after the dialog closes so focus restoration doesn't fight the scroll. */
  const pendingEnquiry = useRef<EventType | null>(null);

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      onIndexChange((index + step + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  // Arrow-key navigation while open (Escape is handled by Radix).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  // Warm the cache for neighbouring photos so navigation feels instant.
  useEffect(() => {
    if (index === null || images.length < 2) return;
    [images[(index + 1) % images.length], images[(index - 1 + images.length) % images.length]].forEach((img) => {
      const preload = new Image();
      preload.src = largestUrl(img.src);
    });
  }, [index, images]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <AnimatePresence>
        {open && current && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[70] bg-ink/97 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content
              forceMount
              asChild
              aria-describedby={undefined}
              onCloseAutoFocus={(e) => {
                if (!pendingEnquiry.current) return;
                e.preventDefault();
                requestBooking(pendingEnquiry.current);
                pendingEnquiry.current = null;
              }}
            >
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[80] flex flex-col text-paper outline-none"
              >
                <Dialog.Title className="sr-only">
                  {current.title}: photograph {index + 1} of {images.length}
                </Dialog.Title>

                <div className="container-wide flex h-18 shrink-0 items-center justify-between gap-4 md:h-20">
                  <p className="font-serif text-sm text-gold-light tabular-nums" aria-live="polite">
                    {String(index + 1).padStart(2, '0')} <span className="text-mist">/ {String(images.length).padStart(2, '0')}</span>
                  </p>
                  <Dialog.Close
                    className="inline-flex size-11 items-center justify-center border border-line transition hover:border-gold hover:text-gold-light"
                    aria-label="Close photo viewer"
                  >
                    <X className="size-5" />
                  </Dialog.Close>
                </div>

                <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
                  <AnimatePresence mode="wait" initial={false}>
                    <m.picture
                      key={current.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      drag={images.length > 1 ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.5}
                      onDragEnd={onDragEnd}
                      className="flex h-full max-h-full w-full cursor-grab items-center justify-center active:cursor-grabbing"
                    >
                      <source type="image/avif" srcSet={srcSet(current.src, 'avif')} sizes="100vw" />
                      <source type="image/webp" srcSet={srcSet(current.src, 'webp')} sizes="100vw" />
                      <img
                        src={largestUrl(current.src)}
                        alt={current.alt}
                        width={getImage(current.src).width}
                        height={getImage(current.src).height}
                        draggable={false}
                        className="h-auto max-h-full w-auto max-w-full object-contain select-none"
                      />
                    </m.picture>
                  </AnimatePresence>

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Previous photograph"
                        className="absolute top-1/2 left-2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink/40 backdrop-blur transition hover:border-gold hover:text-gold-light sm:inline-flex md:left-8"
                      >
                        <ChevronLeft className="size-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Next photograph"
                        className="absolute top-1/2 right-2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink/40 backdrop-blur transition hover:border-gold hover:text-gold-light sm:inline-flex md:right-8"
                      >
                        <ChevronRight className="size-5" />
                      </button>
                    </>
                  )}
                </div>

                <div className="container-wide flex shrink-0 flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between md:py-7">
                  <div>
                    <p className="eyebrow text-gold">{categoryLabel(current.category)}</p>
                    <p className="mt-1 font-serif text-xl md:text-2xl">{current.title}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    {images.length > 1 && (
                      <div className="flex gap-2 sm:hidden">
                        <button type="button" onClick={() => go(-1)} aria-label="Previous photograph" className="inline-flex size-11 items-center justify-center border border-line">
                          <ChevronLeft className="size-5" />
                        </button>
                        <button type="button" onClick={() => go(1)} aria-label="Next photograph" className="inline-flex size-11 items-center justify-center border border-line">
                          <ChevronRight className="size-5" />
                        </button>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        pendingEnquiry.current = enquiryType[current.category];
                        onIndexChange(null);
                      }}
                      className="group inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-[0.6875rem] font-semibold tracking-[0.18em] text-gold-light uppercase hover:border-gold-light"
                    >
                      Enquire about {categoryLabel(current.category)}
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
