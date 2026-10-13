/**
 * Generates responsive AVIF + WebP variants of the original SR Creations
 * photographs and writes a manifest (dimensions + tiny blur placeholder)
 * that the React <Photo> component reads.
 *
 * Originals stay untouched in public/images so their existing URLs keep working.
 * Run with: npm run images   (skips variants that already exist; pass --force to rebuild)
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'public/images');
const outDir = path.join(srcDir, 'optimized');
const manifestPath = path.join(root, 'src/data/image-manifest.json');
const force = process.argv.includes('--force');

/** Original photographs used on the site (AI illustrations and old screenshots are intentionally excluded). */
const SOURCES = [
  'marriage.jpg.webp',
  'marriage2.webp',
  'marriage3.webp',
  'marriage4.webp',
  'babyshower.webp',
  'bday.webp',
  'bday2.webp',
  'bday3.webp',
  'birthday function.jpg.webp',
  'sr1.jpg.webp',
  'makeup1.JPG.webp',
  'makeup2.JPG.webp',
  'makeup3.JPG.webp',
  'makeup4.webp',
];

const WIDTHS = [480, 800, 1200, 1800, 2400];
const FORMATS = {
  avif: (img) => img.avif({ quality: 52, effort: 4 }),
  webp: (img) => img.webp({ quality: 74, effort: 5 }),
};

export const slugify = (file) =>
  file
    .replace(/(\.(jpe?g|png|webp))+$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const exists = (p) => access(p).then(() => true, () => false);

async function processPhoto(file) {
  const input = path.join(srcDir, file);
  const slug = slugify(file);
  // .rotate() applies EXIF orientation so width/height match what browsers display.
  const base = sharp(input).rotate();
  const { width, height } = await base.metadata();
  const widths = WIDTHS.filter((w) => w < width);
  if (widths.length === 0 || widths.at(-1) < Math.min(width, 2400)) widths.push(Math.min(width, 2400));

  for (const w of widths) {
    for (const [ext, encode] of Object.entries(FORMATS)) {
      const out = path.join(outDir, `${slug}-${w}.${ext}`);
      if (!force && (await exists(out))) continue;
      await encode(sharp(input).rotate().resize({ width: w })).toFile(out);
    }
  }

  const tiny = await sharp(input).rotate().resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  console.log(`✓ ${file} → ${slug} (${widths.join(', ')})`);
  return [file, { slug, width, height, widths, placeholder: `data:image/webp;base64,${tiny.toString('base64')}` }];
}

async function processLogo() {
  const input = path.join(srcDir, 'sr logo.webp');
  await sharp(input).resize(160).webp({ quality: 88 }).toFile(path.join(outDir, 'logo-160.webp'));
  await sharp(input).resize(320).webp({ quality: 88 }).toFile(path.join(outDir, 'logo-320.webp'));
  await sharp(input).resize(64).png().toFile(path.join(root, 'public/favicon.png'));
  await sharp(input).resize(180).png().toFile(path.join(root, 'public/apple-touch-icon.png'));
  // 1200×630 social preview built from a real photograph.
  await sharp(path.join(srcDir, 'marriage2.webp'))
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'right' })
    .jpeg({ quality: 82 })
    .toFile(path.join(root, 'public/og-image.jpg'));
  console.log('✓ logo, favicons and social preview');
}

await mkdir(outDir, { recursive: true });
const entries = [];
for (const file of SOURCES) entries.push(await processPhoto(file));
await processLogo();
await writeFile(manifestPath, JSON.stringify(Object.fromEntries(entries), null, 2) + '\n');
console.log(`Manifest written to ${path.relative(root, manifestPath)}`);
