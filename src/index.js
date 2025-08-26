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

import SisdaiCapaVectorial from './componentes/capa/vectorial'
import SisdaiCapaWms from './componentes/capa/wms'
import SisdaiCapaXyz from './componentes/capa/xyz'
import SisdaiLeyenda from './componentes/leyenda'
// import SisdaiLeyendaControl from './componentes/leyenda/control'
import SisdaiLeyendaVectorial from './componentes/leyenda/vectorial'
import SisdaiLeyendaWms from './componentes/leyenda/wms'
import SisdaiMapa from './componentes/mapa'

export default {
  install: Vue => {
    Vue.component('SisdaiCapaVectorial', SisdaiCapaVectorial)
    Vue.component('SisdaiCapaWms', SisdaiCapaWms)
    Vue.component('SisdaiCapaXyz', SisdaiCapaXyz)
    Vue.component('SisdaiLeyenda', SisdaiLeyenda)
    // Vue.component('SisdaiLeyendaControl', SisdaiLeyendaControl)
    Vue.component('SisdaiLeyendaVectorial', SisdaiLeyendaVectorial)
    Vue.component('SisdaiLeyendaWms', SisdaiLeyendaWms)
    Vue.component('SisdaiMapa', SisdaiMapa)
  },
}

export {
  // SisdaiCapaVectorial,
  SisdaiCapaWms,
  SisdaiCapaXyz,
  // SisdaiLeyenda,
  // SisdaiLeyendaControl,
  // SisdaiLeyendaVectorial,
  SisdaiLeyendaWms,
  SisdaiMapa,
}

export * as valores from './valores'
