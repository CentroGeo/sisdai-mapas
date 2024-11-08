import { idAleatorio } from './../../../utiles'

export default {
  /**
   *
   */
  etiqueta: {
    typo: String,
    default: 'Cargando...',
  },

  id: {
    type: String,
    default: () => idAleatorio(),
  },

  /**
   *
   */
  sinControl: {
    typo: Boolean,
    default: false,
  },
}
