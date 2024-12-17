import props from './../props'

export default {
  ...props,

  /**
   * Url fuente de la capa.
   *
   * - Tipo: `String`
   * - Valor por defecto: `https://{a-c}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png`
   * - Reactivo: no
   */
  fuente: {
    type: String,
    default:
      'https://{a-c}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
  },
}
