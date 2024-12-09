import '@centrogeomx/sisdai-css'
import Layout from './DisposicionPrincipal.vue'

/** @type {import('vitepress').Theme} */
export default {
  /**
   * @See https://vitepress.dev/guide/custom-theme
   */
  Layout,

  async enhanceApp({ app /*, router, siteData*/ }) {
    if (!import.meta.env.SSR) {
      const SisdaiMapas = await import('./../../../src')
      app.use(SisdaiMapas.default)

      // const store = await import('sisdai-componentes/src/stores')
      // app.mixin({ store })

      app.use((await import('@centrogeomx/sisdai-componentes')).default)
    }
  },
}
