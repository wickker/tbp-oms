import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, UserConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }: UserConfig) => {
  console.log('🟢 Running build')
  console.log(`🟢 Mode: ${mode}`)
  console.log(`🟢 Using .env.${mode === 'development' ? 'local' : mode}`)

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
    },
    build: {
      outDir: 'build',
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})
