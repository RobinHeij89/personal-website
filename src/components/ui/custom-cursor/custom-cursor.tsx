/**
 * ## Component: CustomCursor
 * 
 * ### Purpose:
 * Creates an interactive custom cursor that follows mouse movement
 * and provides visual feedback on hover states.
 * 
 * ### Props:
 * None - global cursor component
 * 
 * ### Example:
 * ```tsx
 * <CustomCursor />
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useCursorTracker } from '@/hooks/useAdvancedAnimations';
import styles from './custom-cursor.module.css';

export const CustomCursor: React.FC = () => {
  const mousePosition = useCursorTracker();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState('');
  const [cursorText, setCursorText] = useState('');
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [ctaPosition, setCtaPosition] = useState({ x: 0, y: 0, width: 0, height: 0, borderRadius: '0px' });
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0, width: 0, height: 0, borderRadius: '0px' });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Cancel previous animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Use requestAnimationFrame for smoother updates
    rafRef.current = requestAnimationFrame(() => {
      if (cursorType === 'logo') {
        // Position cursor exactly at logo center and use larger dimension for perfect circle
        const logoSize = Math.max(logoPosition.width, logoPosition.height);
        cursor.style.left = `${logoPosition.x}px`;
        cursor.style.top = `${logoPosition.y}px`;
        cursor.style.transform = `translate(-50%, -50%)`;
        cursor.style.setProperty('--cursor-logo-width', `${logoSize}px`);
        cursor.style.setProperty('--cursor-logo-height', `${logoSize}px`);
      } else if (cursorType === 'cta') {
        // Position cursor exactly at CTA button center and match dimensions
        cursor.style.left = `${ctaPosition.x}px`;
        cursor.style.top = `${ctaPosition.y}px`;
        cursor.style.transform = `translate(-50%, -50%)`;
        cursor.style.setProperty('--cursor-cta-width', `${ctaPosition.width}px`);
        cursor.style.setProperty('--cursor-cta-height', `${ctaPosition.height}px`);
        cursor.style.setProperty('--cursor-cta-border-radius', ctaPosition.borderRadius);
      } else if (cursorType === 'button') {
        // Position cursor exactly at generic button center and match dimensions
        cursor.style.left = `${buttonPosition.x}px`;
        cursor.style.top = `${buttonPosition.y}px`;
        cursor.style.transform = `translate(-50%, -50%)`;
        cursor.style.setProperty('--cursor-button-width', `${buttonPosition.width}px`);
        cursor.style.setProperty('--cursor-button-height', `${buttonPosition.height}px`);
        cursor.style.setProperty('--cursor-button-border-radius', buttonPosition.borderRadius);
      } else {
        // Normal mouse following behavior
        cursor.style.left = `${mousePosition.x}px`;
        cursor.style.top = `${mousePosition.y}px`;
        cursor.style.transform = `translate(-50%, -50%)`;
      }
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [mousePosition, cursorType, logoPosition, ctaPosition, buttonPosition]);

  useEffect(() => {
    // Add cursor hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
    
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      
      const cursorType = target.getAttribute('data-cursor-type') || '';
      const cursorTextValue = target.getAttribute('data-cursor') || '';
      setCursorType(cursorType);
      setCursorText(cursorTextValue);

      // If hovering over logo, get its position
      if (cursorType === 'logo') {
        const rect = target.getBoundingClientRect();
        setLogoPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height
        });
      }

      // If hovering over CTA button, get its position and dimensions
      if (cursorType === 'cta') {
        const rect = target.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(target);
        setCtaPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
          borderRadius: computedStyle.borderRadius || '0px'
        });
      }

      // If hovering over generic button, get its position and dimensions
      if (cursorType === 'button') {
        const rect = target.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(target);
        setButtonPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
          borderRadius: computedStyle.borderRadius || '0px'
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorType('');
      setCursorText('');
    };

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={clsx(
        styles.cursor,
        {
          [styles['cursor--hover']]: isHovering,
          [styles['cursor--logo']]: cursorType === 'logo',
          [styles['cursor--cta']]: cursorType === 'cta',
          [styles['cursor--button']]: cursorType === 'button'
        }
      )}
    >
      <div className={styles.cursor__inner}>
        {cursorText && (
          <span className={styles.cursor__text}>{cursorText}</span>
        )}
      </div>
    </div>
  );
};