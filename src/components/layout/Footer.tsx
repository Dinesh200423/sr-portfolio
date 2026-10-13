import { ArrowUp } from 'lucide-react';
import { navItems, site, socialLinks } from '@/config/site';
import { services } from '@/data/services';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink pt-20 pb-10">
      <div className="container-wide">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm font-serif text-xl leading-snug text-paper/80 italic">{site.footerNote}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <h2 className="eyebrow text-gold">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm text-paper/70">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="transition-colors hover:text-gold-light">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="eyebrow text-gold">Services</h2>
            <ul className="mt-5 space-y-3 text-sm text-paper/70">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="transition-colors hover:text-gold-light">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="eyebrow text-gold">Connect</h2>
            <ul className="mt-5 space-y-3 text-sm text-paper/70">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-light">
                    {link.label}
                  </a>
                </li>
              ))}
              {site.contact.email && (
                <li>
                  <a href={`mailto:${site.contact.email}`} className="break-all transition-colors hover:text-gold-light">
                    {site.contact.email}
                  </a>
                </li>
              )}
              {site.contact.phone && (
                <li>
                  <a href={`tel:${site.contact.phone.replace(/[^\d+]/g, '')}`} className="transition-colors hover:text-gold-light">
                    {site.contact.phone}
                  </a>
                </li>
              )}
              <li>
                <a href="#contact" className="transition-colors hover:text-gold-light">
                  Enquiry form
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <a href="#home" className="group inline-flex items-center gap-2 tracking-[0.16em] uppercase transition-colors hover:text-gold-light">
            Back to top <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
