import type { GalleryCategory, GalleryImage } from '@/types';

export const galleryFilters: { value: GalleryCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'wedding', label: 'Weddings' },
  { value: 'birthday', label: 'Birthdays' },
  { value: 'babyshower', label: 'Baby Shower' },
  { value: 'bridal', label: 'Bridal Portraits' },
];

/**
 * Original SR Creations photographs, in display order.
 * Categories match the filters on the existing site.
 */
export const gallery: GalleryImage[] = [
  {
    id: 'wedding-ceremony',
    src: 'marriage.jpg.webp',
    title: 'The garland ceremony',
    alt: 'Bride in a red silk saree smiling beside the groom, both wearing marigold garlands, surrounded by family during the wedding ritual',
    category: 'wedding',
  },
  {
    id: 'bridal-gold',
    src: 'makeup2.JPG.webp',
    title: 'Gold and grace',
    alt: 'Bride in a mustard and red silk saree with temple jewellery, adjusting her earring in studio light',
    category: 'bridal',
  },
  {
    id: 'birthday-friends',
    src: 'bday3.webp',
    title: 'All the little friends',
    alt: 'Group of young children sitting on a carpet in front of green and teal balloons, laughing together',
    category: 'birthday',
  },
  {
    id: 'wedding-reception',
    src: 'marriage2.webp',
    title: 'Hand in hand',
    alt: 'Couple in a maroon lehenga and charcoal suit holding hands beside a glowing pendant lamp',
    category: 'wedding',
  },
  {
    id: 'babyshower-family',
    src: 'babyshower.webp',
    title: 'Waiting for you',
    alt: 'Expectant mother at golden hour as her husband and young daughter kiss her baby bump',
    category: 'babyshower',
  },
  {
    id: 'bridal-blue',
    src: 'makeup1.JPG.webp',
    title: 'Quiet confidence',
    alt: 'Bride in a royal blue and gold saree touching her earring, looking away from the camera',
    category: 'bridal',
  },
  {
    id: 'birthday-family',
    src: 'birthday function.jpg.webp',
    title: 'A family celebration',
    alt: 'Parents in coordinated green outfits standing with their toddler in front of a balloon arch',
    category: 'birthday',
  },
  {
    id: 'wedding-kiss',
    src: 'marriage3.webp',
    title: 'A tender moment',
    alt: 'Groom kissing the bride on the forehead as she smiles, wearing a cream and green silk saree',
    category: 'wedding',
  },
  {
    id: 'birthday-lift',
    src: 'sr1.jpg.webp',
    title: 'Up in the air',
    alt: 'Father lifting his laughing baby boy high in front of a green and gold balloon arch',
    category: 'birthday',
  },
  {
    id: 'bridal-red',
    src: 'makeup3.JPG.webp',
    title: 'In crimson silk',
    alt: 'Bride in a red silk saree with layered gold necklaces, smiling softly',
    category: 'bridal',
  },
  {
    id: 'birthday-siblings',
    src: 'bday.webp',
    title: 'Big sister, little brother',
    alt: 'Smiling girl in a teal dress sitting beside her baby brother in a tuxedo before a balloon backdrop',
    category: 'birthday',
  },
  {
    id: 'wedding-monochrome',
    src: 'marriage4.webp',
    title: 'Timeless in black and white',
    alt: 'Black and white portrait of a couple laughing together, the bride showing her henna-decorated hands',
    category: 'wedding',
  },
  {
    id: 'bridal-portrait',
    src: 'makeup4.webp',
    title: 'The bridal portrait',
    alt: 'Close portrait of a bride in a cream and green silk saree with a maang tikka and gold jewellery',
    category: 'bridal',
  },
  {
    id: 'birthday-boy',
    src: 'bday2.webp',
    title: 'The birthday boy',
    alt: 'Toddler in a waistcoat and bow tie being held by a parent near the birthday balloons',
    category: 'birthday',
  },
];
