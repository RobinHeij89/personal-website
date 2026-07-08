import React from 'react';
import Navigation from '@/features/navigation/components/navigation';
import { AvailabilityBanner } from '@/features/availability/components/availability-banner';
import { Hero } from '@/features/hero/components/hero';
import { IntroSection } from '@/features/intro/components/intro-section';
import { WorksSection } from '@/features/works/components/works-section';
import { ContactSection } from '@/features/contact/components/contact-section';
import { SocialsBand } from '@/features/socials/components/socials-band';
import { Footer } from '@/components/layout/footer/footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTheme } from '@/hooks/useTheme';
import '@/styles/animations.css';

const App: React.FC = () => {
  useScrollReveal();
  const { theme, toggle } = useTheme();

  return (
    <>
      <AvailabilityBanner />
      <Navigation theme={theme} onThemeToggle={toggle} />
      <Hero />
      <IntroSection />
      <WorksSection />
      <ContactSection />
      <SocialsBand />
      <Footer />
    </>
  );
};

export default App;
