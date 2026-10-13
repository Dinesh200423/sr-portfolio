import { cloneElement, useId, type ReactElement, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  /** Decorative element shown at the right edge of the control (e.g. a select chevron). */
  trailing?: ReactNode;
  /** A single input/select/textarea; id and aria attributes are wired automatically. */
  children: ReactElement<Record<string, unknown>>;
}

export const fieldClass =
  'w-full border-0 border-b border-paper/20 bg-transparent px-0 py-3 text-[0.9375rem] text-paper placeholder:text-paper/30 transition-colors duration-300 focus:border-gold focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-danger';

export function Field({ label, required, error, hint, className, trailing, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="eyebrow text-[0.625rem] text-paper/60">
        {label}
        {required ? <span className="text-gold" aria-hidden> *</span> : <span className="ml-2 tracking-normal normal-case text-paper/35">(optional)</span>}
      </label>
      <div className="relative">
        {cloneElement(children, {
          id,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': describedBy,
          'aria-required': required || undefined,
        })}
        {trailing && <span className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-gold">{trailing}</span>}
      </div>
      {hint && !error && (
        <p id={hintId} className="mt-2 text-xs text-paper/40">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
