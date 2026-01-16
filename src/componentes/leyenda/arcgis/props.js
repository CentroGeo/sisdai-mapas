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
}
