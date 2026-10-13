import type { Service } from '@/types';

/** Services offered on the existing site, illustrated with SR Creations' own photographs. */
export const services: Service[] = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    description: 'Capturing timeless love stories with elegance and emotion.',
    image: 'marriage.jpg.webp',
    imageAlt: 'Bride and groom in marigold garlands during their wedding ceremony',
    focus: '68% 45%',
    eventType: 'wedding',
  },
  {
    id: 'event',
    title: 'Event Photography',
    description: 'Documenting celebrations and unforgettable moments.',
    image: 'bday3.webp',
    imageAlt: 'Children laughing together at a balloon-decorated celebration',
    focus: '50% 65%',
    eventType: 'event',
  },
  {
    id: 'babyshower',
    title: 'Baby Shower Photography',
    description: 'Preserving joyful memories before a beautiful new beginning.',
    image: 'babyshower.webp',
    imageAlt: 'Expectant parents and their daughter sharing a moment at golden hour',
    focus: '50% 35%',
    eventType: 'babyshower',
  },
  {
    id: 'birthday',
    title: 'Birthday Photography',
    description: 'Capturing happiness, laughter, and special milestones.',
    image: 'sr1.jpg.webp',
    imageAlt: 'Father lifting his smiling baby at a first-birthday celebration',
    focus: '65% 35%',
    eventType: 'birthday',
  },
  {
    id: 'bridal',
    title: 'Bridal Portraits',
    description: 'Elegant portraits highlighting beauty, grace, and tradition.',
    image: 'makeup4.webp',
    imageAlt: 'Bride in a cream and green silk saree with traditional gold jewellery',
    focus: '50% 25%',
    eventType: 'bridal',
  },
  {
    id: 'videography',
    title: 'Cinematic Videography',
    description: 'Creating cinematic films that tell your unique story.',
    image: 'marriage2.webp',
    imageAlt: 'Couple holding hands in warm, cinematic interior light',
    focus: '62% 40%',
    eventType: 'videography',
  },
];
