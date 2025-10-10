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
      {/* Soft ambient lighting to enhance the shader colors */}
      <ambientLight intensity={0.3} />
      
      {/* Directional light to add depth to the flowing surface */}
      <directionalLight 
        position={[2, 2, 5]} 
        intensity={0.4}
        color="#ffffff"
      />
      
      {/* Additional subtle light from below */}
      <directionalLight 
        position={[-1, -1, -2]} 
        intensity={0.2}
        color="#69d2e7"
      />
      
      <AnimatedPlane 
        position={[0, 0, 0]} 
        rotation={[-0.1, 0, 0.15]}
        scale={3}
        colors={["#F38181", "#FCE38A", "#EAFFD0", "#95E1D3", "#18322d"]}
      />
    </>
  );
};