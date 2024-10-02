/**
 * Tipos de estado de caga:
 * - no (indefinida): Aún no ha iniciado la carga o se encuentra como indefinida.
 * - inicio (iniciada): La carga ha sido inicada.
 * - error (error): La carga ha dado error.
 * - fin (finalizad): Ha finalizado la carga.
 */
export const TipoEstadoCarga = {
  no: 'indefinida',
  inicio: 'iniciada',
  error: 'error',
  fin: 'finalizada'
}

/**
 * Clase que se utiliza para monitorar el estado total de carga de un conjunto de elementos
 * (capas, teselas, etc) a través de contadores.
 */
class MonitoreoCargaElementos {
  constructor() {
    this.reiniciar()
  }

  /**
   * Reinicia los contadores a 0.
   */
  reiniciar() {
    this.inicio = 0
    this.fin = 0
    this.error = 0
  }

  /**
   * Devuelve un boleano que depende si la carga ha finalizado.
   * @returns {boolean}
   */
  get cargaCompleta() {
    return this.inicio > 0 && this.inicio === this.fin + this.error
  }

  /**
   * Devuelve el TipoEstadoCarga en el que estén el conjunto completo de elementos monitoreados.
   * @returns {TipoEstadoCarga}
   */
  get estdo() {
    if (this.inicio === 0) {
      // Si aún no a iniciado la carga.
      return TipoEstadoCarga.no
    }

    if (this.cargaCompleta) {
      // Si la carha ha sido completada.
      return this.error === this.inicio // Si todas las teselas dan error.
        ? TipoEstadoCarga.error
        : TipoEstadoCarga.fin
    }

    // Si no ha entrado a las condiciones anteriores, la carga está uniciada.
    return TipoEstadoCarga.inicio
  }
}

export default MonitoreoCargaElementos
