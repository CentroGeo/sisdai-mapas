import eventos from './../eventos'

export default {
  ...eventos,

  /**
   * Ejecutado cuando se detecta que ha iniciado la carga de cada uno de los mosaicos que
   * conponen la capa visible en el mapa.
   */
  alIniciarCargaTesela: 'alIniciarCargaTesela',

  /**
   * Ejecutado cuando se detecta que ha finalizado la carga de cada uno de los mosaicos
   * que conponen la capa visible en el mapa.
   * @param {Boolean} cargaExitosa Indica si la carga del mosaico no ha presentado error.
   */
  alFinalizarCargaTesela: 'alFinalizarCargaTesela'
}
