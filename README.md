# SR Creations: portfolio website

Premium photography site rebuilt with **React 18 + TypeScript + Vite 6 + Tailwind CSS 4 + Framer Motion**, with React Hook Form + Zod for the enquiry form, Radix Dialog for the accessible menu and lightbox, and Lucide icons.

All photography is the studio's own, reused from the original site (`public/images/`, original URLs untouched).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

Requires Node 20+.

## Project structure

```
public/images/            Original photographs (unchanged) + generated optimized/ variants
scripts/optimize-images.mjs   Builds AVIF/WebP responsive sizes, blur placeholders, favicon, OG image
src/
  config/site.ts          ← Contact details, social links, stats, budgets (edit this first)
  data/                   gallery.ts, services.ts, testimonials.ts, image-manifest.json (generated)
  types/                  Shared TypeScript models
  lib/                    images (srcset helpers), enquiry (Zod schema + delivery), cn
  hooks/ context/         useScrolled, useActiveSection, BookingContext
  components/
    layout/               Header (+ mobile menu), Footer, Logo, WhatsAppButton
    sections/             Hero, About, Services, Showcase, Portfolio, Testimonials, Contact
    portfolio/Lightbox    Keyboard, swipe and focus-trapped viewer
    contact/              EnquiryForm, Field
    ui/                   Photo (responsive image), Button, Reveal, SectionHeading
  pages/Home.tsx
```

## Adding or changing photos

1. Drop the file into `public/images/`.
2. Add its filename to `SOURCES` in `scripts/optimize-images.mjs` and run `npm run images`.
3. Add an entry to `src/data/gallery.ts` (title, alt text, category).

## Configuration still needed before launch

The original site never published these, so they are **blank placeholders and hidden from the UI** until filled in:

| Item | Where | Effect when set |
| --- | --- | --- |
| Phone, email, location | `src/config/site.ts` → `contact` | Appear in Contact + Footer |
| WhatsApp number (digits, e.g. `919876543210`) | `contact.whatsapp` | Floating WhatsApp button; form hands the enquiry to WhatsApp |
| Facebook / YouTube URLs | `social` | Appear in Footer |
| Form service endpoint | `.env.local` → `VITE_FORM_ENDPOINT` (see `.env.example`) | Form posts directly to Formspree / Web3Forms etc. |

**How the form delivers enquiries** (first available wins): form-service endpoint → WhatsApp → email → Instagram DM (`ig.me/m/suriya_rlove`, with the enquiry copied to the clipboard). No backend is required and no secret keys are used in the frontend; `VITE_` variables are public by design.

## Content to verify with the studio

- **Stats** (50+ clients, 50+ events, 5+ years) were carried over from the old site. They are the studio's claims, so confirm them, or set `showStats: false`.
- **Testimonials** from the old site are disabled (`verified: false` in `src/data/testimonials.ts`) because they cannot be confirmed as genuine. Set `verified: true` per entry once confirmed.
- **Films section is omitted**: the original site has no video files (only an AI illustration labelled "cinematic video"). Add real videos to enable one.
- The old site's AI-generated illustrations (`*ai.png`, `event.png`, `bridepotrait.png`, `cinematicvideo.png`, `weddingphotography.png`) and mobile screenshots (`sr1-4.png`) are not used. They remain in `public/images/` and can be deleted.

## Deploy

**Vercel**: import the repo; the framework preset is detected (`vercel.json` adds cache headers). Add `VITE_FORM_ENDPOINT` under Environment Variables if used.

**Hostinger**: run `npm run build` and upload the contents of `dist/` to `public_html/`.
