import { useEffect, useState } from 'react';

/**
 * Scroll-spy: reports which of the given section ids is currently in view.
 *
 * The root margin collapses the viewport to a thin band across its middle, so
 * a section becomes active as it passes the centre of the screen. Sections
 * without a nav link (e.g. #intro) simply leave the previous link active.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
