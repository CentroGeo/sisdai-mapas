import DisplacedPoints from 'ol-displaced-points'

/**
 * Props:
 *
 * distancia: 80,
 * distanciaMinima: 40,
 * metodo: 'anillos-concentricos',
 * radioPuntoCentro: 4,
 * radioPuntosDesplazados: 4
 */

const dicMetodos = {
  anillo: 'ring',
  'anillos-concentricos': 'concentric-rings',
  espiral: 'spiral',
  cuadricula: 'grid',
}

export default function (
  {
    distancia,
    distanciaMinima,
    metodo,
    radioPuntoCentro,
    radioPuntosDesplazados,
  },
  source
) {
  return new DisplacedPoints({
    source,
    distance: distancia,
    minDistance: distanciaMinima,
    placementMethod: dicMetodos[metodo],
    radiusCenterPoint: radioPuntoCentro,
    radiusDisplacedPoints: radioPuntosDesplazados,
  })
}
