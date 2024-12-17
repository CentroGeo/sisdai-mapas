import DelimitedCluster from 'ol-displaced-points/DelimitedCluster'

/**
 * Props:
 *
 * distancia: 80,
 * distanciaMinima: 40,
 * metodo: 'anillos-concentricos',
 * radioPuntoCentro: 4,
 * radioPuntosDesplazados: 4
 */

export default function (
  { campoDelimitador, distancia, distanciaMinima },
  source
) {
  return new DelimitedCluster({
    delimiterField: campoDelimitador,
    distance: distancia,
    minDistance: distanciaMinima,
    source,
  })
}
