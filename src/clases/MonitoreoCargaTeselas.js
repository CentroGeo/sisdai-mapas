import { tipoEstadoCarga } from '@/valores/capa'

export default class {
  reiniciar() {
    this.inicio = 0
    this.fin = 0
    this.error = 0
  }

  constructor() {
    this.reiniciar()
  }

  get cargaCompleta() {
    return this.inicio > 0 && this.inicio === this.fin + this.error
  }

  get estdo() {
    if (this.inicio === 0) {
      return tipoEstadoCarga.no
    }

    if (this.cargaCompleta) {
      return this.error === this.inicio
        ? tipoEstadoCarga.error // si todas las teselas dan error
        : tipoEstadoCarga.fin
    }

    return tipoEstadoCarga.inicio
  }
}
