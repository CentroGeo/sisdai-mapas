import { idAleatorio } from '../../utiles'

export default {
  /**
   * Recíbe los ID, separados por espacios, de los elementos que describen al mapa como título, descripciones cortas o largas.
   *
   * - Tipo: `String`
   * - Valor por defecto: `''`
   * - Reactivo: ✅
   *
   * > ℹ️ **Información:** Esta propiedad hace uso del atributo `aria-describedby` para establecer una relación entre el mapa y el texto que los describe.
   */
  elementosDescriptivos: {
    type: String,
    default: ''
  },

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
