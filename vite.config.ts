import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // No inline <script> chunks, so the CSP can keep `script-src 'self'`.
    assetsInlineLimit: 0,
  },
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    environment: 'node',
    // No features yet; remove once the first unit tests exist.
    passWithNoTests: true,
  },
});
