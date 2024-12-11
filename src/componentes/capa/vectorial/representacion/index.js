import Cluster from 'ol/source/Cluster'
import { esObjeto } from '../../../../utiles'
import puntosDesplazados from './puntosDesplazados'
// import VectorEventType from 'ol/source/VectorEventType'
// import Estilo from './../../../../utiles/vectores/Estilo'

export const representaciones = {
  // coropletas: 'coropletas',
  categorias: 'categorias',
  graduacion: 'graduacion',
  puntosAgrupados: 'puntos-agrupados',
  puntosDesplazados: 'puntos-desplazados',
}

export default function (representacion, source) {
  const nombre = esObjeto(representacion)
    ? Object.keys(representacion)[0]
    : representacion
  const parametros = esObjeto(representacion) ? representacion[nombre] : {}

  // if (nombre === representaciones.categorias) {
  //   // console.log(nombre, parametros)

  //   source.on(VectorEventType.FEATURESLOADEND, ({ features }) => {
  //     const atributos = features.map(feature =>
  //       feature.get(parametros.atributo)
  //     )

  //     const conteo = atributos.reduce((a, c) => {
  //       a[c] = esNuemro(a[c]) ? a[c] + 1 : 1
  //       return a
  //     }, {})
  //     const categorias = [...new Set(atributos)]

  //     // console.log(conteo, categorias, parametros.estilo)

  //     const estilos = Object.keys(parametros.estilo).map(id => {
  //       return {
  //         filter: ['==', ['get', parametros.atributo], id],
  //         // style: estilos[id],
  //         style: new Estilo(parametros.estilo[id]).traducidoOl,
  //       }
  //     })

  //     // console.log('style:', JSON.stringify(estilos))
  //   })

  //   return source
  // }

  if (nombre === representaciones.puntosAgrupados) {
    return new Cluster({ source: source })
  }

  if (nombre === representaciones.puntosDesplazados) {
    return puntosDesplazados(parametros, source)
  }

  return source
}
