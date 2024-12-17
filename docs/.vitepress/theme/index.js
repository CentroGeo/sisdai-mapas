import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import './estilos/codigo.css'

import '@centrogeomx/sisdai-css'
import { createPinia } from 'pinia'
import Layout from './DisposicionPrincipal.vue'

import VisorCodigoLimitado from './VisorCodigoLimitado.vue'

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

      app.use((await import('@centrogeomx/sisdai-componentes')).default)
      // app.mixin({ store: (await import('@centrogeomx/sisdai-componentes/src/stores')).default })
      app.use(createPinia())

      app.component('VisorCodigo', VisorCodigoLimitado)
    }
  },
}
