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
