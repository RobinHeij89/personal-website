/**
 * Common type definitions for the portfolio website
 */

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface MaterialConfig {
  color?: string;
  opacity?: number;
  transparent?: boolean;
  wireframe?: boolean;
}

export interface CameraConfig {
  position?: [number, number, number];
  fov?: number;
  near?: number;
  far?: number;
}

export interface SceneProps {
  children: React.ReactNode;
  camera?: CameraConfig;
  className?: string;
}