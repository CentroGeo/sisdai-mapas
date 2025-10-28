import { urlGemaWms } from './../../../utiles/constantes'
import props from './../props'

export default {
  ...props,

  /**
   * Nombre de la capa en el servidor de mapas.
   *
   * - Tipo: `String`
   * - Valor **obligatorio**
   * - Reactivo: no
   */
  capa: { type: String, required: true },

  /**
   * Reemplaza la función de consulta. Esto permite realizar cambios a las
   * peticiones antes de que sean realizadas.
   *
   *- Tipo: `Function`
   * - Valor por defecto: `url => fetch(url)`
   * - Reactivo: no
   */
  consulta: { type: Function, default: url => fetch(url) },

  /**
   * Contenido del cuadro de información que aparecerá al dar clicl sobre la
   * capa. Puede ser una funcion que accede a las propiedades del elemento al
   * que se sobrepone o un texto estatico.
   *
   * - Tipo: `String` o `Function`
   * - Valor por defecto: `undefined`
   * - Reactivo: si
   */
  cuadroInformativo: { type: [String, Function, Object], default: undefined },

  /**
   * Estilo disponible para la capa. Al dejar el valor como indefinido, mostrará el
   * estilo de la capa por defecto que tenga en el servidor.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: si
   */
  estilo: { type: String, default: undefined },

  /**
   * Filtro en sintaxis CQL, compatible con la api de Geoserver.
   *
   * @see https://docs.geoserver.org/stable/en/user/tutorials/cql/cql_tutorial.html
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: si
   */
  filtro: { type: String, default: undefined },

  /**
   * Url fuente del servicio WMS.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'https://gema.conahcyt.mx/geoserver/wms'`
   * - Reactivo: no
   */
  fuente: { type: String, default: urlGemaWms },

  /**
   * Establece si la consulta de la capa será por mosaicos o teselas. Cuando el
   * valor es falso la carga será de una sola imagen.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Reactivo: no
   */
  mosaicos: { type: Boolean, default: false },

  /**
   * Define que propiedades de la capa serán visibles cuando se realicen consultas
   * al servidor de mapas.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: si
   */
  propiedades: { type: String, default: undefined },

  /**
   * Tipo de servidor WMS remoto, puede ser: mapserver, geoserver, carmentaserver o qgis.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'geoserver'`
   * - Reactivo: no
   *
   * @see https://openlayers.org/en/latest/apidoc/module-ol_source_wms.html#~ServerType
   */
  tipoServidor: { type: String, default: 'geoserver' },
}
