import { GetLegendGraphic, utils } from 'geoserver-api-reader'
import Svg from './../Svg'

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

class Clase {
  visible = false

  constructor(titulo, simbolo, filtro) {
    this.titulo = titulo

    // this.simbolo = new Svg(acomodarSimbolo(simbolo))
    this.simbolo = acomodarSimbolo(simbolo)

    this.filtro = acomodarFiltro(filtro)
  }
}

export function acomodarReglasWms({ Legend }) {
  const clases = Legend[0].rules.map(
    ({ filter, name, symbolizers, title }) =>
      new Clase(title || name, symbolizers[0], filter)
  )

  const tamanioSimboloMayor = Math.max(
    ...clases.map(({ simbolo }) => simbolo.tamanio)
  )

  return clases.map(clase => {
    // clase.simbolo.tamanioSimboloMayor = tamanioSimboloMayor
    clase.simbolo = new Svg({ ...clase.simbolo, tamanioSimboloMayor })
    return clase
  })
}

export class GeoserverCapa2 extends GetLegendGraphic {
  constructor(parameters) {
    super(parameters)

    this._formato = 'application/json'
    this._legendOptions = undefined
    this._fuente = parameters.fuente
  }

  get url() {
    return `${utils.urlService(this._fuente, this._servicio)}${this.parametrosEnFormatoURL}`
  }
}
