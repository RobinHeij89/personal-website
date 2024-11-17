import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

const plugins = [react(), svgr()];

export default defineConfig({
  plugins: plugins
});