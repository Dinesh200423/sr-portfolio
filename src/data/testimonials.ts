import type { Testimonial } from '@/types';

/**
 * Testimonials shown on the previous site. They are NOT rendered until each one is
 * confirmed as a genuine client review: set `verified: true` (and correct the
 * wording or name if needed) once confirmed. The section hides itself when none are verified.
 */
export const testimonials: Testimonial[] = [
  {
    quote: 'Professional team, amazing creativity, and stunning photographs. Highly recommended.',
    author: 'Priya & Rahul',
    verified: false,
  },
  {
    quote: 'They captured every emotion beautifully. Memories for a lifetime. Absolutely perfect!',
    author: 'Sarah Jenkins',
    verified: false,
  },
  {
    quote: 'The cinematic storytelling and elegant touch they added to our event was incredible.',
    author: 'Amit & Neha',
    verified: false,
  },
];
