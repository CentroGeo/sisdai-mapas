import { Svg } from '../../../utiles/vectores'
import { idAleatorio } from './../../../utiles'

export default {
  /**
   *
   */
  deshabilitado: {
    type: Boolean,
    default: false,
  },

  /**
   *
   */
  etiqueta: {
    typo: String,
    default: 'Cargando...',
  },

  /**
   *
   */
  encendido: {
    type: Boolean,
    default: false,
  },

  /**
   *
   */
  encendidoIndeterminado: {
    type: Boolean,
    default: false,
  },

  /**
   *
   */
  id: {
    type: String,
    default: () => idAleatorio(),
  },

  /**
   *
   */
  informacion: {
    type: String,
    default: undefined,
  },

  /**
   *
   */
  simbolo: {
    typo: Svg,
    // default: new Svg(),
    default: undefined,
  },

  /**
   * Define si se agrega el control (input) en el titulo de la leyenda. El control se vincula con la visibilidad de la capa.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Reactivo: Si.
   */
  sinControl: {
    typo: Boolean,
    default: false,
  },
}
