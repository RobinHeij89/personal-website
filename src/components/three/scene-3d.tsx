/**
 * ## Component: Scene3D
 * 
 * ### Purpose:
 * A wrapper component that provides the Three.js Canvas context with proper
 * accessibility features and responsive configuration for 3D scenes.
 * 
 * ### Props:
 * - `children: React.ReactNode` - 3D components to render within the canvas
 * - `camera?: object` - Camera configuration object
 * - `className?: string` - CSS class for styling
 * 
 * ### Example:
 * ```tsx
 * <Scene3D camera={{ position: [0, 0, 5] }}>
 *   <AnimatedPlane />
 * </Scene3D>
 * ```
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import styles from './scene-3d.module.css';

interface Scene3DProps {
  children: React.ReactNode;
  camera?: object;
  className?: string;
}

export const Scene3D: React.FC<Scene3DProps> = ({
  children,
  camera = { position: [0, 0, 5], fov: 75 },
  className
}) => {
  const containerClasses = className 
    ? `${styles.container} ${className}` 
    : styles.container;

  return (
    <div className={containerClasses}>
      <Canvas
        camera={camera}
        dpr={[1, 2]}
        className={styles.canvas}
        role="img"
        aria-label="Interactive 3D scene"
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};