import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sites } from '@openai/sites-vite-plugin'

export default defineConfig({
  base: '/caballo-tv-propuesta/',
  plugins: [react(), tailwindcss(), sites()],
  server: {
    allowedHosts: true,
  },
})
