import { urlGeoserverGema } from '../../../utiles/constantes'
import propsControl from './../control/props'

export default {
  /**
   *
   */
  deshabilitado: propsControl.deshabilitado,

  /**
   *
   */
  fuente: {
    type: String,
    default: urlGeoserverGema,
  },

  /**
   *
   */
  informacion: propsControl.informacion,

  /**
   *
   */
  nombre: {
    type: String,
    default: undefined,
  },

  /**
   *
   */
  sinControl: propsControl.sinControl,

  /**
   * Define si se agrega el control (input) en las clases de la leyenda. Cada control se vincula
   * con la visibilidad los elementos que pertenezcan a la clase correspondiente de la capa.
   */
  sinControlClases: propsControl.sinControl,

  /**
   *
   */
  titulo: {
    type: String,
    default: undefined,
  },

  /**
   *
   */
  visible: {
    type: Boolean,
    default: true,
  },
}
