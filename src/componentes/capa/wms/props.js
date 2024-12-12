import props from './../props'

export default {
  ...props,

  /**
   * Nombre de la capa en el servidor de mapas.
   *
   * - Tipo: `String`.
   * - Valor **obligatorio**.
   * - Reactivo: No.
   */
  capa: {
    type: String,
    required: true,
  },

  /**
   * Nombre del estilo disponible para la capa. Al dejar el valor como indefinido, mostrará el
   * estilo de la capa por defecto que tenga en el servidor.
   *
   * - Tipo: `String`.
   * - Valor por defecto: `undefined`.
   * - Reactivo: Si.
   */
  estilo: {
    type: String,
    default: undefined,
  },

  /**
   * Filtro en sintaxis CQL, compatible con la api de Geoserver.
   *
   * @see https://docs.geoserver.org/stable/en/user/tutorials/cql/cql_tutorial.html
   *
   * - Tipo: `String`.
   * - Valor por defecto: `undefined`.
   * - Reactivo: Si.
   */
  filtro: {
    type: String,
    default: undefined,
  },

  /**
   * Tipo de servidor WMS remoto, puede ser: mapserver, geoserver, carmentaserver o qgis.
   *
   * - Tipo: `String`.
   * - Valor por defecto: `'geoserver'`.
   * - Reactivo: No.
   *
   * @see https://openlayers.org/en/latest/apidoc/module-ol_source_wms.html#~ServerType
   */
  tipoServidor: {
    type: String,
    default: 'geoserver',
  },

  /**
   * URL del servicio WMS.
   *
   * - Tipo: `String`.
   * - Valor por defecto: `'https://gema.conahcyt.mx/geoserver/wms'`.
   * - Reactivo: No.
   */
  url: {
    type: String,
    default: 'https://gema.conahcyt.mx/geoserver/wms',
  },
}
