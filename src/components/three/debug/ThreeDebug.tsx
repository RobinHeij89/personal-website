/**
 * ## Component: ThreeDebug
 * 
 * ### Purpose:
 * A debug panel using lil-gui that allows real-time tweaking of Three.js
 * scene parameters. Only shown in development mode.
 * 
 * ### Props:
 * - `scene?: THREE.Scene` - The Three.js scene to debug
 * - `enabled?: boolean` - Whether debug panel should be shown (default: process.env.NODE_ENV === 'development')
 * 
 * ### Example:
 * ```tsx
 * <ThreeDebug enabled={true} />
 * ```
 */

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { getGUI } from './guiManager';

interface ThreeDebugProps {
  enabled?: boolean;
}

export const ThreeDebug: React.FC<ThreeDebugProps> = ({
  enabled = import.meta.env.DEV
}) => {
  const foldersRef = useRef<any[]>([]);
  const { scene, camera, gl } = useThree();

  useEffect(() => {
    if (!enabled) return;

    // Get shared GUI instance
    const gui = getGUI();
    foldersRef.current = [];

    // Camera controls
    const cameraFolder = gui.addFolder('Camera');
    foldersRef.current.push(cameraFolder);
    cameraFolder.add(camera.position, 'x', -10, 10, 0.1).name('Position X');
    cameraFolder.add(camera.position, 'y', -10, 10, 0.1).name('Position Y');
    cameraFolder.add(camera.position, 'z', -10, 10, 0.1).name('Position Z');

    if ('fov' in camera) {
      cameraFolder.add(camera, 'fov', 10, 120, 1).name('FOV').onChange(() => {
        camera.updateProjectionMatrix();
      });
    }
    cameraFolder.close();

    // Renderer settings
    const rendererFolder = gui.addFolder('Renderer');
    foldersRef.current.push(rendererFolder);
    const rendererSettings = {
      pixelRatio: gl.getPixelRatio(),
      toneMapping: gl.toneMapping,
      toneMappingExposure: gl.toneMappingExposure,
    };

    rendererFolder.add(rendererSettings, 'pixelRatio', 1, 3, 0.1).name('Pixel Ratio').onChange((value: number) => {
      gl.setPixelRatio(value);
    });

    rendererFolder.add(rendererSettings, 'toneMappingExposure', 0, 3, 0.1).name('Exposure').onChange((value: number) => {
      gl.toneMappingExposure = value;
    });
    rendererFolder.close();

    // Scene lights
    const lightsFolder = gui.addFolder('Lights');
    foldersRef.current.push(lightsFolder);
    const lights = scene.children.filter(child => child.type.includes('Light'));

    lights.forEach((light, index) => {
      const lightFolder = lightsFolder.addFolder(`${light.type} ${index + 1}`);

      if ('intensity' in light) {
        lightFolder.add(light as any, 'intensity', 0, 5, 0.1).name('Intensity');
      }

      if ('color' in light && light.color && typeof (light.color as any).getHexString === 'function') {
        const colorObj = { color: `#${(light.color as any).getHexString()}` };
        lightFolder.addColor(colorObj, 'color').name('Color').onChange((value: string) => {
          (light.color as any)?.set(value);
        });
      }

      if ('position' in light && light.position) {
        lightFolder.add(light.position, 'x', -10, 10, 0.1).name('Position X');
        lightFolder.add(light.position, 'y', -10, 10, 0.1).name('Position Y');
        lightFolder.add(light.position, 'z', -10, 10, 0.1).name('Position Z');
      }

      lightFolder.close();
    });
    lightsFolder.close();

    // Helper to find meshes with specific properties
    const meshes = scene.children.filter(child => child.type === 'Mesh' || child.type === 'Points');

    if (meshes.length > 0) {
      const meshesFolder = gui.addFolder('Objects');
      foldersRef.current.push(meshesFolder);

      meshes.forEach((mesh, index) => {
        const meshFolder = meshesFolder.addFolder(`${mesh.type} ${index + 1}`);

        if ('position' in mesh && mesh.position) {
          meshFolder.add(mesh.position, 'x', -10, 10, 0.1).name('Position X');
          meshFolder.add(mesh.position, 'y', -10, 10, 0.1).name('Position Y');
          meshFolder.add(mesh.position, 'z', -10, 10, 0.1).name('Position Z');
        }

        if ('rotation' in mesh && mesh.rotation) {
          meshFolder.add(mesh.rotation, 'x', -Math.PI, Math.PI, 0.01).name('Rotation X');
          meshFolder.add(mesh.rotation, 'y', -Math.PI, Math.PI, 0.01).name('Rotation Y');
          meshFolder.add(mesh.rotation, 'z', -Math.PI, Math.PI, 0.01).name('Rotation Z');
        }

        if ('scale' in mesh && mesh.scale) {
          const scaleSettings = { scale: mesh.scale.x };
          meshFolder.add(scaleSettings, 'scale', 0.1, 10, 0.1).name('Scale').onChange((value: number) => {
            mesh.scale.setScalar(value);
          });
        }

        if ('visible' in mesh) {
          meshFolder.add(mesh, 'visible').name('Visible');
        }

        meshFolder.close();
      });

      meshesFolder.close();
    }

    // Scene stats
    const statsFolder = gui.addFolder('Scene Stats');
    foldersRef.current.push(statsFolder);
    const stats = {
      objects: scene.children.length,
      triangles: 0,
      vertices: 0,
    };

    // Calculate geometry stats
    scene.traverse((object) => {
      if ('geometry' in object && object.geometry) {
        const geometry = object.geometry as any;
        if (geometry.attributes && geometry.attributes.position) {
          stats.vertices += geometry.attributes.position.count;
          if (geometry.index) {
            stats.triangles += geometry.index.count / 3;
          } else {
            stats.triangles += geometry.attributes.position.count / 3;
          }
        }
      }
    });

    statsFolder.add(stats, 'objects').name('Objects').disable();
    statsFolder.add(stats, 'triangles').name('Triangles').disable();
    statsFolder.add(stats, 'vertices').name('Vertices').disable();
    statsFolder.close();

    // Cleanup on unmount - only remove folders, not the entire GUI
    return () => {
      foldersRef.current.forEach(folder => {
        if (folder && folder.destroy) {
          folder.destroy();
        }
      });
      foldersRef.current = [];
    };
  }, [enabled, scene, camera, gl]);

  // This component doesn't render anything in the DOM
  return null;
};
