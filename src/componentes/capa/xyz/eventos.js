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
   * @param {Boolean} cargaExitosa Indica con `false` si al finalizar la carga del mosaico ha presentado error.
   */
  alFinalizarCargaTesela: 'alFinalizarCargaTesela'
}
