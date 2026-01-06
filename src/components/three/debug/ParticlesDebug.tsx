/**
 * ## Component: ParticlesDebug
 * 
 * ### Purpose:
 * A specialized debug panel for the Particles component that allows real-time
 * tweaking of particle properties like count, size, opacity, and colors.
 * 
 * ### Props:
 * - `material: THREE.PointsMaterial` - The particle material to debug
 * - `count: number` - Number of particles
 * - `enabled?: boolean` - Whether debug panel should be shown
 * 
 * ### Example:
 * ```tsx
 * <ParticlesDebug material={particleMaterial} count={450} />
 * ```
 */

import { useEffect, useRef } from 'react';
import { getGUI } from './guiManager';
import * as THREE from 'three';

interface ParticlesDebugProps {
  material: THREE.PointsMaterial;
  count: number;
  enabled?: boolean;
}

export const ParticlesDebug: React.FC<ParticlesDebugProps> = ({
  material,
  count,
  enabled = import.meta.env.DEV
}) => {
  const folderRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled || !material) return;

    // Get shared GUI instance
    const gui = getGUI();
    const particlesFolder = gui.addFolder('Particles');
    folderRef.current = particlesFolder;

    // Particle count (read-only)
    const stats = { count };
    particlesFolder.add(stats, 'count').name('Particle Count').disable();

    // Material properties
    particlesFolder.add(material, 'size', 0.001, 0.1, 0.001).name('Size');
    particlesFolder.add(material, 'opacity', 0, 1, 0.01).name('Opacity');
    particlesFolder.add(material, 'transparent').name('Transparent');
    particlesFolder.add(material, 'sizeAttenuation').name('Size Attenuation');

    // Blending modes
    const blendingModes = {
      'No Blending': THREE.NoBlending,
      'Normal': THREE.NormalBlending,
      'Additive': THREE.AdditiveBlending,
      'Subtractive': THREE.SubtractiveBlending,
      'Multiply': THREE.MultiplyBlending,
    };

    const blendingSettings = {
      blending: Object.keys(blendingModes).find(
        key => blendingModes[key as keyof typeof blendingModes] === material.blending
      ) || 'Additive'
    };

    particlesFolder.add(blendingSettings, 'blending', Object.keys(blendingModes))
      .name('Blending Mode')
      .onChange((value: string) => {
        material.blending = blendingModes[value as keyof typeof blendingModes];
        material.needsUpdate = true;
      });

    particlesFolder.open();

    // Cleanup - only remove the folder, not the entire GUI
    return () => {
      if (folderRef.current && folderRef.current.destroy) {
        folderRef.current.destroy();
      }
    };
  }, [enabled, material, count]);

  return null;
};
