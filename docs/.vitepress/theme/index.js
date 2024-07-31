import 'sisdai-css'
// https://vitepress.dev/guide/custom-theme
import DisposicionPrincipal from './DisposicionPrincipal.vue'
import DefaultTheme from 'vitepress/theme-without-fonts'

export default {
  extends: DefaultTheme,
  Layout: DisposicionPrincipal,
  async enhanceApp({ app, router, siteData }) {
    if (!import.meta.env.SSR) {
      const SisdaiMapas = await import('./../../../src')
      app.use(SisdaiMapas.default)

      // const store = await import('sisdai-componentes/src/stores')
      // app.mixin({ store })

      const SisdaiComponentes = await import('sisdai-componentes')
      app.use(SisdaiComponentes.default)
    }
  }
}
