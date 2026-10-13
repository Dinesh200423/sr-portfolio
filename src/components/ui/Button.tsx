import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'gold' | 'outline' | 'outline-dark' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn inline-flex items-center justify-center gap-3 whitespace-nowrap font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-(--ease-editorial) disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-ink hover:bg-gold-light',
  outline: 'border border-paper/40 text-paper hover:border-gold-light hover:text-gold-light backdrop-blur-sm',
  'outline-dark': 'border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  ghost: 'text-gold-light hover:text-paper',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-[0.6875rem]',
  md: 'h-12 px-7 text-[0.71875rem]',
  lg: 'h-14 px-9 text-xs',
};

interface Common {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const content = (children: ReactNode, icon?: ReactNode) => (
  <>
    <span>{children}</span>
    {icon && <span className="transition-transform duration-300 group-hover/btn:translate-x-1">{icon}</span>}
  </>
);

export const ButtonLink = forwardRef<HTMLAnchorElement, Common & AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ variant = 'gold', size = 'md', icon, className, children, ...props }, ref) => (
    <a ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {content(children, icon)}
    </a>
  ),
);
ButtonLink.displayName = 'ButtonLink';

export const Button = forwardRef<HTMLButtonElement, Common & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ variant = 'gold', size = 'md', icon, className, children, type = 'button', ...props }, ref) => (
    <button ref={ref} type={type} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {content(children, icon)}
    </button>
  ),
);
Button.displayName = 'Button';
