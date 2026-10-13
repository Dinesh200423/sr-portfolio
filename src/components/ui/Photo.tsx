import { useCallback, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import { getImage, srcSet, variantUrl } from '@/lib/images';
import type { PhotoSource } from '@/types';

interface PhotoProps {
  src: PhotoSource;
  alt: string;
  /** Matches the rendered width so the browser picks the right variant, e.g. "(min-width: 1024px) 33vw, 100vw". */
  sizes: string;
  /** Fill the positioned parent (object-cover) instead of keeping the photo's intrinsic ratio. */
  fill?: boolean;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  /** CSS object-position for cropped photos. */
  focus?: string;
  className?: string;
  imgClassName?: string;
  /** Art direction: a different photo for narrow (portrait) viewports. */
  mobileSrc?: PhotoSource;
  /** Crop to a fixed aspect ratio (e.g. "4 / 5") instead of the photo's own. */
  ratio?: string;
}

/**
 * Responsive photograph: AVIF → WebP fallback chain, intrinsic dimensions to avoid
 * layout shift, lazy loading, and a blurred placeholder that fades out once loaded.
 */
export function Photo({ src, alt, sizes, fill, priority, focus, className, imgClassName, mobileSrc, ratio }: PhotoProps) {
  const image = getImage(src);
  const [loaded, setLoaded] = useState(false);

  // Images served from cache may already be complete before React attaches onLoad.
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);

  const fallbackWidth = image.widths.find((w) => w >= 1200) ?? image.widths[image.widths.length - 1];
  const placeholderStyle: CSSProperties = {
    backgroundImage: `url(${image.placeholder})`,
    backgroundSize: 'cover',
    backgroundPosition: focus ?? 'center',
  };

  return (
    <div
      className={cn('overflow-hidden bg-ink-3', fill ? 'absolute inset-0' : 'relative', className)}
      style={fill ? undefined : { aspectRatio: ratio ?? `${image.width} / ${image.height}` }}
    >
      <div
        aria-hidden
        className={cn('absolute inset-0 scale-110 blur-xl transition-opacity duration-700', loaded && 'opacity-0')}
        style={placeholderStyle}
      />
      <picture>
        {mobileSrc && (
          <>
            <source media="(max-width: 767.98px)" type="image/avif" srcSet={srcSet(mobileSrc, 'avif')} sizes={sizes} />
            <source media="(max-width: 767.98px)" type="image/webp" srcSet={srcSet(mobileSrc, 'webp')} sizes={sizes} />
          </>
        )}
        <source type="image/avif" srcSet={srcSet(src, 'avif')} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet(src, 'webp')} sizes={sizes} />
        <img
          ref={imgRef}
          src={variantUrl(image.slug, fallbackWidth, 'webp')}
          alt={alt}
          width={image.width}
          height={image.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          draggable={false}
          className={cn(
            'relative h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-(--ease-editorial)',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
          style={focus ? { objectPosition: focus } : undefined}
        />
      </picture>
    </div>
  );
}
