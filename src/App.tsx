import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { BookingProvider } from '@/context/BookingContext';
import { Home } from '@/pages/Home';

export default function App() {
  return (
    // reducedMotion="user" disables transform/layout animations for visitors who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <BookingProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-3 focus:text-sm focus:text-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">
            <Home />
          </main>
          <Footer />
          <WhatsAppButton />
        </BookingProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
