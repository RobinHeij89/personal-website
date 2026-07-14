import React, { useEffect, useRef } from 'react';
import styles from './custom-cursor.module.css';

type State = 'default' | 'nav' | 'photo';

const LABEL: Record<State, string> = {
  default: '',
  nav: '→',
  photo: 'HI',
};

export const CustomCursor: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on mouse-capable devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const wrapper = wrapperRef.current;
    const visual = visualRef.current;
    const label = labelRef.current;
    const box = boxRef.current;
    if (!wrapper || !visual || !label || !box) return;

    let mx = -200;
    let my = -200;
    let state: State = 'default';
    let activeBrandEl: HTMLElement | null = null;
    let raf = 0;

    // The cursor always tracks the mouse — including over brands, where the
    // outline box is a separate element rather than the cursor itself.
    const loop = () => {
      wrapper.style.transform = `translate(${mx}px, ${my}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const applyVisual = (newState: State) => {
      visual.setAttribute('data-state', newState);
      label.textContent = LABEL[newState];
    };

    const syncBox = () => {
      if (!activeBrandEl) return;
      const rect = activeBrandEl.getBoundingClientRect();
      box.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
      box.style.width = `${rect.width}px`;
      box.style.height = `${rect.height}px`;
    };

    const enterBrand = (el: HTMLElement) => {
      if (activeBrandEl === el) return;
      const isFirst = activeBrandEl === null;
      activeBrandEl = el;

      // On first entry place the box directly instead of sliding it in from
      // wherever it was left; afterwards it glides between brands.
      if (isFirst) box.style.transition = 'none';
      syncBox();
      if (isFirst) {
        void box.offsetWidth;
        box.style.transition = '';
      }
      box.setAttribute('data-active', 'true');
    };

    const exitBrand = () => {
      if (!activeBrandEl) return;
      activeBrandEl = null;
      box.removeAttribute('data-active');
    };

    const setState = (newState: State) => {
      if (state === newState) return;
      state = newState;
      applyVisual(newState);
    };

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as Element;
      const brand = t.closest('[data-cursor="brand"]') as HTMLElement | null;
      const photo = t.closest('[data-cursor="photo"]');
      const clickable = t.closest('a[href], button, [role="button"]');

      if (brand) {
        enterBrand(brand);
        setState('default');
        return;
      }

      exitBrand();
      if (photo) setState('photo');
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
    window.addEventListener('scroll', syncBox, { passive: true });
    window.addEventListener('resize', syncBox);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('scroll', syncBox);
      window.removeEventListener('resize', syncBox);
    };
  }, []);

  return (
    <>
      <div ref={boxRef} className={styles.box} aria-hidden="true" />
      <div ref={wrapperRef} className={styles.wrapper}>
        <div ref={visualRef} className={styles.cursor} data-state="default">
          <span ref={labelRef} className={styles.label} />
        </div>
      </div>
    </>
  );
};
