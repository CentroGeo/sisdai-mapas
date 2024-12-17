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
export const RELLENO_COLOR = 'rgba(255,255,255,0.4)'
export const CONTORNO_COLOR = '#3399CC'
export const CONTORNO_GROSOR = 1.25
export const CIRCULO_RADIO = 5

export const ESTILO_LINEA = {
  'contorno-color': CONTORNO_COLOR,
  'contorno-grosor': CONTORNO_GROSOR,
}
export const ESTILO_POLIGONO = {
  'relleno-color': RELLENO_COLOR,
  ...ESTILO_LINEA,
}
export const ESTILO_CIRCULO = {
  'circulo-radio': CIRCULO_RADIO,
  'circulo-relleno-color': RELLENO_COLOR,
  'circulo-contorno-color': CONTORNO_COLOR,
  'circulo-contorno-grosor': CONTORNO_GROSOR,
}
export const ESTILO_FORMA = {
  'forma-radio': CIRCULO_RADIO,
  'forma-relleno-color': RELLENO_COLOR,
  'forma-contorno-color': CONTORNO_COLOR,
  'forma-contorno-grosor': CONTORNO_GROSOR,
}

export const ESTILO_VECTOR = {
  // ...ESTILO_FORMA,
  ...ESTILO_CIRCULO,
  ...ESTILO_POLIGONO,
  ...ESTILO_LINEA,
}

export const ESTILO_VECTOR_SVG = estiloParaSvg(ESTILO_VECTOR)
