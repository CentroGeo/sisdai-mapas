import { ejecutarMetodoArrayEnObjeto, esObjeto } from '.'

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

function traducirColor(color) {
  // 'verde-oscuro'.split('-').reverse().join('')
  return color
    .split('-')
    .map(colorSeparado =>
      Object.hasOwnProperty.call(dicColores, colorSeparado)
        ? dicColores[colorSeparado]
        : colorSeparado
    )
    .reverse()
    .join('')
}

function traducirId(id) {
  return id
    .split('-')
    .map(idSeparado =>
      Object.hasOwnProperty.call(dicEstilosOl, idSeparado)
        ? dicEstilosOl[idSeparado]
        : idSeparado
    )
    .join('-')
}

function traducirValor(idTraducido, valor) {
  if (idTraducido.endsWith(dicEstilosOl.color)) {
    // return Object.hasOwnProperty.call(dicColores, valor)
    //   ? dicColores[valor]
    //   : valor
    return traducirColor(valor)
  }

  return valor
}

export function traducirEstilo(original) {
  const traducido = {}

  Object.keys(original).forEach(id => {
    const idTraducido = traducirId(id)
    const valor = original[id]

    if (esObjeto(valor)) {
      const anidado = traducirEstilo(valor)

      Object.keys(anidado).forEach(idAnidado => {
        traducido[`${idTraducido}-${idAnidado}`] = anidado[idAnidado]
      })
    } else {
      traducido[idTraducido] = traducirValor(idTraducido, valor)
    }
  })

  return traducido
}

export function estiloParaSvg(estilo) {
  return ejecutarMetodoArrayEnObjeto(traducirEstilo(estilo), ([key, val]) => [
    key.endsWith('-color') ? key.replace('-color', '') : key,
    val,
  ])
}

/**
 * @see https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html
 */
export const DEFAULT_RELLENO_COLOR = 'rgba(255,255,255,0.4)'
export const DEFAULT_CONTORNO_COLOR = '#3399CC'
export const DEFAULT_CONTORNO_GROSOR = 1.25
export const DEFAULT_CIRCULO_RADIO = 5
export const DEFAULT_ESTILO_LINEA = {
  'contorno-color': DEFAULT_CONTORNO_COLOR,
  'contorno-grosor': DEFAULT_CONTORNO_GROSOR,
}
export const DEFAULT_ESTILO_POLIGONO = {
  'relleno-color': DEFAULT_RELLENO_COLOR,
  ...DEFAULT_ESTILO_LINEA,
}
export const DEFAULT_ESTILO_CIRCULO = {
  'circulo-radio': DEFAULT_CIRCULO_RADIO,
  'circulo-relleno-color': DEFAULT_RELLENO_COLOR,
  'circulo-contorno-color': DEFAULT_CONTORNO_COLOR,
  'circulo-contorno-grosor': DEFAULT_CONTORNO_GROSOR,
}
export const DEFAULT_ESTILO_FORMA = {
  'forma-radio': DEFAULT_CIRCULO_RADIO,
  'forma-relleno-color': DEFAULT_RELLENO_COLOR,
  'forma-contorno-color': DEFAULT_CONTORNO_COLOR,
  'forma-contorno-grosor': DEFAULT_CONTORNO_GROSOR,
}

export const DEFAULT_ESTILO_VECTOR = {
  // ...DEFAULT_ESTILO_FORMA,
  ...DEFAULT_ESTILO_CIRCULO,
  ...DEFAULT_ESTILO_POLIGONO,
  ...DEFAULT_ESTILO_LINEA,
}

export const DEFAULT_ESTILO_VECTOR_SVG = estiloParaSvg(DEFAULT_ESTILO_VECTOR)
