/**
 * ## Component: Particles
 * 
 * ### Purpose:
 * Three.js based particle system that creates floating particles with mouse interaction.
 * More performant than DOM-based particles and integrates seamlessly with the 3D scene.
 * 
 * ### Props:
 * - count: number of particles (default: 100)
 * 
 * ### Example:
 * ```tsx
 * <Particles count={150} />
 * ```
 */

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScrollParallax } from '@/hooks/useAdvancedAnimations';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
}

export const Particles: React.FC<ParticlesProps> = ({ count = 100 }) => {
  const mesh = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const scrollY = useScrollParallax();
  
  // Create circular texture for particles
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Clear canvas with transparent background
      context.clearRect(0, 0, 64, 64);
      
      // Create radial gradient for smooth circle
      const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, 64, 64);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
  
  // Create particle positions and properties
  const [positions, colors, scales] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    const colorPalette = [
      new THREE.Color('#EA401E'), // Orange
      new THREE.Color('#B4A890'), // Beige
      new THREE.Color('#B3B3B3'), // Light gray
      new THREE.Color('#FFFFFF'), // White
    ];
    
    for (let i = 0; i < count; i++) {
      // Spread particles to cover scroll experience but keep them visible
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 4; // x - reasonable width coverage
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 8; // y - good vertical spread for scroll
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3; // z - shallow depth for visibility
      
      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Extremely small and varied scale
      scales[i] = Math.random() * 0.02 + 0.005;
    }
    
    return [positions, colors, scales];
  }, [count, viewport.width, viewport.height]);
  
  // Store initial positions for drift calculation
  const initialPositions = useMemo(() => positions.slice(), [positions]);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionArray = mesh.current.geometry.attributes.position.array as Float32Array;
    
    // Calculate parallax offset based on scroll (very subtle movement)
    const parallaxY = scrollY * 0.02; // Barely noticeable parallax
    const parallaxX = scrollY * 0.01; // Extremely minimal horizontal drift
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Get initial position
      const initX = initialPositions[i3];
      const initY = initialPositions[i3 + 1];
      const initZ = initialPositions[i3 + 2];
      
      // Create unique random seeds for each particle
      const seedX = i * 0.1;
      const seedY = i * 0.13;
      const seedZ = i * 0.17;
      
      // Very slow, randomized drift with different speeds per particle
      const driftX = Math.sin(time * (0.01 + seedX * 0.005) + seedX) * 0.1;
      const driftY = Math.cos(time * (0.008 + seedY * 0.005) + seedY) * 0.1;
      const driftZ = Math.sin(time * (0.005 + seedZ * 0.003) + seedZ) * 0.05;
      
      // Very subtle mouse interaction - much less aggressive
      const mouseX = mouse.x * viewport.width / 2;
      const mouseY = mouse.y * viewport.height / 2;
      
      const dx = mouseX - (initX + driftX);
      const dy = mouseY - (initY + driftY);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      let mouseForceX = 0;
      let mouseForceY = 0;
      
      if (distance < 5) {
        const force = (5 - distance) / 5 * 0.01;
        mouseForceX = (dx / distance) * force;
        mouseForceY = (dy / distance) * force;
      }
      
      // Update positions with parallax effects
      positionArray[i3] = initX + driftX + mouseForceX + parallaxX;
      positionArray[i3 + 1] = initY + driftY + mouseForceY + parallaxY;
      positionArray[i3 + 2] = initZ + driftZ;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={circleTexture}
        size={0.022}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        alphaTest={0.001}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};