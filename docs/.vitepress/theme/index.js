import 'sisdai-css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import './estilo/codigo.css'
import './estilo/index.scss'

// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
}
