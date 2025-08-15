import '@centrogeomx/sisdai-css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
// import { createPinia } from 'pinia'

import './estilos/codigo.css'
import Layout from './DisposicionPrincipal.vue'
import VisorCodigo from './componentes/VisorCodigo.vue'

/** @type {import('vitepress').Theme} */
export default {
  /**
   * @See https://vitepress.dev/guide/custom-theme
   */
  Layout,

  async enhanceApp({ app /*, router, siteData*/ }) {
    if (!import.meta.env.SSR) {
      app.use((await import('./../../../src')).default)
      app.use((await import('@centrogeomx/sisdai-componentes')).default)

      // app.use(createPinia())

      app.component('VisorCodigo', VisorCodigo)
    }
  },
}
