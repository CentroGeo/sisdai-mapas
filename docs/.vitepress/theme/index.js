//import SisdaiComponentes from 'sisdai-componentes/src/index.js'
import 'sisdai-css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
//import SisdaiMapas from './../../../src/index.js'
import './estilo/codigo.css'

// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'

export default {
  Layout,
  async enhanceApp({ app, router, siteData }) {
    if (!import.meta.env.SSR) {
      const SisdaiMapas = await import('./../../../src/index.js')
      app.use(SisdaiMapas.default)
    }
  },
}
