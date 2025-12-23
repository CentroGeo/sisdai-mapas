import props from './../props'

export default {
  ...props,

  /**
   * Nombre de la capa en el servidor de mapas.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: no
   */
  capa: { type: String, default: undefined },

  /**
   * URL del servicio ArcGIS.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: no
   */
  fuente: { type: String, default: undefined },

  /**
   * Establece si la consulta de la capa será por mosaicos o teselas. Cuando el
   * valor es falso la carga será de una sola imagen.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Reactivo: no
   */
  mosaicos: { type: Boolean, default: false },
}
