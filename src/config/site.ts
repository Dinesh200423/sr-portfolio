import type { EventType, SocialLink, Stat } from '@/types';

/**
 * Central business configuration.
 *
 * Anything left as an empty string is treated as "not available": the matching
 * link, button or contact row is hidden rather than rendered as a dead link.
 * Fill these in with SR Creations' real details before launch.
 */
export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  description: string;
  footerNote: string;
  contact: { email: string; phone: string; whatsapp: string; location: string };
  social: { instagram: string; facebook: string; youtube: string };
  showStats: boolean;
  stats: Stat[];
  budgets: string[];
}

export const site: SiteConfig = {
  name: 'SR Creations',
  tagline: 'Luxury Event Photography',
  url: 'https://sr-photography-site.vercel.app',
  description:
    'SR Creations specializes in capturing emotions, celebrations, and unforgettable moments through artistic photography and cinematic storytelling. Every frame is carefully crafted to preserve memories that last a lifetime.',
  footerNote: 'Preserving timeless memories with artistic vision and elegant storytelling.',

  contact: {
    /** e.g. 'hello@srcreations.in' (not published on the current site). */
    email: '',
    /** Display format, e.g. '+91 98765 43210' (not published on the current site). */
    phone: '',
    /** Country code + number, digits only, e.g. '919876543210'. Enables the WhatsApp button and hand-off. */
    whatsapp: '',
    /** e.g. 'Chennai, Tamil Nadu' (not published on the current site). */
    location: '',
  },

  social: {
    instagram: 'https://www.instagram.com/suriya_rlove',
    facebook: '',
    youtube: '',
  },

  /**
   * Figures carried over from the existing website. They are the studio's own claims:
   * confirm they are current, or set `showStats` to false.
   */
  showStats: true,
  stats: [
    { value: 50, suffix: '+', label: 'Happy clients' },
    { value: 50, suffix: '+', label: 'Events covered' },
    { value: 5, suffix: '+', label: 'Years of experience' },
  ],

  /** Budget ranges offered on the existing consultation form. */
  budgets: ['₹50,000 – ₹1,00,000', '₹1,00,000 – ₹2,00,000', '₹2,00,000+'],
};

export const eventTypeOptions: { value: EventType; label: string }[] = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'event', label: 'Event / Function' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'babyshower', label: 'Baby Shower' },
  { value: 'bridal', label: 'Bridal Portrait' },
  { value: 'videography', label: 'Cinematic Videography' },
  { value: 'other', label: 'Other' },
];

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: site.social.instagram },
  { label: 'Facebook', href: site.social.facebook },
  { label: 'YouTube', href: site.social.youtube },
].filter((link) => link.href);

export const instagramHandle = site.social.instagram
  ? '@' + new URL(site.social.instagram).pathname.replace(/\//g, '')
  : '';

export const whatsappUrl = (text?: string) =>
  site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : '';

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
] as const;
