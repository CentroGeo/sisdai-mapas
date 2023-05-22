import olMap from 'ol/Map'

/**
 *
 */
export default class Mapa extends olMap {
  constructor(opcionesOlMap) {
    super(opcionesOlMap)
  }

  /**
   *
   * @param {*} idCapa
   * @returns
   */
  buscarCapa(idCapa) {
    // quizá promesa!
    return this.getAllLayers().find(capa => capa.get('id') === idCapa)
  }

  /**
   *
   * @param {*} idCapa
   */
  eliminarCapa(idCapa) {
    this.removeLayer(this.buscarCapa(idCapa))
  }
}
