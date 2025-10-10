import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },

  resolve: {
    alias: {
      // '@centrogeomx/sisdai-mapas/valores': fileURLToPath(new URL('./../valores', import.meta.url)),
      '@centrogeomx/sisdai-mapas': fileURLToPath(
        new URL('./../', import.meta.url)
      ),
      '@ejemplos': fileURLToPath(
        new URL('./.vitepress/theme/ejemplos', import.meta.url)
      ),
    },
  },
})
