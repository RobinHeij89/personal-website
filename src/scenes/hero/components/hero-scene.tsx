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
            <pointLight 
        position={[-1, -1, -2]} 
        intensity={0.2}
        color="#EA401E"
      />
      
      <AnimatedPlane 
        position={[0, 0, 0]} 
        rotation={[-0.1, 0, 0.15]}
        scale={3}
        colors={["#130705", "#1E1E1E", "#EA401E", "#B4A890", "#B3B3B3"]}
      />
    </>
  );
};