import { defineConfig, type build } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'development' ? '' : '/experiments',

  build: {
    outDir: 'build',
  },
}));
