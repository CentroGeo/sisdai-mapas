/**
 *
 */
export default class ReglaCss {
  constructor(propiedad, valor) {
    this.propiedad = propiedad
    this.valor = valor
  }

  get css() {
    return `${this.propiedad}: ${this.valor};`
  }

  /**
   * Devuelve la regla como lo necesitan los objetos de open layers (evaluar si esta bien aquí o en la clase Estilo)
   */
  get cssOl() {
    console.log('las propiedades color deben tener el sufijo -color')
    return `${this.propiedad + (this.esColor ? '-color' : '')}: ${this.valor};`
  }

  /**
   * Sirve para pregunta si la regla ewn cuestión es un color
   * @returns {boolean}
   */
  get esColor() {
    return [
      'contorno',
      dicEstilosOl['contorno'],
      'relleno',
      dicEstilosOl['relleno'],
    ].includes(this.propiedad)
  }

  /**
   * Devuelve la regla como un objeto JSON
   */
  get objeto() {
    return { [this.propiedad]: this.valor }
  }

  get objetoOl() {
    return { [`${this.propiedad}${this.esColor ? '-color' : ''}`]: this.valor }
  }

  /**
   * Devuelve un nuevo objeto ReglaCss pero con la propiedad y el valor traducido
   */
  get traducida() {
    return new ReglaCss(
      this.propiedad
        .split('-')
        .map(idSeparado => dicEstilosOl[idSeparado] || idSeparado)
        .join('-'),
      this.esColor
        ? this.valor
            .split('-')
            // 'verde-oscuro'.split('-').reverse().join('')
            .map(colorSeparado => dicColores[colorSeparado] || colorSeparado)
            .reverse()
            .join('')
        : this.valor
    )
  }
}

/**
 * @see https://openlayers.org/en/latest/examples/style-expressions.html
 * @see https://openlayers.org/en/latest/examples/regularshape.html
 */
const dicEstilosOl = {
  angulo: 'angle',
  circulo: 'circle',
  color: 'color',
  contorno: 'stroke',
  desplazamiento: 'displacement',
  escala: 'scale',
  filtro: 'filter',
  forma: 'shape',
  fuente: 'src',
  grosor: 'width',
  icono: 'icon',
  puntos: 'points',
  radio: 'radius',
  radio2: 'radius2',
  relleno: 'fill',
  estilo: 'style',
  texto: 'text',
  tipografia: 'font',
  valor: 'value',
}

const dicColores = {
  amarillo: 'yellow',
  azul: 'blue',
  blanco: 'white',
  cafe: 'brown',
  gris: 'gray',
  naranja: 'orange',
  negro: 'black',
  rojo: 'red',
  oro: 'gold',
  rosa: 'pink',
  transparente: 'transparent',
  turquesa: 'turquoise',
  verde: 'green',
  violeta: 'violet',
  oscuro: 'dark',
}
