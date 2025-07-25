import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  root: path.resolve(__dirname),
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')
    }
  },
  ...(command === 'serve' && {
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  }),
}));