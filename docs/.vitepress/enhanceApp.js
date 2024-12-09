import VueMatomo from 'vue-matomo'
// import { defineConfig, loadEnv } from 'vite'

export default {
  enhanceApp({ app, router }) {
    if (parseInt(import.meta.env.VITE_MATOMO_ID) !== 0) {
      app.use(VueMatomo, {
        host: 'https://retru.conacyt.mx/',
        siteId: parseInt(import.meta.env.VITE_MATOMO_ID),
        trackerFileName: 'matomo',
        router,
        enableLinkTracking: true,
        requireConsent: false,
        trackInitialView: true,
        debug: true,
        trackInteraction: (to, from) => {
          // If this is the first route visited, then always record a page visit
          if (!from) {
            return true
          }
          // Return true if the path or hash changed, but not anything else
          return to.path !== from.path || to.hash !== from.hash
        },
      })
    }
  },
}
