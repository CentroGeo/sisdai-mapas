import { esObjeto } from '.'

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

export function parseEstilo(original) {
  const traducido = {}

  Object.keys(original).forEach(id => {
    const idTraducido = traducirId(id)
    const valor = original[id]

    if (esObjeto(valor)) {
      const anidado = parseEstilo(valor)

      Object.keys(anidado).forEach(idAnidado => {
        traducido[`${idTraducido}-${idAnidado}`] = anidado[idAnidado]
      })
    } else {
      traducido[idTraducido] = traducirValor(idTraducido, valor)
    }
  })

  return traducido
}
