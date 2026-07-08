import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-bottom, .stagger';
    const els = document.querySelectorAll<HTMLElement>(selectors);

    // Hero elements animate in immediately on mount (next frame so the
    // transition plays). Don't rely on `window.load` — it may have already
    // fired by the time React mounts, leaving the hero stuck at opacity 0.
    const revealHero = () =>
      document.querySelectorAll<HTMLElement>('#about .reveal, #about .reveal-left, #about .reveal-right, #about .reveal-bottom, #about .stagger')
        .forEach(el => el.classList.add('visible'));
    const heroRaf = requestAnimationFrame(revealHero);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => {
      if (!el.closest('#about')) observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(heroRaf);
      observer.disconnect();
    };
  }, []);
}
