/**
 * ## GUI Manager
 * 
 * ### Purpose:
 * Centralized GUI instance manager to ensure all debug components
 * share the same lil-gui panel instead of creating multiple instances.
 */

import GUI from 'lil-gui';

let guiInstance: GUI | null = null;

export const getGUI = (): GUI => {
  if (!guiInstance) {
    guiInstance = new GUI({
      title: 'Three.js Debug Panel',
      width: 320
    });
  }
  return guiInstance;
};

export const destroyGUI = (): void => {
  if (guiInstance) {
    guiInstance.destroy();
    guiInstance = null;
  }
};

export const hasGUI = (): boolean => {
  return guiInstance !== null;
};
