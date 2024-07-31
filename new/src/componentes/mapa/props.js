import { idAleatorio } from '../../utiles'

export default {
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
