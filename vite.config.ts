import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const plugins = [react()];

export default defineConfig({
  plugins: plugins
});