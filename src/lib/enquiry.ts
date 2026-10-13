import { z } from 'zod';
import { eventTypeOptions, site, whatsappUrl } from '@/config/site';
import type { EventType } from '@/types';

const eventTypes = eventTypeOptions.map((o) => o.value) as [EventType, ...EventType[]];

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'Please keep your name under 80 characters.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter a phone number so we can reach you.')
    .refine((v) => /^\+?[\d\s()-]{7,20}$/.test(v) && v.replace(/\D/g, '').length >= 7, 'Please enter a valid phone number.'),
  email: z.union([z.literal(''), z.string().trim().email('Please enter a valid email address.')]),
  eventType: z.enum(eventTypes, { errorMap: () => ({ message: 'Please choose the type of event.' }) }),
  eventDate: z
    .string()
    .min(1, 'Please choose your event date.')
    .refine((v) => new Date(`${v}T00:00:00`) >= today(), 'The event date cannot be in the past.'),
  location: z.string().trim().min(2, 'Please tell us where the event will take place.').max(120),
  budget: z.string().optional(),
  message: z.string().trim().min(10, 'Please share a few details (at least 10 characters).').max(1500, 'Please keep your message under 1500 characters.'),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(0).optional(),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;

export type DeliveryChannel = 'endpoint' | 'whatsapp' | 'email' | 'instagram';

export interface DeliveryResult {
  channel: DeliveryChannel;
  /** Link the visitor can use if the hand-off window was blocked. */
  link?: string;
  /** Whether the message text was copied to the clipboard (Instagram hand-off). */
  copied?: boolean;
  /** The composed enquiry text, shown for manual copying when needed. */
  message: string;
}

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT?.trim() ?? '';
const FORM_ACCESS_KEY = import.meta.env.VITE_FORM_ACCESS_KEY?.trim() ?? '';

/** The channel the form will use, given the current configuration. */
export const activeChannel: DeliveryChannel = FORM_ENDPOINT
  ? 'endpoint'
  : site.contact.whatsapp
    ? 'whatsapp'
    : site.contact.email
      ? 'email'
      : 'instagram';

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export function composeMessage(values: EnquiryValues) {
  const eventLabel = eventTypeOptions.find((o) => o.value === values.eventType)?.label ?? values.eventType;
  return [
    `Hello ${site.name}! I'd like to enquire about a booking.`,
    '',
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    values.email ? `Email: ${values.email}` : null,
    `Event: ${eventLabel}`,
    `Date: ${formatDate(values.eventDate)}`,
    `Location: ${values.location}`,
    values.budget ? `Budget: ${values.budget}` : null,
    '',
    values.message,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');
}

function openExternal(url: string) {
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  // Some browsers block pop-ups after async validation; the success panel offers the link as a fallback.
  return win !== null;
}

export async function deliverEnquiry(values: EnquiryValues): Promise<DeliveryResult> {
  const message = composeMessage(values);

  switch (activeChannel) {
    case 'endpoint': {
      const { website: _honeypot, ...fields } = values;
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...fields,
          ...(FORM_ACCESS_KEY && { access_key: FORM_ACCESS_KEY }),
          subject: `New ${site.name} enquiry from ${values.name}`,
          summary: message,
        }),
      });
      if (!res.ok) throw new Error(`Form service responded with ${res.status}`);
      return { channel: 'endpoint', message };
    }
    case 'whatsapp': {
      const link = whatsappUrl(message);
      openExternal(link);
      return { channel: 'whatsapp', link, message };
    }
    case 'email': {
      const subject = encodeURIComponent(`Booking enquiry from ${values.name}`);
      const link = `mailto:${site.contact.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
      window.location.href = link;
      return { channel: 'email', link, message };
    }
    case 'instagram': {
      let copied = false;
      try {
        await navigator.clipboard.writeText(message);
        copied = true;
      } catch {
        copied = false;
      }
      const link = `https://ig.me/m/${new URL(site.social.instagram).pathname.replace(/\//g, '')}`;
      return { channel: 'instagram', link, copied, message };
    }
  }
}
