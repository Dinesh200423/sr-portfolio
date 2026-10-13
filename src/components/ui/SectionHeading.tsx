import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: 'dark' | 'light';
  id?: string;
  className?: string;
}

/** Editorial section header: numbered eyebrow, large serif title, optional intro aligned to the right. */
export function SectionHeading({ index, eyebrow, title, intro, tone = 'dark', id, className }: SectionHeadingProps) {
  const light = tone === 'light';
  return (
    <Reveal className={cn('grid gap-8 md:grid-cols-12 md:items-end', className)}>
      <div className="md:col-span-7">
        <p className={cn('eyebrow flex items-center gap-4', light ? 'text-gold-deep' : 'text-gold')}>
          <span className="font-serif text-sm tracking-normal normal-case italic">{index}</span>
          <span className={cn('h-px w-10', light ? 'bg-gold-deep/50' : 'bg-gold/50')} />
          {eyebrow}
        </p>
        <h2
          id={id}
          className="mt-6 font-serif text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] font-normal tracking-[-0.025em] text-balance"
        >
          {title}
        </h2>
      </div>
      {intro && (
        <p className={cn('max-w-md text-[0.9375rem] leading-relaxed md:col-span-5 md:justify-self-end', light ? 'text-stone' : 'text-mist')}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
