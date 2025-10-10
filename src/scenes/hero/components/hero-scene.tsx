/**
 * ## Component: HeroScene
 * 
 * ### Purpose:
 * The main hero section 3D scene containing animated elements for the
 * portfolio landing page. Showcases Three.js capabilities.
 * 
 * ### Props:
 * None - self-contained scene
 * 
 * ### Example:
 * ```tsx
 * <HeroScene />
 * ```
 */

import React from 'react';
import { AnimatedPlane } from '@/components/three/animated-plane';

export const HeroScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[0.5, 0, 0.866]} 
        intensity={0.5} 
      />
      <AnimatedPlane 
        position={[0, 0, 0]} 
        scale={1.5}
      />
    </>
  );
};