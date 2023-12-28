import 'ol/ol.css'
// import 'sisdai-css'

import SisdaiCapaVectorial from './componentes/SisdaiCapaVectorial.vue'
import SisdaiCapaWms from './componentes/SisdaiCapaWms.vue'
import SisdaiCapaXyz from './componentes/SisdaiCapaXyz.vue'
import SisdaiLeyenda from './componentes/SisdaiLeyenda.vue'
import SisdaiMapa from './componentes/SisdaiMapa.vue'
import SisdaiMapaInstruccionalNavegacionTeclado from './componentes/SisdaiMapaInstruccionalNavegacionTeclado.vue'

export default {
  install: Vue => {
    Vue.component('SisdaiCapaVectorial', SisdaiCapaVectorial)
    Vue.component('SisdaiCapaWms', SisdaiCapaWms)
    Vue.component('SisdaiCapaXyz', SisdaiCapaXyz)
    Vue.component('SisdaiLeyenda', SisdaiLeyenda)
    Vue.component('SisdaiMapa', SisdaiMapa)
    Vue.component(
      'SisdaiMapaInstruccionalNavegacionTeclado',
      SisdaiMapaInstruccionalNavegacionTeclado
    )
  },
}

export {
  SisdaiCapaVectorial,
  SisdaiCapaWms,
  SisdaiCapaXyz,
  SisdaiLeyenda,
  SisdaiMapa,
  SisdaiMapaInstruccionalNavegacionTeclado,
}
