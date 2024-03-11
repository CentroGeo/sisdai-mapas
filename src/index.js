// This file is part of sisdai-mapas.
//
//   sisdai-mapas is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Lesser General Public License as published by the
//   Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//   sisdai-mapas is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
//   Public License for more details.
//
//   You should have received a copy of the GNU Lesser General Public License along
//   with sisdai-mapas. If not, see <https://www.gnu.org/licenses/>.

import 'ol/ol.css'
import SisdaiCapaVectorial from './componentes/SisdaiCapaVectorial.vue'
import SisdaiCapaWms from './componentes/SisdaiCapaWms.vue'
import SisdaiCapaXyz from './componentes/SisdaiCapaXyz.vue'
// import SisdaiLeyenda from './componentes/SisdaiLeyenda.vue'
import SisdaiLeyenda from './componentes/SisdaiLeyendaNueva.vue'
import SisdaiLeyendaExterna from './componentes/SisdaiLeyendaWms.vue'
import SisdaiMapa from './componentes/SisdaiMapa.vue'
import SisdaiMapaInstruccionalNavegacionTeclado from './componentes/SisdaiMapaInstruccionalNavegacionTeclado.vue'
import SisdaiUtfGrid from './componentes/SisdaiUtfGrid.vue'

export default {
  install: Vue => {
    Vue.component('SisdaiUtfGrid', SisdaiUtfGrid)
    Vue.component('SisdaiCapaVectorial', SisdaiCapaVectorial)
    Vue.component('SisdaiCapaWms', SisdaiCapaWms)
    Vue.component('SisdaiCapaXyz', SisdaiCapaXyz)
    Vue.component('SisdaiLeyenda', SisdaiLeyenda)
    Vue.component('SisdaiLeyendaExterna', SisdaiLeyendaExterna)
    // Vue.component('SisdaiLeyendaNueva', SisdaiLeyendaNueva)
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
  SisdaiLeyendaExterna,
  // SisdaiLeyendaNueva,
  SisdaiMapa,
  SisdaiMapaInstruccionalNavegacionTeclado,
  SisdaiUtfGrid,
}
