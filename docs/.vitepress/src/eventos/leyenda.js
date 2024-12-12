export default {
  /**
   * Evento ejecutado cuando se detecta que ha iniciado la carga de la simbología de la
   * información de la capa. En el caso de capas vectoriales (GeoJSON o TopoJSON) inicia la
   * lectura de los estilos de los features; En el caso de capas (WMS) cuando inicia la
   * consulta de las reglas de estilo vía `GetLegendGraphic` en formato JSON; En el caso de las
   * capas por conjunto de teselas (XYZ) no se ejecuta.
   */
  alIniciarCargaSimbologia: 'alIniciarCargaSimbologia',

  /**
   * Evento ejecutado cuando se detecta que ha finalizado la carga de la simbología de la
   * información de la capa. En el caso de capas vectoriales (GeoJSON o TopoJSON) finaliza la
   * lectura de los estilos de los features; En el caso de capas (WMS) cuando finaliza la
   * consulta de las reglas de estilo vía `GetLegendGraphic` en formato JSON; En el caso de las
   * capas por conjunto de teselas (XYZ) no se ejecuta.
   * @param {Boolean} cargaExitosa Indica si la carga no ha presentado error.
   */
  alFinalizarCargaSimbologia: 'alFinalizarCargaSimbologia',
}
