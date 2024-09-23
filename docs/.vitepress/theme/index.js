import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'

import './estilos/codigo.css'

// https://vitepress.dev/guide/custom-theme
import DisposicionPrincipal from './DisposicionPrincipal.vue'

export default {
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
