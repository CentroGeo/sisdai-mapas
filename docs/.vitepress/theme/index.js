import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import './estilos/codigo.css'

import '@centrogeomx/sisdai-css'
import Layout from './DisposicionPrincipal.vue'
import SisdaiMapaInstruccionalNavegacionTeclado from '../src/componentes/SisdaiMapaInstruccionalNavegacionTeclado.vue'

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

      app.component('SisdaiMapaInstruccionalNavegacionTeclado', SisdaiMapaInstruccionalNavegacionTeclado);
    }
  },
}
