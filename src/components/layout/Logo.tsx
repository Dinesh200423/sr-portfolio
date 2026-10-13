import { cn } from '@/lib/cn';
import { site } from '@/config/site';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  onClick?: () => void;
}

export function Logo({ className, showTagline = true, onClick }: LogoProps) {
  return (
    <a href="#home" onClick={onClick} className={cn('group flex items-center gap-3', className)} aria-label={`${site.name}, back to top`}>
      <img
        src="/images/optimized/logo-160.webp"
        srcSet="/images/optimized/logo-160.webp 1x, /images/optimized/logo-320.webp 2x"
        alt=""
        width={44}
        height={44}
        className="size-11 rounded-full ring-1 ring-gold/30 transition duration-500 group-hover:ring-gold/70"
      />
      <span className="leading-none">
        <span className="block font-serif text-lg tracking-[0.02em] text-paper">{site.name}</span>
        {showTagline && <span className="eyebrow mt-1.5 block text-[0.5625rem] text-gold">{site.tagline}</span>}
      </span>
    </a>
  );
}
