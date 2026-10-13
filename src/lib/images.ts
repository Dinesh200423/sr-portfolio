import manifestJson from '@/data/image-manifest.json';
import type { ImageManifestEntry, PhotoSource } from '@/types';

const manifest = manifestJson as Record<PhotoSource, ImageManifestEntry>;

export type ImageFormat = 'avif' | 'webp';

export function getImage(src: PhotoSource): ImageManifestEntry {
  const entry = manifest[src];
  if (!entry) throw new Error(`"${src}" is missing from the image manifest. Add it to scripts/optimize-images.mjs and run "npm run images".`);
  return entry;
}

export const variantUrl = (slug: string, width: number, format: ImageFormat) =>
  `/images/optimized/${slug}-${width}.${format}`;

export function srcSet(src: PhotoSource, format: ImageFormat) {
  const { slug, widths } = getImage(src);
  return widths.map((w) => `${variantUrl(slug, w, format)} ${w}w`).join(', ');
}

/** Largest WebP variant: used as the <img> fallback src and for the lightbox preload. */
export function largestUrl(src: PhotoSource, format: ImageFormat = 'webp') {
  const { slug, widths } = getImage(src);
  return variantUrl(slug, widths[widths.length - 1], format);
}

/** Path of the untouched original, preserved at its existing URL. */
export const originalUrl = (src: PhotoSource) => `/images/${src}`;
