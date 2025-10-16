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
import { AnimatedPlane } from '@/features/hero/components/animated-plane';
import { Particles } from '@/components/three/particles/particles';

export const HeroScene: React.FC = () => {
  return (
    <>
      {/* Floating particles in 3D space */}
      <Particles count={450} />
      
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
        color="#10B981"
      />
      
      <AnimatedPlane 
        position={[0, 0, -3]} 
        rotation={[-0.2, 0, 0.3]}
        scale={50}
        colors={["#0D1B2A", "#1B2937", "#10B981", "#22D3EE", "#374151"]}
      />
    </>
  );
};