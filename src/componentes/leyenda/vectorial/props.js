import { ESTILO_VECTOR } from '../../../utiles/eslitosCapa'
import propsControl from './../control/props'

export default {
  /**
   *
   */
  estilo: {
    type: Object,
    default: () => ESTILO_VECTOR,
  },

  /**
   *
   */
  informacion: propsControl.informacion,

  /**
   *
   */
  titulo: {
    type: String,
    default: undefined,
  },
}
