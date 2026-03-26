export default {
  /**
   * Ejecutado cuando se detecta que la vista del mapa ha cambiado.
   *
   * **Parámetros:**
   * - `Object`: Nuevo valor de la vista de OpenLayers.
   */
  alMoverVista: 'alMoverVista',

  /**
   * Evento ejecutado cuando se da click en el botón de centrar.
   */
  clickCentrar: 'clickCentrar',

  /**
   * Evento ejecutado cuando se da click en la vista del mapa.
   *
   * **Parámetros:**
   * - `Array`: Coordenadas geográficas (longitud y latitud) del píxel dónde se dió el click.
   */
  clickVista: 'clickVista',
}
