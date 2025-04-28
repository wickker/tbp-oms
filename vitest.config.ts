import react from '@vitejs/plugin-react-swc'
import { configDefaults, defineConfig } from 'vitest/config'
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './vitest.setup.ts',
    environment: 'jsdom',
    coverage: {
      all: true,
      exclude: [
        ...configDefaults.exclude,
        'vite*.ts',
        '*.config.{t,j,cj}s',
        '**/*.spec.ts',
        '**/*.test.ts{,x}',
        'src/**/*.d.ts',
        'src/**/__mocks__/*.ts',
        'src/main.tsx',
        '.eslintrc.cjs',
        '**/types/**.ts',
        '**/types.ts',
      ],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
    },
    outputFile: {
      junit: 'coverage/junit.xml',
      'vitest-sonar-reporter': 'test-report.xml',
    },
    reporters: ['default', 'junit', 'vitest-sonar-reporter'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
