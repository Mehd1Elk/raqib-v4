import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    coverage: {
      include: [
        'app/robots.ts',
        'app/sitemap.ts',
        'components/**/*.tsx',
        'lib/catalog.ts',
        'lib/constants.ts',
        'lib/helpers.ts',
        'lib/mock-data.ts',
        'lib/static-params.ts',
      ],
      exclude: ['components/dashboards/**', 'components/viz/**'],
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom',
    exclude: ['tests/e2e/**', 'node_modules/**', '.next/**', 'coverage/**', 'components/viz/**'],
    globals: true,
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['./tests/setup.ts'],
  },
});
