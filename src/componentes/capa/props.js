import { idAleatorio } from '../../utiles'

export default {
  /**
   * Establece las atribuciones de la fuente.
   *
   * - Tipo: `String` o `Array<String>`
   * - Valor por defecto: `undefined`
   * - Reactivo: no
   *
   * @see https://openlayers.org/en/latest/apidoc/module-ol_source_Source.html#~AttributionLike
   */
  atribuciones: { type: [String, Array], default: undefined },

  /**
   * Identificador único de la capa. Si no es detectado, se asignará una cadena de texto
   * aleatorea. Para hacer uso de la leyenda esta propiedad pasa a ser obligatoria.
   *
   * - Tipo: `String`
   * - Valor por defecto: Aleatorio
   * - Reactivo: no
   */
  id: { type: String, default: () => idAleatorio() },

  /**
   * Un valor que va de 0 a 1, para indicar la opacidad de la capa. 0 es totalmente invisible y 1 es la opacidad completa.
   *
   * - Tipo: `Number` o `String`
   * - Valor por defecto: `1`
   * - Reactivo: si
   */
  opacidad: { type: [Number, String], default: 1 },

  /**
   * Indica la posición respecto a otras capas. Las capas con un valor mayor en este parámetro se mostrarán enfrente.
   *
   * - Tipo: `Number` o `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: si
   */
  posicion: { type: [Number, String], default: undefined },

  /**
   * Titulo de la capa que aparecerá en el control de la leyenda.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'Nombre no asignado'`.
   * - Reactivo: si
   */
  titulo: { type: String, default: 'Titulo no asignado' },

  /**
   * Visibilidad de la capa.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `true`
   * - Reactivo: si
   */
  visible: { type: Boolean, default: true },
}
