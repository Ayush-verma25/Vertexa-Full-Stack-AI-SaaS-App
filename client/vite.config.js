import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const requiredEnv = ['VITE_CLERK_PUBLISHABLE_KEY', 'VITE_BASE_URL']
  const missingEnv = requiredEnv.filter((name) => !env[name]?.trim())

  if (missingEnv.length > 0) {
    throw new Error(`Missing required client environment variables: ${missingEnv.join(', ')}`)
  }

  return {
    plugins: [react(), tailwindcss()],
  }
})
