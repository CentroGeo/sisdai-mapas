import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        const analyticsId = process.env.VITE_GOOGLE_ANALYTICS_ID;
        return html.replace(/%VITE_GOOGLE_ANALYTICS_ID%/g, analyticsId);
      },
    },],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  }
})

