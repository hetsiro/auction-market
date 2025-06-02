import path from 'path';
import { URL } from 'url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(new URL('./src', import.meta.url).pathname),
      '@components': path.resolve(
        new URL('./src/components', import.meta.url).pathname
      ),
      '@pages': path.resolve(new URL('./src/pages', import.meta.url).pathname),
    },
  },
});
