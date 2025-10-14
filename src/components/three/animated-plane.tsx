/**
 * ## Component: AnimatedPlane
 * 
 * ### Purpose:
 * A Three.js plane with animated shader effects for the hero section background.
 * Creates a dynamic, colorful pattern using custom vertex and fragment shaders.
 * 
 * ### Props:
 * - `position?: [number, number, number]` - Position in 3D space
 * - `rotation?: [number, number, number]` - Rotation in radians [x, y, z]
 * - `scale?: number` - Scale factor for the plane
 * - `colors?: string[]` - Array of colors for the shader animation
 * 
 * ### Example:
 * ```tsx
 * <AnimatedPlane 
 *   position={[0, 0, -1]} 
 *   rotation={[0.1, 0, 0.2]}
 *   scale={1.5} 
 *   colors={["#130705", "#1E1E1E", "#EA401E", "#B4A890", "#B3B3B3"]} 
 * />
 * ```
 */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '@/assets/shaders/vertex.glsl?raw';
import fragmentShader from '@/assets/shaders/fragment.glsl?raw';

interface AnimatedPlaneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  colors?: string[];
}

export const AnimatedPlane: React.FC<AnimatedPlaneProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1.5,
  colors = ["#130705", "#1E1E1E", "#EA401E", "#B4A890", "#B3B3B3"]
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    progress: { value: 0 },
    uColor: { value: colors.map(color => new THREE.Color(color)) },
    resolution: { value: new THREE.Vector4() },
    pixels: { value: new THREE.Vector2(1024, 1024) },
    texture1: { value: null }
  }), [colors]);

  const shaderMaterial = useMemo(() => 
    new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
      wireframe: false,
      transparent: false,
    }), [uniforms]
  );

  useFrame((state) => {
    if (meshRef.current && shaderMaterial.uniforms) {
      const time = state.clock.elapsedTime;
      shaderMaterial.uniforms.time.value = time/25;
      shaderMaterial.uniforms.progress.value = (Math.sin(time * 0.4) + 1) / 2; // 0 to 1 oscillation
      
      // Update resolution for responsive behavior
      const { width, height } = state.size;
      shaderMaterial.uniforms.resolution.value.set(width, height, width / height, height / width);
      shaderMaterial.uniforms.pixels.value.set(width, height);
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[2, 2, 128, 128]} />
      <primitive object={shaderMaterial} />
    </mesh>
  );
};