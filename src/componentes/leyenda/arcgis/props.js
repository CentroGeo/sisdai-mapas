import { idAleatorio } from './../../../utiles'
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
   *
   */
  id: { type: String, default: () => idAleatorio() },

  /**
   *
   */
  titulo: { type: String, default: 'Cargando...' },

  /**
   * Define si se agrega el control (input) en el titulo de la leyenda. El control se vincula con la visibilidad de la capa.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Reactivo: Si.
   */
  sinControl: { type: Boolean, default: false },
}
