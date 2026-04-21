import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right, .stagger';
    const els = document.querySelectorAll<HTMLElement>(selectors);

    // Hero elements animate on load
    window.addEventListener('load', () => {
      document.querySelectorAll<HTMLElement>('#about .reveal-left, #about .reveal-right, #about .stagger')
        .forEach(el => el.classList.add('visible'));
    }, { once: true });

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

    return () => observer.disconnect();
  }, []);
}
