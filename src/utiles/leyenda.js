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

export function acomodarReglasWms({ Legend }) {
  // console.log(Legend[0].rules[0].symbolizers[0]);

  const clases = Legend[0].rules.map(({ name, symbolizers, title }) => ({
    titulo: title || name,
    simbolo: acomodarSimbolo(symbolizers[0]),
  }))

  const tamanioSimboloMayor = Math.max(
    ...clases.map(({ simbolo }) => simbolo.tamanio)
  )

  // console.log(tamanioSimboloMayor)

  return clases.map(({ titulo, simbolo }) => {
    return {
      titulo,
      simbolo: new SimboloSvgLeyenda({ ...simbolo, tamanioSimboloMayor }),
    }
  })
}
