export const tipoEstadoCarga = {
  no: 'indefinida',
  inicio: 'iniciada',
  error: 'error',
  fin: 'finalizada',
}

/**
 * @see https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html
 */
export const DEFAULT_RELLENO_COLOR = 'rgba(255,255,255,0.4)'
export const DEFAULT_CONTORNO_COLOR = '#3399CC'
export const DEFAULT_CONTORNO_GROSOR = 1.25
export const DEFAULT_CIRCULO_RADIO = 5
export const linea = {
  'contorno-color': DEFAULT_CONTORNO_COLOR,
  'contorno-grosor': DEFAULT_CONTORNO_GROSOR,
}
export const poligono = {
  'relleno-color': DEFAULT_RELLENO_COLOR,
  ...linea,
}
export const circulo = {
  'circulo-radio': DEFAULT_CIRCULO_RADIO,
  'circulo-relleno-color': DEFAULT_RELLENO_COLOR,
  'circulo-contorno-color': DEFAULT_CONTORNO_COLOR,
  'circulo-contorno-grosor': DEFAULT_CONTORNO_GROSOR,
}
export const forma = {
  'forma-radio': DEFAULT_CIRCULO_RADIO,
  'forma-relleno-color': DEFAULT_RELLENO_COLOR,
  'forma-contorno-color': DEFAULT_CONTORNO_COLOR,
  'forma-contorno-grosor': DEFAULT_CONTORNO_GROSOR,
}

export const estiloVector = { ...forma, ...circulo, ...poligono, ...linea }
