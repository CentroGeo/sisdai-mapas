import { idAleatorio } from '../../utiles'

export default {
  /**
   * Descripción corta del mapa, la cual es visible en el modo solo texto y audible con herramientas de lectura por voz.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: ✅
   */
  descripcion: {
    type: String,
    default: 'Mapa sin descripción'
  },

  /**
   * Identificador único del mapa. Si no es definido se asignará un valor aleatorio.
   *
   * - Tipo: `String`
   * - Valor por defecto: Aleatorio
   * - Reactivo: ❌
   */
  id: {
    type: String,
    default: () => idAleatorio()
  }
}
