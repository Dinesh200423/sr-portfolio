import { m } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { site, whatsappUrl } from '@/config/site';
import { useScrolled } from '@/hooks/useScrolled';

/** Floating WhatsApp shortcut. Renders only when a WhatsApp number is configured in src/config/site.ts. */
export function WhatsAppButton() {
  const visible = useScrolled(600);
  if (!site.contact.whatsapp) return null;

  return (
    <m.a
      href={whatsappUrl(`Hello ${site.name}! I'd like to enquire about a booking.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.4 }}
      tabIndex={visible ? 0 : -1}
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3.5 text-[0.6875rem] font-semibold tracking-[0.14em] text-ink uppercase shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] transition-colors hover:bg-gold-light md:right-8 md:bottom-8"
    >
      <MessageCircle className="size-4" />
      <span className="max-xs:sr-only">WhatsApp</span>
    </m.a>
  );
}
