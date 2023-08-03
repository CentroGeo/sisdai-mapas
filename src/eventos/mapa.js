export default {
  /**
   * Ejecutado cuado se detecta que se ha ajustado la vista del mapa a los valores iniciales de la propiedad vista mediante el control AjustarVista.
   *
   * **Parámetros:**
   *
   * - `Object`: Nuevo valor de la vista de OpenLayers.
   */
  alAjustarVista: 'alAjustarVista',

  /**
   * Ejecutado cuando se detecta que el centro de la vista del mapa ha cambiado.
   *
   * **Parámetros:**
   *
   * - `Array`: Nuevo valor del centro.
   */
  alCambiarCentro: 'alCambiarCentro',

  /**
   * Ejecutado cuando se detecta que el zoom de la vista del mapa ha cambiado.
   *
   * **Parámetros:**
   *
   * - `Number`: Nuevo valor de zoom.
   */
  alCambiarZoom: 'alCambiarZoom',

  /**
   * Ejecutado cuando se detecta que la vista del mapa ha cambiado.
   *
   * **Parámetros:**
   *
   * - `Object`: Nuevo valor de la vista de OpenLayers.
   */
  alMoverVista: 'alMoverVista',
}
