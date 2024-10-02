import props from './../props'

export default {
  ...props,

  /**
   * Url remota de la capa.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: No
   */
  url: {
    type: String,
    default: 'https://{a-c}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
  }
}
