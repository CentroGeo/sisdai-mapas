import props from './../props'
import { ESTILO_VECTOR } from './../../../utiles/eslitosCapa'

export default {
  ...props,

  /**
   * REFACTORIZAR
   * El estilo simple es aquel que es constante para la capa, por ejemplo, independientemente de los datos que tenga un poligono o punto en el sigueinte mapa siempre tendra el mismo color y contorno de su simbologia.
   */
  estilo: {
    type: Object,
    default: () => ESTILO_VECTOR,
  },

  /**
   * Define el formato de los datos fuente, los valores admitidos son: 'geojson' y 'topojson'.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'geojson'`.
   * - Reactivo: no
   */
  formato: {
    type: String,
    default: 'geojson',
  },

  /**
   * Origen de la capa. Puede ser una url externa o relativa a las carpetas del proyecto, e
   * incluso un objeto en formato geojson o topojson con coordenadas y atributos.
   *
   * - Tipo: `String` o `Object`.
   * - Valor obligatorio.
   * - Reactivo: no
   */
  fuente: {
    type: [String, Object],
    required: true,
  },

  /**
   * Contenido del globo de información que aparecerá al pasar el cursor sobre la capa.
   * Puede ser una funcion que accede a las propiedades del elemento al que se sobrepone o un texto estatico.
   *
   * - Tipo: `String` o `Function`.
   * - Valor por defecto: `undefined`.
   * - Reactivo: si
   */
  globoInformativo: {
    type: [String, Function, Object],
    default: undefined,
  },

  /**
   *
   */
  representacion: {
    type: [String, Object],
    default: undefined,
  },
}
