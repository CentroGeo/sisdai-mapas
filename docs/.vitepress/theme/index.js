import SisdaiComponentes from 'sisdai-componentes/src/index.js'
import 'sisdai-css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import SisdaiMapas from './../../../src/index.js'
import './estilo/codigo.css'

// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.use(SisdaiComponentes)
    app.use(SisdaiMapas)
  },
}
