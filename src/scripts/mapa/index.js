/**
 * @module scripts/mapa
 */

import vistaMapaDefault from './../../defaults/vistaMapa'

export const props = {
  /**
   * `ajustarVistaPorCapasVisibles`
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Interactivo: ✅
   *
   * Define si al presionar el botón que ajusta la vista, se aplicará el zoom a las capas
   * visibles que tengan una extensión definida.
   */
  ajustarVistaPorCapasVisibles: {
    type: Boolean,
    default: false,
  },

  /**
   * escalaGrafica
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Interactivo: ✅
   *
   * Define si se agrega la escala gráfica en el mapa.
   */
  escalaGrafica: {
    type: Boolean,
    default: true,
    validator: valor => typeof valor === typeof Boolean(),
  },

  /**
   * EVALUAR SI VA AQUÍ O EN LA PROPIEDAD VISTA
   * proyeccion
   * - Tipo: `String`
   * - Valor por defecto: `EPSG:4326`
   * - Interactivo: ❌
   *
   * Código de identificación SRS que define la proyección de la vista.
   *
   * > ℹ️ **Información:** El valor predeterminado es Universal Transversal de Mercator.
   */
  proyeccion: {
    type: String,
    default: 'EPSG:4326',
  },

  /**
   * Tema de la disposición de elemntos de apoyo del mapa (contenedor del header, pie y columnas
   * laterales)
   */
  tema: {
    type: String,
    default: '',
  },

  /**
   * `vista`
   * - Tipo: `Object`
   * - Valor por defecto: `{ centro: [0, 0], zoom: 1.5 }`
   * - Interactivo: ✅
   *
   * Objeto que define la vista del mapa. Revisa los detalles de la vista del mapa en la
   * sigueinte sección.
   */
  vista: {
    type: Object,
    default: () => vistaMapaDefault,
    validator: valor => {
      if (valor.extension) {
        return true
      }

      if (Number(valor.zoom) < 1 && Number(valor.zoom) > 22) {
        // eslint-disable-next-line
        console.error('El valor del zoom debe ser entre 1 y 22')
        return false
      }

      if (!Array.isArray(valor.centro)) {
        return false
      } else if (valor.centro.length < 2) {
        return false
      }

      return true
    },
  },
}

export const eventos = {
  /**
   * Ejecutado cuado se detecta que se ha ajustado la vista del mapa a los valores de la
   * propiedad vista.
   */
  alAjustarVista: 'alAjustarVista',

  /**
   * Ejecutado cuado se detecta que el zoom de la vista del mapa ha cambiado.
   * @param {Number} zoom Nuevo valor de zoom.
   */
  alCambiarZoom: 'alCambiarZoom',
}
