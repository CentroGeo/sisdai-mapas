import { estiloParaSvg } from './../utiles/estiloVectores'

export const tipoEstadoCarga = {
  no: 'indefinida',
  inicio: 'iniciada',
  error: 'error',
  fin: 'finalizada',
}

export const tiposCapa = {
  vectorial: 'vectorial',
  wms: 'wms',
  xyz: 'xyz',
}

export const tipoGeometria = {
  punto: 'punto',
  linea: 'linea',
  poligono: 'poligono',
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
