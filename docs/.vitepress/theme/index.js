// https://vitepress.dev/guide/custom-theme
import 'sisdai-css'
import Layout from './Layout.vue'
import './style.scss'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
}
