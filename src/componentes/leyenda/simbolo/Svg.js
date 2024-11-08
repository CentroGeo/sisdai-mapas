import { toRaw } from 'vue'
import { DEFAULT_ESTILO_VECTOR_SVG } from '../../../utiles/eslitosCapa'
import { objEnSintaxisCss } from '../../../utiles'

/**
 *
 */
export default class name {
  tamanioPorDefecto = 18

  constructor(opciones = {}) {
    this.estilo = opciones.estilo || DEFAULT_ESTILO_VECTOR_SVG
    this.forma = opciones.forma
    this.icono = opciones.icono
    // this.margen = opciones.margen;
    this.tamanio = opciones.tamanio || this.tamanioPorDefecto

    this.tamanioSimboloMayor = opciones.tamanioSimboloMayor

    this.geometria = opciones.geometria
  }

  get margen() {
    return this.estilo['stroke-width'] ? this.estilo['stroke-width'] : 0
  }

  get tamanioSimboloMayorMinimo() {
    return this.tamanioSimboloMayor > this.tamanioPorDefecto
      ? this.tamanioSimboloMayor
      : this.tamanioPorDefecto
  }

  get atributosCircle() {
    return {
      cx: this.tamanioSimboloMayorMinimo / 2,
      cy: this.tamanio / 2,
      r: (this.tamanio - this.margen) / 2,
    }
  }

  get atributosPolygon() {
    return {
      points: this.forma,
    }
  }

  get atributosImage() {
    return {
      x: 0,
      y: 0,
      width: this.tamanio,
      height: this.tamanio,
      href: this.icono,
    }
  }

  get atributosLine() {
    return {
      x1: 0,
      y1: this.tamanio,
      x2: this.tamanio,
      y2: 0,
    }
  }

  get atributosRect() {
    return {
      x: this.margen / 2,
      y: this.margen / 2,
      rx: 1,
      ry: 1,
      width: this.tamanio - this.margen,
      height: this.tamanio - this.margen,
    }
  }

  /**
   * @param {string} val
   */
  set geometria(val) {
    if (val === 'punto') {
      if (this.icono) {
        this.tipoGrafico = 'image'
        this.atributos = this.atributosImage
        return
      }

      if (this.forma) {
        this.tipoGrafico = 'polygon'
        this.atributos = this.atributosPolygon
        return
      }

      this.tipoGrafico = 'circle'
      this.atributos = this.atributosCircle
      return
    }

    if (val === 'linea') {
      this.tipoGrafico = 'line'
      this.atributos = this.atributosLine
      return
    }

    this.tipoGrafico = 'rect'
    this.atributos = this.atributosRect
  }

  get atributosConEstilo() {
    return {
      ...this.atributos,
      style: objEnSintaxisCss(this.estilo),
    }
  }

  get xml() {
    const atributos = Object.entries(toRaw(this.atributosConEstilo))
      .map(([key, val]) => `${key}="${val}"`)
      .join(' ')

    return `<${this.tipoGrafico} ${atributos} />`
  }
}
