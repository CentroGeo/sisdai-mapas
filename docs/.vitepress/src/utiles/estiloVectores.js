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

export function estiloParaSvgPunto(estilo, tipo = 'circle') {
  const estiloSvg = estiloParaSvg(estilo)

  const coincide = ejecutarMetodoArrayEnObjeto(
    estiloSvg,
    ([key]) => key.startsWith(tipo),
    'filter'
  )
  const noCoincide = ejecutarMetodoArrayEnObjeto(
    estiloSvg,
    ([key]) => !key.startsWith(tipo),
    'filter'
  )
  const remplazado = ejecutarMetodoArrayEnObjeto(coincide, ([key, val]) => [
    key.replace(`${tipo}-`, ''),
    val,
  ])

  return { ...noCoincide, ...remplazado }
}

export function estiloContiene(estilo, tipo) {
  return Object.keys(estilo).some(key => key.startsWith(tipo))
}

export function acomodarFormaDesdeVector(estilo) {
  // coordenadas de puntos
  // console.log('coordenadas de puntos', estilo);

  const puntos = estilo['shape-points']
  // const angulo = estilo['shape-angle'];
  const angulo = (2 * Math.PI) / Number(puntos)
  // const margen = Number(estilo['shape-stroke-width']);
  const radio = Number(estilo['shape-radius'])
  const radio2 = estilo['shape-radius2']
  console.log(
    `puntos: ${puntos}; radio: ${radio}; radio2: ${radio2}; angulo: ${angulo};`
  )
  // console.log(diameterFromRadius(radio));

  const coords = []

  for (var i = 0; i < puntos; i++) {
    coords.push([
      radio + radio * Math.sin(i * angulo),
      radio - radio * Math.cos(i * angulo),
    ])
  }

  // console.log(coords, calcularLimites(coords));

  return coords.toString()
}
