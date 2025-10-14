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
      cursor.style.transform = `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`;
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [mousePosition]);

  useEffect(() => {
    // Add cursor hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
    
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      
      const cursorText = target.getAttribute('data-cursor') || 'CLICK';
      setCursorText(cursorText);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
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
      className={`${styles.cursor} ${isHovering ? styles['cursor--hover'] : ''}`}
    >
      <div className={styles.cursor__inner}>
        {cursorText && (
          <span className={styles.cursor__text}>{cursorText}</span>
        )}
      </div>
    </div>
  );
};