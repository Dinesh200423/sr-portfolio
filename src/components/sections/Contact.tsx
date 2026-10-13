import { Instagram, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { instagramHandle, site, whatsappUrl } from '@/config/site';

interface ContactRow {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

/** Only details that are actually configured are listed. */
const contactRows: ContactRow[] = [
  site.contact.phone && { icon: Phone, label: 'Phone', value: site.contact.phone, href: `tel:${site.contact.phone.replace(/[^\d+]/g, '')}` },
  site.contact.whatsapp && { icon: MessageCircle, label: 'WhatsApp', value: 'Message us', href: whatsappUrl(), external: true },
  site.contact.email && { icon: Mail, label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
  site.social.instagram && { icon: Instagram, label: 'Instagram', value: instagramHandle, href: site.social.instagram, external: true },
  site.contact.location && { icon: MapPin, label: 'Based in', value: site.contact.location },
].filter(Boolean) as ContactRow[];

const steps = ['Share a few details about your celebration.', 'We get in touch to talk through your date and coverage.', 'Your date is reserved and planning begins.'];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-ink-2 py-24 md:py-36">
      {/* Faded photographic backdrop */}
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 opacity-[0.12] lg:block">
        <Photo src="marriage4.webp" alt="" sizes="50vw" fill focus="50% 30%" imgClassName="grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-2 via-ink-2/60 to-ink-2/20" />
      </div>

      <div className="container-wide grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-gold">
              <span className="font-serif text-sm tracking-normal normal-case italic">04</span>
              <span className="h-px w-10 bg-gold/50" />
              Consultation request
            </p>
            <h2 id="contact-title" className="mt-6 font-serif text-[clamp(2.6rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.025em] text-balance">
              Let us tell your <em className="text-gold-light">unique</em> story.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-mist">Secure your date with our team. Share a few details and we'll take it from there.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="mt-12 space-y-4">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-5 text-sm text-paper/80">
                  <span className="font-serif text-gold italic">0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>

          {contactRows.length > 0 && (
            <Reveal delay={0.2}>
              <ul className="mt-12 divide-y divide-line border-y border-line">
                {contactRows.map(({ icon: Icon, label, value, href, external }) => {
                  const inner = (
                    <>
                      <Icon className="size-4 text-gold" aria-hidden />
                      <span className="eyebrow w-24 text-[0.625rem] text-paper/50">{label}</span>
                      <span className="text-paper">{value}</span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                          className="flex items-center gap-4 py-4 transition-colors hover:text-gold-light [&>span:last-child]:hover:text-gold-light"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 py-4">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="border border-line bg-ink/70 p-6 backdrop-blur-sm sm:p-10 md:p-12">
            <EnquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
