import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/storage', 'firebase/analytics'],
          animations: ['aos', 'gsap', 'typed.js'],
          charts: ['chart.js']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});