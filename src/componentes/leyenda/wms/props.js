import { urlGemaWms } from './../../../utiles/constantes'
import propsCapaWms from './../../capa/wms/props'
import propsControl from './../control/props'

export default {
  /**
   *
   */
  consulta: { type: Function, default: url => fetch(url) },

  /**
   *
   */
  deshabilitado: propsControl.deshabilitado,

  estilo: propsCapaWms.estilo,

  /**
   * Url fuente del servicio WMS.
   *
   * - Tipo: `String`.
   * - Valor por defecto: `'https://gema.conahcyt.mx/geoserver/wms'`.
   * - Reactivo: No.
   */
  fuente: { type: String, default: urlGemaWms },

  /**
   *
   */
  informacion: propsControl.informacion,

  /**
   *
   */
  nombre: { type: String, default: undefined },

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
  titulo: { type: String, default: undefined },

  /**
   *
   */
  visible: { type: Boolean, default: true },
}
