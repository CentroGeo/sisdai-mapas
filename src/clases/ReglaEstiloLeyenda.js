import { tipoGeometria } from './../valores/capa'
import GraficoSvg from './GraficoSvg'

export default class {
  constructor(opciones) {
    this.titulo = opciones.titulo
    this.simbolo = opciones.simbolo
  }
}

export class Reglas {
  constructor(opciones = {}) {
    this.tipo = opciones.tipo || 'vector'
    // this.lista = []
  }

  get lista() {
    if (this.tipo === 'vector') {
      console.log('construir desde vector')
    } else {
      console.log('consultar wms')
    }

    return []
  }
}

class Simbolo {
  constructor(opciones = {}) {
    this.estilo = opciones.estilo
    this.geometria = opciones.geometria
    this.tamanio
    this.puntosForma
    this.icono

    // this.graficoSvg = new GraficoSvg({})

    console.log(this.estilo)
  }

  /**
   * @param {string} val
   */
  set geometria(val) {
    if (val === tipoGeometria.punto) {
      console.log('circle')
      this.graficoSvg = new GraficoSvg({
        estilo: this.estilo,
        tamanio: this.estilo['circle-radius'] * 2,
        geometria: val,
      })
    }
  }

  // get estilo() {
  //   return 1
  // }
}

export class ReglasVector {
  constructor(opciones = {}) {
    this.simbolo = new Simbolo(opciones)
  }

  get lista() {
    return [
      {
        simbolo: this.simbolo,
      },
    ]
  }
}

export class ReglasWms {
  constructor(opciones = {}) {
    this.url = opciones.url
    this.lista = []
  }

  get lista() {
    return []
  }
}
