import { esObjeto } from './index'

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
}

/**
 *
 * @param {*} original
 * @returns
 */
export function parseEstilo(original) {
  const traducido = {}

  for (const id in original) {
    if (Object.hasOwnProperty.call(dicEstilosOl, id)) {
      if (esObjeto(original[id])) {
        const anidado = parseEstilo(original[id])

        Object.keys(anidado).forEach(idAnidado => {
          traducido[`${dicEstilosOl[id]}-${idAnidado}`] = anidado[idAnidado]
        })
      } else {
        if (
          id === 'color' &&
          Object.hasOwnProperty.call(dicColores, original[id])
        ) {
          traducido[dicEstilosOl[id]] = dicColores[original[id]]
        } else {
          traducido[dicEstilosOl[id]] = original[id]
        }
      }
    } else {
      traducido[id] = original[id]
    }
  }

  return traducido
}
