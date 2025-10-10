/**
 * ## Component: AnimatedPlane
 * 
 * ### Purpose:
 * A Three.js plane with animated shader effects for the hero section background.
 * Creates a dynamic, colorful pattern using custom vertex and fragment shaders.
 * 
 * ### Props:
 * - `position?: [number, number, number]` - Position in 3D space
 * - `scale?: number` - Scale factor for the plane
 * - `colors?: string[]` - Array of colors for the shader animation
 * 
 * ### Example:
 * ```tsx
 * <AnimatedPlane 
 *   position={[0, 0, -1]} 
 *   scale={1.5} 
 *   colors={["#69d2e7", "#a7dbd8", "#e0e4cc"]} 
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
  scale?: number;
  colors?: string[];
}

export const AnimatedPlane: React.FC<AnimatedPlaneProps> = ({
  position = [0, 0, 0],
  scale = 1.5,
  colors = ["#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900"]
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    uColor: { value: colors.map(color => new THREE.Color(color)) },
    resolution: { value: new THREE.Vector4() },
  }), [colors]);

  const shaderMaterial = useMemo(() => 
    new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
    }), [uniforms]
  );

  useFrame((state) => {
    if (meshRef.current && shaderMaterial.uniforms) {
      const time = state.clock.elapsedTime;
      shaderMaterial.uniforms.time.value = time;
      
      // Scale the mesh based on time - oscillates between base scale and 2x base scale
      const scaleFactor = scale * (1 + 0.5 * Math.sin(time * 0.5));
      meshRef.current.scale.setScalar(scaleFactor);
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1.5, 1.5, 300, 300]} />
      <primitive object={shaderMaterial} />
    </mesh>
  );
};