import Estilo from './Estilo'

/**
 *
 */
const dicGeom = {
  // wms
  Polygon: 'rect',
  Line: 'line',
  Point: 'circle',
  // Point: 'image',
  // Point: 'polygon',

  // vectores
  Punto: 'circle',
  // Point: "circle",
  MultiPoint: 'circle',
  Linea: 'line',
  LineString: 'line',
  MultiLineString: 'line',
  Poligono: 'rect',
  // Polygon: "rect",
  MultiPolygon: 'rect',
}

export default class Svg {
  espacioMinimo = 18
  espacio = this.espacioMinimo

  constructor({ estilo, geometria, tamanio, espacio }) {
    this.estilo = estilo ? new Estilo(estilo).traducido : undefined

    this.grafico = dicGeom[geometria] || dicGeom.Polygon

    this.tamanio = tamanio || this.espacioMinimo

    this.espacio = espacio || this.espacioMinimo
  }

  get atributos() {
    if (this.grafico === dicGeom.Point) {
      return {
        cx: this.espacio / 2,
        cy: this.tamanio / 2,
        r: (this.tamanio - this.margen) / 2,
      }
    }

    if (this.grafico === dicGeom.Line) {
      return {
        x1: 0,
        y1: this.tamanio,
        x2: this.tamanio,
        y2: 0,
      }
    }

    return {
      x: this.margen / 2,
      y: this.margen / 2,
      rx: 1,
      ry: 1,
      width: this.tamanio - this.margen,
      height: this.tamanio - this.margen,
    }
  }

  // set espacio(valor) {
  //   this._espacio = Math.max(Number(valor) || 0, this._espacio);
  // }

  get margen() {
    return this.estilo?.traducido['stroke-width'] || 0
  }

  // set tamanio(valor) {
  //   this._tamanio = valor || this.tamanioPorDefecto;
  //   if (valor > this.tamanioMayor) {
  //     this.tamanioMayor = valor;
  //     // this.tamanioMayor = Math.max(this.tamanioMayor, valor);
  //     // console.log(this.tamanioMayor, valor);
  //     // console.log("asignar this.tamanioMayor");
  //   }
  // }

  /**
   *
   */
  get xml() {
    return `<${this.grafico} ${objetoComoTextoAcomodado(
      { ...this.atributos, style: this.estilo?.css },
      (id, valor) => `${id}="${valor}"`
    )} />`
  }
}

/**
 * Devuelve un objeto en texto con sintaxis de reglas css.
 * @param {Object} obj
 * @param {Function} acomodo
 * @returns {String}
 */
export function objetoComoTextoAcomodado(objeto, acomodo, union = ' ') {
  return Object.entries(objeto)
    .filter(([, valor]) => valor !== undefined) // Filtrar valores con valor (undefined, null, NaN, Infinity)
    .map(([id, valor]) => acomodo(id, valor))
    .join(union)
}
