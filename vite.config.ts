/*
 * File: vite.config.ts
 * Purpose: Vite 7 configuration for the web app using @vitejs/plugin-react.
 * Notes:
 * - Dev server bound to host true (0.0.0.0) and strict port for Docker.
 * - React 18 fast refresh enabled via plugin.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // 0.0.0.0
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 5173,
    strictPort: true,
  }
});
