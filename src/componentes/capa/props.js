import { idAleatorio } from '../../utiles'

export default {
  /**
   * Establece las atribuciones de la fuente.
   *
   * - Tipo: `String` o `Array<String>`
   * - Valor por defecto: `undefined`
   * - Reactivo: No.
   *
   * @see https://openlayers.org/en/latest/apidoc/module-ol_source_Source.html#~AttributionLike
   */
  atribuciones: {
    type: [String, Array],
    default: undefined
  },

  /**
   * Identificador único de la capa. Si no es detectado, se asignará una cadena de texto
   * aleatorea. Para hacer uso de la leyenda esta propiedad pasa a ser obligatoria.
   *
   * - Tipo: `String`
   * - Valor por defecto: Aleatorio
   * - Reactivo: No.
   */
  id: {
    type: String,
    default: () => idAleatorio()
  },

  /**
   * Nombre de la capa que aparecerá en el control de la leyenda.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'Nombre no asignado'`.
   * - Reactivo: Si.
   */
  nombre: {
    type: String,
    default: 'Nombre no asignado'
  },

  /**
   * Un valor que va de 0 a 1, para indicar la opacidad de la capa. 0 es totalmente invisible y 1 es la opacidad completa.
   *
   * - Tipo: `Number` o `String`
   * - Valor por defecto: `1`
   * - Reactivo: Si.
   */
  opacidad: {
    type: [Number, String],
    default: 1
  },

  /**
   * Indica la posición respecto a otras capas. Las capas con un valor mayor en este parámetro se mostrarán enfrente.
   *
   * - Tipo: `Number` o `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: Si.
   */
  posicion: {
    type: [Number, String],
    default: undefined
  },

  /**
   * Visibilidad de la capa.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `true`
   * - Reactivo: Si.
   */
  visible: {
    type: Boolean,
    default: true
  }
}
