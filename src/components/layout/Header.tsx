import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Instagram, Menu, X } from 'lucide-react';
import { instagramHandle, navItems, site } from '@/config/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';
import { ButtonLink } from '@/components/ui/Button';
import { Logo } from './Logo';

const sectionIds = navItems.map((item) => item.id);

export function Header() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled || open ? 'border-b border-line bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-wide flex h-18 items-center justify-between gap-6 md:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={cn(
                    'relative py-2 text-[0.8125rem] tracking-[0.04em] transition-colors duration-300 hover:text-gold-light',
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 after:content-['']",
                    active === item.id ? 'text-gold-light after:scale-x-100' : 'text-paper/80',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="#contact" size="sm" className="hidden sm:inline-flex" icon={<ArrowUpRight className="size-3.5" />}>
            Book a Shoot
          </ButtonLink>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="inline-flex size-11 items-center justify-center border border-line text-paper transition hover:border-gold hover:text-gold-light lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Dialog.Trigger>
            <AnimatePresence>
              {open && (
                <Dialog.Portal forceMount>
                  <Dialog.Content forceMount asChild aria-describedby={undefined}>
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="fixed inset-0 z-[60] flex flex-col bg-ink grain"
                    >
                      <Dialog.Title className="sr-only">Site menu</Dialog.Title>
                      <div className="container-wide flex h-18 items-center justify-between md:h-20">
                        <Logo showTagline={false} onClick={() => setOpen(false)} />
                        <Dialog.Close
                          className="inline-flex size-11 items-center justify-center border border-line text-paper transition hover:border-gold hover:text-gold-light"
                          aria-label="Close menu"
                        >
                          <X className="size-5" />
                        </Dialog.Close>
                      </div>

                      <nav aria-label="Mobile" className="container-wide flex flex-1 flex-col justify-center">
                        <ul className="space-y-1">
                          {navItems.map((item, i) => (
                            <m.li
                              key={item.id}
                              initial={{ opacity: 0, y: 24 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.06 * i + 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <a
                                href={`#${item.id}`}
                                onClick={() => setOpen(false)}
                                className="flex items-baseline gap-5 border-b border-line py-4 font-serif text-[clamp(2rem,9vw,3.25rem)] leading-tight text-paper transition-colors hover:text-gold-light"
                              >
                                <span className="font-sans text-xs text-gold">0{i + 1}</span>
                                {item.label}
                              </a>
                            </m.li>
                          ))}
                        </ul>
                      </nav>

                      <div className="container-wide flex flex-col gap-5 pb-10 sm:flex-row sm:items-center sm:justify-between">
                        <ButtonLink href="#contact" onClick={() => setOpen(false)} size="lg" icon={<ArrowUpRight className="size-4" />}>
                          Book a Shoot
                        </ButtonLink>
                        {site.social.instagram && (
                          <a
                            href={site.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-mist hover:text-gold-light"
                          >
                            <Instagram className="size-4" /> {instagramHandle}
                          </a>
                        )}
                      </div>
                    </m.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
