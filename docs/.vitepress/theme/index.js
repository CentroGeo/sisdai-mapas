import SisdaiComponentes from 'sisdai-componentes/src/simple'
import 'sisdai-css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import SisdaiMapas from './../../../src'
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
