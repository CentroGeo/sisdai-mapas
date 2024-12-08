import Cluster from 'ol/source/Cluster'
import { esObjeto } from '../../../../utiles'
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
  // console.log(parametros)

  if (nombre === representaciones.puntosAgrupados) {
    return new Cluster({ source: source })
  }

  if (nombre === representaciones.puntosDesplazados) {
    return puntosDesplazados(parametros, source)
  }

  return source
}
