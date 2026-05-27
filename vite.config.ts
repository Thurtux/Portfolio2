import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [
    react(),
    glsl({
      include: [
        '**/*.glsl',
        '**/*.vert',
        '**/*.frag',
      ],
      defaultExtension: 'glsl',
      warnDuplicatedImports: true,
      compress: false,
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});