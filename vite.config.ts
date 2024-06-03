import MillionLint from '@million/lint';
import million from 'million/compiler';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const plugins = [react(), million.vite({
  auto: true
}), MillionLint.vite()];

export default defineConfig({
  plugins: plugins
});