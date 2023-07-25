import SisdaiCapaWms from './componentes/SisdaiCapaWms.vue'
import SisdaiCapaXyz from './componentes/SisdaiCapaXyz.vue'
import SisdaiLeyenda from './componentes/SisdaiLeyenda.vue'
import SisdaiMapa from './componentes/SisdaiMapa.vue'

export default {
  install: Vue => {
    Vue.component('SisdaiCapaWms', SisdaiCapaWms)
    Vue.component('SisdaiCapaXyz', SisdaiCapaXyz)
    Vue.component('SisdaiLeyenda', SisdaiLeyenda)
    Vue.component('SisdaiMapa', SisdaiMapa)
  },
}

export { SisdaiCapaWms, SisdaiCapaXyz, SisdaiLeyenda, SisdaiMapa }
