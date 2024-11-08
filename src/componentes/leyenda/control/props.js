import { idAleatorio } from './../../../utiles'

export default {
  /**
   *
   */
  etiqueta: {
    typo: String,
    default: 'Cargando...',
  },

  /**
   *
   */
  id: {
    type: String,
    default: () => idAleatorio(),
  },

  /**
   *
   */
  informacion: {
    type: String,
    default: undefined,
  },

  /**
   *
   */
  sinControl: {
    typo: Boolean,
    default: false,
  },
}
