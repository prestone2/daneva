import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { normalizeSiteUrl } from './src/config/site-url.mjs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  normalizeSiteUrl(loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL)
  return { plugins: [react(), tailwindcss()], define: { 'import.meta.env.BUILD_YEAR': JSON.stringify(process.env.DANEVA_BUILD_YEAR || String(new Date().getUTCFullYear())) } }
})
