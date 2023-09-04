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
