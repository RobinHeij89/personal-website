import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import postcssPresetEnv from 'postcss-preset-env'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.glsl'],
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          features: {
            'media-query-ranges': true,
          },
        }),
      ],
    },
  },
})
