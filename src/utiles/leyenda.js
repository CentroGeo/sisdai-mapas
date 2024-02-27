import SimboloSvgLeyenda from './../clases/SimboloSvgLeyenda'

function acomodarEstilosSvg(obj) {
  if (obj['stroke-width']) {
    obj['stroke-width'] = obj['stroke-width'] >= 1 ? obj['stroke-width'] : 1
  }

  obj['fill'] = obj['fill'] ? obj['fill'] : 'transparent'

  return obj
}

const diccionarioGeometrias = {
  Polygon: 'poligono',
  Line: 'linea',
  Point: 'punto',
}

function acomodarSimbolo(simbolo) {
  const geom = Object.values(simbolo)[0]

  // console.log(geom.graphics ? geom.graphics[0] : geom);

  return {
    estilo: acomodarEstilosSvg(geom.graphics ? geom.graphics[0] : geom),
    geometria: diccionarioGeometrias[Object.keys(simbolo)[0]],
    tamanio: Number(geom.size) || undefined,
  }
}

function acomodarFiltro(filtro) {
  if (filtro === undefined) return

  filtro = filtro.startsWith('[') ? filtro.substring(1) : filtro
  filtro = filtro.endsWith(']')
    ? filtro.substring(0, filtro.length - 1)
    : filtro

  return filtro
}

export function acomodarReglasWms({ Legend }) {
  // console.log(Legend[0].rules[0].symbolizers[0]);

  const clases = Legend[0].rules.map(
    ({ filter, name, symbolizers, title }) => ({
      filtro: acomodarFiltro(filter),
      titulo: title || name,
      simbolo: acomodarSimbolo(symbolizers[0]),
    })
  )

  const tamanioSimboloMayor = Math.max(
    ...clases.map(({ simbolo }) => simbolo.tamanio)
  )

  // console.log(tamanioSimboloMayor)

  return clases.map(({ filtro, titulo, simbolo }) => {
    return {
      filtro,
      titulo,
      simbolo: new SimboloSvgLeyenda({ ...simbolo, tamanioSimboloMayor }),
      visible: true,
    }
  })
}
