import { Reveal } from '@/components/ui/Reveal';
import { testimonials } from '@/data/testimonials';

const verified = testimonials.filter((t) => t.verified);

/** Renders only testimonials confirmed as genuine (see src/data/testimonials.ts). */
export function Testimonials() {
  if (verified.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="bg-paper-2 py-24 text-ink md:py-32">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow flex items-center gap-4 text-gold-deep">
            <span className="h-px w-10 bg-gold-deep/50" />
            Client stories
          </p>
          <h2 id="testimonials-title" className="sr-only">
            Client stories
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {verified.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.08}>
              <figure className="border-t border-line-dark pt-8">
                <blockquote className="font-serif text-2xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="eyebrow mt-6 text-stone">{t.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
