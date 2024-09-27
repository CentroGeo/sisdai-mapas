export default {
  /**
   * Evento ejecutado cuando se detecta el cambio de visibilidad de la capa desde las propiedades
   * reactivas o desde los controles del componente como el control de leyenda.
   * @param {Boolean} visibilidad Visibilidad final al ejecutarse este evento.
   */
  alCambiarVisibilidad: 'alCambiarVisibilidad',

  /**
   * Evento ejecutado cuando se detecta que ha iniciado la carga de la información visible en el
   * mapa. En el caso de capas vectoriales (GeoJSON) cuando inicia la consulta de los features;
   * En el caso de capas raster (WMS) cuando inicia la consulta de la imagen; En el caso de las
   * capas por conjunto de teselas (XYZ, OSM) cuando inicia la consulta de un grupo de teselas.
   */
  alIniciarCarga: 'alIniciarCarga',

  /**
   * Evento ejecutado cuando se detecta que ha finalizado la carga de la información visible en
   * el mapa. En el caso de capas vectoriales (GeoJSON) cuando finaliza la consulta de los
   * features; En el caso de capas raster (WMS) cuando finaliza la consulta de la imagen; En el
   * caso de las capas por conjunto de teselas (XYZ, OSM) cuando finaliza la consulta de un
   * grupo de teselas.
   * @param {Boolean} cargaExitosa Indica si la carga no ha presentado error.
   */
  alFinalizarCarga: 'alFinalizarCarga'
}
