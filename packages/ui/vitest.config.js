import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,ts,vue}'], // Adjust based on file types
    },
  },
});
