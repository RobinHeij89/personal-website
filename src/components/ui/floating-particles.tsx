/**
 * ## Component: FloatingParticles
 * 
 * ### Purpose:
 * Creates floating particle animation in the background for added visual interest.
 * Particles move based on mouse movement and scroll position.
 * 
 * ### Props:
 * - count: number of particles (default: 50)
 * 
 * ### Example:
 * ```tsx
 * <FloatingParticles count={100} />
 * ```
 */

import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { useCursorTracker } from '@/hooks/useAdvancedAnimations';
import styles from './floating-particles.module.css';

interface FloatingParticlesProps {
  count?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 50 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePosition = useCursorTracker();
  const mousePositionRef = useRef(mousePosition);
  const animationRef = useRef<number | null>(null);

  // Update mouse position ref without causing re-renders
  useEffect(() => {
    mousePositionRef.current = mousePosition;
  }, [mousePosition]);

  // Memoize colors array to prevent recreation on every render
  const colors = useMemo(() => ['#EA401E', '#B4A890', '#B3B3B3', '#FFFFFF'], []);

  // Memoize particle initialization to prevent recreation on mouse move
  const initializeParticles = useCallback((canvas: HTMLCanvasElement) => {
    if (particlesRef.current.length === count) return; // Only initialize if not already done
    
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, [count, colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialize particles only on resize, not on mouse move
      initializeParticles(canvas);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles only once
    initializeParticles(canvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction using ref to avoid re-creating effect
        const dx = mousePositionRef.current.x - particle.x;
        const dy = mousePositionRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary checking
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.save();
            ctx.globalAlpha = (80 - distance) / 80 * 0.1;
            ctx.strokeStyle = '#EA401E';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, initializeParticles]);

  return (
    <canvas 
      ref={canvasRef}
      className={styles["floating-particles"]}
    />
  );
};