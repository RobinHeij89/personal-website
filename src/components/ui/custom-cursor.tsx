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
import { useCursorTracker } from '@/hooks/useAdvancedAnimations';
import styles from './custom-cursor.module.css';

export const CustomCursor: React.FC = () => {
  const mousePosition = useCursorTracker();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState('');
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
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
        // Position cursor exactly at logo center
        cursor.style.left = `${logoPosition.x}px`;
        cursor.style.top = `${logoPosition.y}px`;
        cursor.style.transform = `translate(-50%, -50%)`;
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
  }, [mousePosition, cursorType, logoPosition]);

  useEffect(() => {
    // Add cursor hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
    
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      
      const cursorText = target.getAttribute('data-cursor') || 'CLICK';
      const cursorType = target.getAttribute('data-cursor-type') || '';
      setCursorText(cursorText);
      setCursorType(cursorType);

      // If hovering over logo, get its position
      if (cursorType === 'logo') {
        const rect = target.getBoundingClientRect();
        setLogoPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
      setCursorType('');
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
      className={`${styles.cursor} ${isHovering ? styles['cursor--hover'] : ''} ${cursorType === 'logo' ? styles['cursor--logo'] : ''}`}
    >
      <div className={styles.cursor__inner}>
        {cursorType === 'logo' ? (
          <img 
            src="/logo.svg" 
            alt="Robin Heij Logo"
            className={styles.cursor__logo}
          />
        ) : cursorText ? (
          <span className={styles.cursor__text}>{cursorText}</span>
        ) : null}
      </div>
    </div>
  );
};