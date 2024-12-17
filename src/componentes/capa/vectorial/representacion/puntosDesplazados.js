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
    campoDelimitador,
    distancia,
    distanciaMinima,
    metodo,
    radioPuntoCentro,
    radioPuntosDesplazados,
  },
  source
) {
  return new DisplacedPoints({
    distance: distancia,
    delimiterField: campoDelimitador,
    minDistance: distanciaMinima,
    placementMethod: dicMetodos[metodo],
    radiusCenterPoint: radioPuntoCentro,
    radiusDisplacedPoints: radioPuntosDesplazados,
    source,
  })
}
