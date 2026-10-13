import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, m } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Check, ChevronDown, Copy, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ButtonLink } from '@/components/ui/Button';
import { eventTypeOptions, instagramHandle, site } from '@/config/site';
import { useBooking } from '@/context/BookingContext';
import { activeChannel, deliverEnquiry, enquirySchema, type DeliveryResult, type EnquiryValues } from '@/lib/enquiry';
import { Field, fieldClass } from './Field';

const channelHint: Record<typeof activeChannel, string> = {
  endpoint: 'Your enquiry is sent straight to our team. We usually reply by phone or email.',
  whatsapp: 'Submitting opens WhatsApp with your details pre-filled. Just press send.',
  email: 'Submitting opens your email app with your details pre-filled. Just press send.',
  instagram: `We'll copy your enquiry so you can send it to us on Instagram (${instagramHandle}).`,
};

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const defaults: EnquiryValues = {
  name: '',
  phone: '',
  email: '',
  eventType: '' as EnquiryValues['eventType'],
  eventDate: '',
  location: '',
  budget: '',
  message: '',
  website: '',
};

export function EnquiryForm() {
  const { requestedEvent } = useBooking();
  const [result, setResult] = useState<DeliveryResult | null>(null);
  const [submitError, setSubmitError] = useState(false);
  const [copied, setCopied] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: defaults,
    mode: 'onTouched',
  });

  // Apply an event type chosen from a service card or the lightbox.
  useEffect(() => {
    if (requestedEvent) setValue('eventType', requestedEvent.type, { shouldValidate: true });
  }, [requestedEvent, setValue]);

  useEffect(() => {
    if (result || submitError) statusRef.current?.focus();
  }, [result, submitError]);

  const onSubmit = async (values: EnquiryValues) => {
    setSubmitError(false);
    if (values.website) return; // honeypot tripped: silently ignore bots
    try {
      const delivered = await deliverEnquiry(values);
      setCopied(Boolean(delivered.copied));
      setResult(delivered);
      reset(defaults);
    } catch {
      setSubmitError(true);
    }
  };

  const copyAgain = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (result) {
    const copy = {
      endpoint: { title: 'Thank you, your enquiry is in.', body: 'We have received your details and will be in touch soon to talk through your date and coverage.' },
      whatsapp: { title: 'Almost there.', body: 'WhatsApp should have opened with your enquiry ready to send. If it did not, use the button below.' },
      email: { title: 'Almost there.', body: 'Your email app should have opened with your enquiry ready to send. If it did not, use the button below.' },
      instagram: {
        title: 'One last step.',
        body: copied
          ? `Your enquiry has been copied. Open Instagram, paste it into a message to ${instagramHandle}, and send.`
          : `Open Instagram and send us your details in a message to ${instagramHandle}. Your enquiry is shown below so you can copy it.`,
      },
    }[result.channel];

    return (
      <m.div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="outline-none"
      >
        <span className="flex size-12 items-center justify-center rounded-full border border-gold text-gold-light">
          <Check className="size-5" />
        </span>
        <h3 className="mt-6 font-serif text-3xl">{copy.title}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-mist">{copy.body}</p>

        {result.channel === 'instagram' && (
          <pre className="mt-6 max-h-56 overflow-auto border border-line bg-ink/60 p-4 font-sans text-xs leading-relaxed whitespace-pre-wrap text-paper/80">
            {result.message}
          </pre>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {result.link && (
            <ButtonLink
              href={result.link}
              target={result.channel === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              icon={<ArrowUpRight className="size-4" />}
            >
              {result.channel === 'whatsapp' ? 'Open WhatsApp' : result.channel === 'email' ? 'Open email' : 'Message on Instagram'}
            </ButtonLink>
          )}
          {result.channel === 'instagram' && (
            <Button variant="outline" onClick={copyAgain} icon={copied ? <Check className="size-4" /> : <Copy className="size-4" />}>
              {copied ? 'Copied' : 'Copy enquiry'}
            </Button>
          )}
          <Button variant="ghost" onClick={() => setResult(null)}>
            Send another enquiry
          </Button>
        </div>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby="form-channel-hint">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <Field label="Your name" required error={errors.name?.message}>
          <input type="text" autoComplete="name" placeholder="Full name" className={fieldClass} {...register('name')} />
        </Field>
        <Field label="Phone number" required error={errors.phone?.message}>
          <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" className={fieldClass} {...register('phone')} />
        </Field>
        <Field label="Email" error={errors.email?.message} className="sm:col-span-2">
          <input type="email" autoComplete="email" placeholder="you@example.com" className={fieldClass} {...register('email')} />
        </Field>
        <Field label="Event type" required error={errors.eventType?.message} trailing={<ChevronDown className="size-4" />}>
          <select className={`${fieldClass} appearance-none pr-8 [&>option]:bg-ink`} {...register('eventType')}>
            <option value="" disabled>
              Choose an event
            </option>
            {eventTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Event date" required error={errors.eventDate?.message}>
          <input type="date" min={todayIso()} className={`${fieldClass} [color-scheme:dark]`} {...register('eventDate')} />
        </Field>
        <Field label="Event location" required error={errors.location?.message}>
          <input type="text" autoComplete="address-level2" placeholder="Venue or city" className={fieldClass} {...register('location')} />
        </Field>
        <Field label="Budget range" error={errors.budget?.message} trailing={<ChevronDown className="size-4" />}>
          <select className={`${fieldClass} appearance-none pr-8 [&>option]:bg-ink`} {...register('budget')}>
            <option value="">Prefer to discuss</option>
            {site.budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tell us about your event" required error={errors.message?.message} className="sm:col-span-2">
          <textarea rows={4} placeholder="The occasion, the moments that matter most, any questions…" className={`${fieldClass} resize-y`} {...register('message')} />
        </Field>

        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Leave this empty
            <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
          </label>
        </div>
      </div>

      <AnimatePresence>
        {submitError && (
          <m.div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 flex gap-3 border border-danger/40 bg-danger-deep/15 p-4 text-sm text-paper outline-none"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-danger" />
            <p>
              Sorry, we couldn't send your enquiry just now. Please try again
              {site.social.instagram && (
                <>
                  {' '}or message us on{' '}
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gold-light underline underline-offset-4">
                    Instagram
                  </a>
                </>
              )}
              .
            </p>
          </m.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-channel-hint" className="max-w-xs text-xs leading-relaxed text-paper/45">
          {channelHint[activeChannel]}
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />}
        >
          {isSubmitting ? 'Sending' : 'Reserve your date'}
        </Button>
      </div>
    </form>
  );
}
