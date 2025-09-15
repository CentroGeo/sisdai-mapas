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
  capa: { type: String, required: true },

  /**
   * Contenido del cuadro de información que aparecerá al dar clicl sobre la capa.
   * Puede ser una funcion que accede a las propiedades del elemento al que se sobrepone o un texto estatico.
   *
   * - Tipo: `String` o `Function`.
   * - Valor por defecto: `undefined`.
   * - Reactivo: si
   */
  cuadroInformativo: { type: [String, Function, Object], default: undefined },

  /**
   * Nombre del estilo disponible para la capa. Al dejar el valor como indefinido, mostrará el
   * estilo de la capa por defecto que tenga en el servidor.
   *
   * - Tipo: `String`.
   * - Valor por defecto: `undefined`.
   * - Reactivo: Si.
   */
  estilo: { type: String, default: undefined },

  /**
   * Filtro en sintaxis CQL, compatible con la api de Geoserver.
   *
   * @see https://docs.geoserver.org/stable/en/user/tutorials/cql/cql_tutorial.html
   *
   * - Tipo: `String`.
   * - Valor por defecto: `undefined`.
   * - Reactivo: Si.
   */
  filtro: { type: String, default: undefined },

  /**
   * Url fuente del servicio WMS.
   *
   * - Tipo: `String`.
   * - Valor por defecto: `'https://gema.conahcyt.mx/geoserver/wms'`.
   * - Reactivo: No.
   */
  fuente: { type: String, default: 'https://gema.conahcyt.mx/geoserver/wms' },

  /**
   * Tipo de servidor WMS remoto, puede ser: mapserver, geoserver, carmentaserver o qgis.
   *
   * - Tipo: `String`.
   * - Valor por defecto: `'geoserver'`.
   * - Reactivo: No.
   *
   * @see https://openlayers.org/en/latest/apidoc/module-ol_source_wms.html#~ServerType
   */
  tipoServidor: { type: String, default: 'geoserver' },

  consulta: { type: Function, default: url => fetch(url) },
}
