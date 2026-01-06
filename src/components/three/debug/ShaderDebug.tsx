/**
 * ## Component: ShaderDebug
 * 
 * ### Purpose:
 * A specialized debug panel for shader-based materials that allows real-time
 * tweaking of shader uniforms and material properties.
 * 
 * ### Props:
 * - `material: THREE.ShaderMaterial` - The shader material to debug
 * - `name?: string` - Name of the material for the debug panel
 * - `enabled?: boolean` - Whether debug panel should be shown
 * 
 * ### Example:
 * ```tsx
 * <ShaderDebug material={shaderMaterial} name="Animated Plane" />
 * ```
 */

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { getGUI } from './guiManager';
import * as THREE from 'three';

interface ShaderDebugProps {
  material: THREE.ShaderMaterial;
  name?: string;
  enabled?: boolean;
}

export const ShaderDebug: React.FC<ShaderDebugProps> = ({
  material,
  name = 'Shader',
  enabled = import.meta.env.DEV
}) => {
  const folderRef = useRef<any>(null);
  const statsRef = useRef({ fps: 0, frameTime: 0 });
  const lastTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);

  useFrame(() => {
    if (!enabled) return;

    // Calculate FPS
    frameCountRef.current++;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTimeRef.current;

    if (deltaTime >= 1000) {
      statsRef.current.fps = Math.round((frameCountRef.current * 1000) / deltaTime);
      statsRef.current.frameTime = Math.round(deltaTime / frameCountRef.current * 100) / 100;
      frameCountRef.current = 0;
      lastTimeRef.current = currentTime;
    }
  });

  useEffect(() => {
    if (!enabled || !material) return;

    // Get shared GUI instance
    const gui = getGUI();
    const materialFolder = gui.addFolder(name);
    folderRef.current = materialFolder;

    // Material properties
    materialFolder.add(material, 'wireframe').name('Wireframe');
    materialFolder.add(material, 'transparent').name('Transparent');

    if (material.transparent) {
      materialFolder.add(material, 'opacity', 0, 1, 0.01).name('Opacity');
    }

    // Uniforms folder
    if (material.uniforms) {
      const uniformsFolder = materialFolder.addFolder('Uniforms');

      Object.entries(material.uniforms).forEach(([key, uniform]) => {
        const value = uniform.value;

        // Skip complex objects like textures
        if (key === 'texture1' || value === null || value === undefined) return;

        // Handle different uniform types
        if (typeof value === 'number') {
          // Detect time/progress uniforms for better ranges
          if (key === 'time') {
            uniformsFolder.add(uniform, 'value', 0, 100, 0.01).name(key);
          } else if (key === 'progress') {
            uniformsFolder.add(uniform, 'value', 0, 1, 0.01).name(key);
          } else {
            uniformsFolder.add(uniform, 'value', -10, 10, 0.01).name(key);
          }
        }
        else if (value instanceof THREE.Vector2) {
          const vecFolder = uniformsFolder.addFolder(key);
          vecFolder.add(value, 'x', 0, 2048, 1).name('x');
          vecFolder.add(value, 'y', 0, 2048, 1).name('y');
          vecFolder.close();
        }
        else if (value instanceof THREE.Vector3) {
          const vecFolder = uniformsFolder.addFolder(key);
          vecFolder.add(value, 'x', -10, 10, 0.1).name('x');
          vecFolder.add(value, 'y', -10, 10, 0.1).name('y');
          vecFolder.add(value, 'z', -10, 10, 0.1).name('z');
          vecFolder.close();
        }
        else if (value instanceof THREE.Vector4) {
          const vecFolder = uniformsFolder.addFolder(key);
          vecFolder.add(value, 'x', -10, 10, 0.1).name('x');
          vecFolder.add(value, 'y', -10, 10, 0.1).name('y');
          vecFolder.add(value, 'z', -10, 10, 0.1).name('z');
          vecFolder.add(value, 'w', -10, 10, 0.1).name('w');
          vecFolder.close();
        }
        else if (value instanceof THREE.Color) {
          const colorObj = { color: `#${value.getHexString()}` };
          uniformsFolder.addColor(colorObj, 'color').name(key).onChange((newColor: string) => {
            value.set(newColor);
          });
        }
        else if (Array.isArray(value) && value[0] instanceof THREE.Color) {
          // Handle color arrays
          const colorsFolder = uniformsFolder.addFolder(key);
          value.forEach((color: THREE.Color, index: number) => {
            const colorObj = { color: `#${color.getHexString()}` };
            colorsFolder.addColor(colorObj, 'color').name(`Color ${index + 1}`).onChange((newColor: string) => {
              color.set(newColor);
            });
          });
          colorsFolder.close();
        }
      });

      uniformsFolder.close();
    }

    // Performance stats
    const statsFolder = materialFolder.addFolder('Performance');
    const fpsController = statsFolder.add(statsRef.current, 'fps', 0, 144, 1).name('FPS').disable();
    const frameTimeController = statsFolder.add(statsRef.current, 'frameTime', 0, 100, 0.01).name('Frame Time (ms)').disable();

    // Update stats display
    const updateInterval = setInterval(() => {
      fpsController.updateDisplay();
      frameTimeController.updateDisplay();
    }, 100);

    statsFolder.close();

    materialFolder.open();

    // Cleanup - only remove the folder, not the entire GUI
    return () => {
      clearInterval(updateInterval);
      if (folderRef.current && folderRef.current.destroy) {
        folderRef.current.destroy();
      }
    };
  }, [enabled, material, name]);

  return null;
};
