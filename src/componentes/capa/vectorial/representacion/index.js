import { esObjeto } from '../../../../utiles'
import puntosAgrupados from './puntosAgrupados'
import puntosDesplazados from './puntosDesplazados'

export const representaciones = {
  puntosAgrupados: 'puntos-agrupados',
  puntosDesplazados: 'puntos-desplazados',
}

export default function (representacion, source) {
  const nombre = esObjeto(representacion)
    ? Object.keys(representacion)[0]
    : representacion
  const parametros = esObjeto(representacion) ? representacion[nombre] : {}

  if (nombre === representaciones.puntosAgrupados) {
    return puntosAgrupados(parametros, source)
  }

  if (nombre === representaciones.puntosDesplazados) {
    return puntosDesplazados(parametros, source)
  }

  return source
}
