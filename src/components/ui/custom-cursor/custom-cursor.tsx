import React, { useEffect, useRef } from 'react';
import styles from './custom-cursor.module.css';

type State = 'default' | 'nav' | 'photo' | 'brand';

const LABEL: Record<State, string> = {
  default: '',
  nav: '→',
  photo: 'HI',
  brand: '',
};

export const CustomCursor: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only run on mouse-capable devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const wrapper = wrapperRef.current;
    const visual = visualRef.current;
    const label = labelRef.current;
    if (!wrapper || !visual || !label) return;

    let mx = -200;
    let my = -200;
    let state: State = 'default';
    let activeBrandEl: HTMLElement | null = null;
    let raf = 0;

    // RAF loop: keep wrapper on mouse in all non-brand states
    const loop = () => {
      if (state !== 'brand') {
        wrapper.style.transform = `translate(${mx}px, ${my}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const applyVisual = (newState: State) => {
      visual.setAttribute('data-state', newState);
      label.textContent = LABEL[newState];
    };

    const enterBrand = (el: HTMLElement) => {
      if (activeBrandEl === el) return;
      activeBrandEl = el;
      state = 'brand'; // stop RAF from updating wrapper

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Slide wrapper to element centre (one-shot CSS transition)
      wrapper.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      wrapper.style.transform = `translate(${cx}px, ${cy}px)`;

      // Grow visual to element dimensions (CSS transition on visual handles this)
      visual.style.width = `${rect.width}px`;
      visual.style.height = `${rect.height}px`;
      applyVisual('brand');
    };

    const exitBrand = (nextState: State) => {
      state = nextState;
      activeBrandEl = null;

      // Snap wrapper back to mouse — RAF takes over immediately
      wrapper.style.transition = 'none';

      // Let CSS transitions shrink visual back to its CSS-defined size
      visual.style.width = '';
      visual.style.height = '';
      applyVisual(nextState);
    };

    const setState = (newState: State, brandEl?: HTMLElement) => {
      if (newState === 'brand' && brandEl) {
        enterBrand(brandEl);
        return;
      }
      if (state === 'brand') {
        exitBrand(newState);
        return;
      }
      if (state === newState) return;
      state = newState;
      applyVisual(newState);
    };

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Keep brand overlay in sync during scroll or resize
      if (state === 'brand' && activeBrandEl) {
        const rect = activeBrandEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        wrapper.style.transition = 'none';
        wrapper.style.transform = `translate(${cx}px, ${cy}px)`;
        visual.style.width = `${rect.width}px`;
        visual.style.height = `${rect.height}px`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as Element;
      const brand = t.closest('[data-cursor="brand"]') as HTMLElement | null;
      const photo = t.closest('[data-cursor="photo"]');
      const clickable = t.closest('a[href], button, [role="button"]');

      if (brand) setState('brand', brand);
      else if (photo) setState('photo');
      else if (clickable) setState('nav');
      else setState('default');
    };

    const onMouseLeave = () => {
      wrapper.style.opacity = '0';
    };
    const onMouseEnter = () => {
      wrapper.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={visualRef} className={styles.cursor} data-state="default">
        <span ref={labelRef} className={styles.label} />
      </div>
    </div>
  );
};
