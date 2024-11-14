import DisplacedPoints from 'ol-displaced-points'
import { Cluster } from 'ol/source'

export const representaciones = {
  puntosAgrupados: 'puntos-agrupados',
  puntosDesplazados: 'puntos-desplazados',
}

export default function (representacion, source) {
  if (representacion === representaciones.puntosAgrupados) {
    return new Cluster({ source: source })
  }

  if (representacion === representaciones.puntosDesplazados) {
    return new DisplacedPoints({
      source: source,
      distance: 80,
      minDistance: 40,
    })
  }

  return source
}
