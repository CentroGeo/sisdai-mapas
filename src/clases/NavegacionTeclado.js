import EventType from 'ol/events/EventType'
import * as olExtent from 'ol/extent'
import GeometryCollection from 'ol/geom/GeometryCollection'
import LineString from 'ol/geom/LineString'
import MultiLineString from 'ol/geom/MultiLineString'
import MultiPoint from 'ol/geom/MultiPoint'
import MultiPolygon from 'ol/geom/MultiPolygon'
import Point from 'ol/geom/Point'
import Polygon from 'ol/geom/Polygon'
import VectorLayer from 'ol/layer/Vector'
import VectorImageLayer from 'ol/layer/VectorImage'
import { teclasAtajo } from './../valores/mapa'

export default class NavegacionTeclado {
  constructor(mapa) {
    mapa.on(EventType.KEYDOWN, ({ originalEvent }) => {
      // console.log(EventType.KEYDOWN, originalEvent)

      switch (originalEvent.key.toLowerCase()) {
        case teclasAtajo.INFORMACION:
          this.teclado(mapa)
          break

        case teclasAtajo.NORTE:
          mapa.getView().setRotation(0)
          break

        case teclasAtajo.ROTAR_IZQUIERDA:
          /**
           * @see https://openlayers.org/en/latest/examples/full-screen-drag-rotate-and-zoom.html
           */
          mapa.getView().setRotation(mapa.getView().getRotation() + Math.PI / 8)
          break

        case teclasAtajo.ROTAR_DERECHA:
          mapa.getView().setRotation(mapa.getView().getRotation() - Math.PI / 8)
          break

        default:
          // console.log(originalEvent.key.toLowerCase())
          break
      }
    })

    // mapa.addEventListener(EventType.FOCUS, x => {
    //   console.log(EventType.FOCUS, x)
    // })
  }

  teclado(mapa) {
    console.log('Buscar contenido de la vista')

    const extent = mapa.getView().calculateExtent()

    // console.log(
    //   extent,
    //   olExtent.getBottomLeft(extent), // x1, y1
    //   olExtent.getTopLeft(extent),
    //   olExtent.getTopRight(extent), // x2, y2
    //   olExtent.getBottomRight(extent)
    // )

    // Itera a través de todas las capas en tu mapa
    const featuresVista = mapa
      .getAllLayers()
      .filter(
        // Verifica si la capa es una capa vectorial (puedes personalizar esto según tus necesidades)
        capa =>
          Boolean(
            (capa instanceof VectorLayer || capa instanceof VectorImageLayer) &&
              capa.get('globoInfo')
          )
      )
      .map(capa =>
        capa
          .getSource()
          .getFeatures()
          .filter(feature =>
            // filtra los que están dentro de la vista
            olExtent.intersects(extent, feature.getGeometry().getExtent())
          )
          // esta validación posiblemente se quite
          .filter(feature => feature.getGeometry() instanceof Point)
          .map(feature => {
            // console.log(
            //   // feature.getGeometryName(),
            //   feature
            // )
            // geometriaTipo(feature.getGeometry())

            if (feature.getGeometry() instanceof Polygon) {
              console.log(
                feature.getProperties().nom_edo,
                'Polygon',
                feature.getGeometry().getInteriorPoint().getCoordinates()
                // .slice(0, 2)
                // .toString()
              )
            }
            if (feature.getGeometry() instanceof MultiPolygon) {
              console.log(
                feature.getProperties().nom_edo,
                'MultiPolygon',
                feature.getGeometry().getInteriorPoints().getCoordinates()
                  .length
                // .map(c => c.slice(0, 2).toString())
                // .join('&')
              )
            }

            // regresa solo el pixel de la geometria
            return mapa.getPixelFromCoordinate(
              feature.getGeometry().getCoordinates()
            )
          })
      )
      .flat()

    const div = document.getElementById('lista-teclado')

    if (featuresVista.length === 0) {
      div.innerHTML = '<p>No se encontraron elementos accesibles</p>'
      return
    }

    if (featuresVista.length > 21) {
      div.innerHTML = `<p>${featuresVista.length} resultados encontrados en el área de búsqueda. Presione la tecla más para acercar y reducir la cantidad de resultados</p>`
      return
    }

    div.innerHTML = featuresVista.length

    // console.log('elementos encontrados:', featuresVista.length)
    console.log(
      `elementos encontrados: ${featuresVista.length}\n${featuresVista
        .slice(0, 7)
        .map((f, i) => `${i + 1}: ${f}`)
        .join('\n')}`
    )

    const contenido = mapa.globoInfo.buscarContenidoEnPixel(
      featuresVista[0],
      mapa
    )

    mapa.globoInfo.mostrar(contenido, featuresVista[0], mapa)
  }
}

export function geometriaTipo(geometria) {
  if (geometria instanceof Point) {
    console.log('punto')
  } else if (geometria instanceof LineString) {
    console.log('línea.')
  } else if (geometria instanceof Polygon) {
    console.log(typeof Point)
    console.log('polígono.')
  } else if (geometria instanceof MultiPoint) {
    console.log('MultiPoint')
  } else if (geometria instanceof MultiLineString) {
    console.log('MultiLineString')
  } else if (geometria instanceof MultiPolygon) {
    console.log(typeof MultiPolygon)
    console.log('MultiPolygon')
  } else if (geometria instanceof GeometryCollection) {
    console.log('colección de geometrías')
  } else {
    console.log('Tipo de geometría desconocido.')
  }
}
