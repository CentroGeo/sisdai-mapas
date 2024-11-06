import { idAleatorio } from '../../utiles'
import * as valoresPorDefecto from './valores'
import * as validaciones from './validaciones'

export default {
  /**
   * Descripción corta del mapa, la cual es visible en el modo solo texto y audible con herramientas de lectura por voz.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'Mapa sin descripción'`
   * - Reactivo: Si
   */
  descripcion: {
    type: String,
    default: 'Mapa sin descripción',
  },

  /**
   * Identificador único del mapa. Si no es definido se asignará un valor aleatorio.
   *
   * - Tipo: `String`
   * - Valor por defecto: Aleatorio
   * - Reactivo: No
   */
  id: {
    type: String,
    default: () => idAleatorio(),
  },

  /**
   * Objeto que define la vista del mapa. Revisa los detalles de la vista en la [sección vista](/comienza/vista.html) de esta documentación.
   *
   * - Tipo: `Object`
   * - Valor por defecto: `{ centro: [0, 0], acercamiento: 1.5 }`
   * - Reactivo: Si
   */
  vista: {
    type: Object,
    default: () => valoresPorDefecto.vista,
    validator: validaciones.vista,
  },

  /**
   * Código de identificación SRS que define la proyección de la vista.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'EPSG:4326'`
   * - Reactivo: No
   *
   * >  **Información:** El valor predeterminado es Universal Transversal de Mercator.
   *
   * >  **Importante:** Las coordenadas y capas que integre en el componente deben coincidir con la `proyeccion` definida en el mapa.
   */
  proyeccion: {
    type: String,
    default: valoresPorDefecto.proyeccion,
  },
}
