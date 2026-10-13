import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { EventType } from '@/types';

interface BookingContextValue {
  /** Event type chosen elsewhere on the page (e.g. a service card); the form applies it then clears it. */
  requestedEvent: { type: EventType; nonce: number } | null;
  /** Pre-select an event type and scroll to the enquiry form. */
  requestBooking: (type?: EventType) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [requestedEvent, setRequestedEvent] = useState<BookingContextValue['requestedEvent']>(null);

  const requestBooking = useCallback((type?: EventType) => {
    if (type) setRequestedEvent({ type, nonce: Date.now() });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const value = useMemo(() => ({ requestedEvent, requestBooking }), [requestedEvent, requestBooking]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}
