/** Category keys used by the portfolio filters. */
export type GalleryCategory = 'wedding' | 'birthday' | 'babyshower' | 'bridal';

/** File name of an original photograph in /public/images (key of the generated image manifest). */
export type PhotoSource = string;

export interface GalleryImage {
  id: string;
  src: PhotoSource;
  alt: string;
  title: string;
  category: GalleryCategory;
}

export type EventType = 'wedding' | 'event' | 'birthday' | 'babyshower' | 'bridal' | 'videography' | 'other';

export interface Service {
  id: string;
  title: string;
  description: string;
  image: PhotoSource;
  imageAlt: string;
  /** CSS object-position used when the photo is cropped into the card frame. */
  focus?: string;
  eventType: EventType;
}

export interface Testimonial {
  quote: string;
  author: string;
  /** Only verified testimonials are rendered. Confirm each with the client before enabling. */
  verified: boolean;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface ImageManifestEntry {
  slug: string;
  width: number;
  height: number;
  widths: number[];
  placeholder: string;
}
