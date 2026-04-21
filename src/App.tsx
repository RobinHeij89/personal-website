import React from 'react';
import Navigation from '@/features/navigation/components/navigation';
import { Hero } from '@/features/hero/components/hero';
import { IntroSection } from '@/features/intro/components/intro-section';
import { WorksSection } from '@/features/works/components/works-section';
import { ContactSection } from '@/features/contact/components/contact-section';
import { Footer } from '@/components/layout/footer/footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import '@/styles/animations.css';

const App: React.FC = () => {
  useScrollReveal();

  return (
    <>
      <Navigation />
      <Hero />
      <IntroSection />
      <WorksSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default App;
