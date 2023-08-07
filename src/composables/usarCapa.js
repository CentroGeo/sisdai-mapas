import { idAleatorio } from './../utiles'
import usarRegistroMapas from './usarRegistroMapas'

export const props = {
  /**
   * Identificador único de la capa. Si no es detectado, se asignará una cadena de texto
   * aleatorea. Para hacer uso de la leyenda esta propiedad pasa a ser obligatoria.
   *
   * - Tipo: `String`
   * - Interactivo: ❌
   */
  id: {
    type: String,
    default: () => idAleatorio(),
  },

  /**
   * Nombre de la capa que aparecerá en el control de la leyenda.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'Nombre no asignado'`.
   * - Interactivo: ✅
   */
  nombre: {
    type: String,
    default: 'Nombre no asignado',
  },
}

export default function usarCapa(props) {
  function agregar(idMapa, fn_agregarCapa) {
    usarRegistroMapas().mapaPromesa(idMapa).then(fn_agregarCapa)
  }

  function eliminar(idMapa) {
    console.log('quitando capa', props.id)

    usarRegistroMapas()
      .mapaPromesa(idMapa)
      .then(mapa => {
        mapa.eliminarCapa(props.id)
      })
  }

  return {
    agregar,
    eliminar,
  }
}
