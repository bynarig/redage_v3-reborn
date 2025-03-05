import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite';
import * as path from "node:path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: './',
 build: {
    outDir: path.resolve(__dirname, '../client_packages/interface'), // Output directory
    // emptyOutDir: true, // Optional: Clears the output directory before building
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import #/store/assets/css/main.sass
        `
      }
    }
  }
});
