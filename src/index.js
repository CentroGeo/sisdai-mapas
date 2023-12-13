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


import './estilos/index.scss'
import Mapa from './componentes/SisdaiMapa.vue'
import * as Capas from './componentes/capas'
import * as Leyendas from './componentes/leyendas'
import * as Elementos from './componentes/elementos'

export default function plugin(Vue) {
  //if (plugin.installed) {
  //  return
  //}
  //
  //plugin.installed = true

  /**
   *
   * @param {Object} componente
   */
  function agregarComponente(componente) {
    Vue.component(componente.__name, componente)
  }

  /**
   *
   * @param {*} componentes
   */
  function agregarComponentes(componentes) {
    Object.values(componentes).forEach(componente =>
      agregarComponente(componente)
    )
  }

  agregarComponente(Mapa)
  agregarComponentes(Capas)
  agregarComponentes(Elementos)
  agregarComponentes(Leyendas)
}

export { plugin as install }
