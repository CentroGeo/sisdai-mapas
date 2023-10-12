import MapEventType from 'ol/MapEventType'
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
import { teclasAtajo } from '../valores/mapa'

export default class NavegacionTeclado {
  estado_ = false
  elementosPagina = 7
  maximoElementos = 21
  elementosIterables = []
  paginaActual = 0

  /**
   *
   * @param {import("./Mapa").default} mapa
   */
  constructor(mapa) {
    this.div =
      document.getElementById('lista-teclado') || document.createElement('div')

    mapa.on(EventType.KEYDOWN, ({ originalEvent, map }) => {
      if (this.estado_) {
        this.alTeclearMapa(map, originalEvent.key.toLowerCase())
      }
    })

    mapa.on(MapEventType.MOVEEND, ({ map }) => {
      if (this.estado_) {
        this.alMoverMapa(map)
      }
    })
  }

  activar(mapa) {
    if (!this.estado_) {
      // console.log('activando navegación por teclado')
      mapa.getTargetElement().focus()
      this.estado_ = true

      this.actalizarElementosIterables(mapa)
      this.paginaActual = 0
      this.actualizartAsignacionNumerica()
    }
  }

  desactivar() {
    if (this.estado_) {
      console.log('desactivando navegación por teclado!!!')
      this.estado_ = false

      this.div.innerHTML = ''
    }
  }

  alTeclearMapa(mapa, tecla) {
    // console.log('mapa tecleado', this.paginaActual)
    switch (tecla) {
      case teclasAtajo.TABULADOR:
        this.desactivar()
        break

      case teclasAtajo.LISTAR_ANTERIORES:
        this.listarAnteriores()
        break

      case teclasAtajo.LISTAR_SIGUIENTES:
        this.listarSiguientes()
        break

      default:
        var numero = Number(tecla)

        if (numero >= 0 && numero <= 7) {
          if (numero <= this.elementosIterables.length) {
            this.mostrarGlobo(
              mapa,
              this.elementosIterables[
                numero - 1 + this.elementosPagina * this.paginaActual
              ].pixel
            )
          }
        }
        break
    }
  }

  alMoverMapa(mapa) {
    // console.log('mapa movido', this.paginaActual)
    this.actalizarElementosIterables(mapa)
    this.paginaActual = 0
    this.actualizartAsignacionNumerica()
  }

  mostrarGlobo(mapa, pixel) {
    const contenido = mapa.globoInfo.buscarContenidoEnPixel(pixel, mapa)

    mapa.globoInfo.mostrar(contenido, pixel, mapa)
  }

  listarAnteriores() {
    if (this.paginaActual > 0) {
      this.paginaActual--
      this.actualizartAsignacionNumerica()
    }
  }

  listarSiguientes() {
    if (
      this.paginaActual <
      Math.floor(this.elementosIterables.length / this.elementosPagina)
    ) {
      this.paginaActual++
      this.actualizartAsignacionNumerica()
    }
  }

  actualizartAsignacionNumerica() {
    var texto = ''

    if (this.elementosIterables.length === 0) {
      texto = 'No se encontraron elementos accesibles'
    } else if (this.elementosIterables.length > this.maximoElementos) {
      texto = `${this.elementosIterables.length} resultados encontrados en el área de búsqueda. Presione la tecla más (+) para acercar y reducir la cantidad de resultados`
    } else {
      const pagina = this.elementosIterables.slice(
        this.paginaActual * this.elementosPagina,
        (this.paginaActual + 1) * this.elementosPagina
      )

      texto =
        `${this.elementosIterables.length} elementos accesibles, presiona las teclas numéricas para ver desatlles: <br />` +
        `${pagina.map((f, i) => `<b>${i + 1}</b>: ${f.titulo}`).join(';\t')}` +
        `${
          this.paginaActual > 0 ? ';\t<b>8</b>: Ver resultados anteriores' : ''
        }` +
        `${
          this.paginaActual <
          Math.floor(this.elementosIterables.length / this.elementosPagina)
            ? ';\t<b>9</b>: Ver más resultados'
            : ''
        }`
    }

    this.div.innerHTML = `<p>${texto}</p>`
  }

  actalizarElementosIterables(mapa) {
    const extent = mapa.getView().calculateExtent()

    this.elementosIterables = mapa
      .getAllLayers()
      .filter(
        // Verifica si la capa es una capa vectorial (puedes personalizar esto según tus necesidades)
        capa =>
          Boolean(
            (capa instanceof VectorLayer || capa instanceof VectorImageLayer) &&
              capa.get('globoInfo')
          )
      )
      .map(capa => {
        var nombreAccesible = capa.get('nombreAccesible')

        const conicidentes = capa
          .getSource()
          .getFeatures()
          .filter(feature =>
            // filtra los que están dentro de la vista
            olExtent.intersects(extent, feature.getGeometry().getExtent())
          )
          // esta validación posiblemente se quite
          .filter(feature => feature.getGeometry() instanceof Point)
          .map((feature, i) => {
            if (i === 0) {
              nombreAccesible = this.validarNombreAccesible(
                nombreAccesible,
                capa.getSource().getFeatures()[0]
              )
            }

            return {
              // titulo para el cuadro de asignación numérica
              titulo: feature.get(nombreAccesible),
              // pixel para el globo de información
              pixel: mapa.getPixelFromCoordinate(
                feature.getGeometry().getCoordinates()
              ),
            }
          })

        return conicidentes
      })
      .flat()
  }

  validarNombreAccesible(nombreAccesible, feature) {
    if (nombreAccesible) {
      if (feature.getKeys().includes(nombreAccesible)) {
        return nombreAccesible
      }

      console.warn(
        `${nombreAccesible} no fue encontrada en los atributos de la capa, se usará otro nombre.`
      )
    }

    return feature.getKeys().filter(k => k !== 'geometry')[0]
  }

  __teclado(mapa) {
    const extent = mapa.getView().calculateExtent()

    // console.log(
    //   extent,
    //   olExtent.getBottomLeft(extent), // x1, y1
    //   olExtent.getTopLeft(extent),
    //   olExtent.getTopRight(extent), // x2, y2
    //   olExtent.getBottomRight(extent)
    // )

    // Itera a través de todas las capas en tu mapa
    mapa
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
            return {
              titulo: feature.get('nom_edo'),
              pixel: mapa.getPixelFromCoordinate(
                feature.getGeometry().getCoordinates()
              ),
            }
          })
      )
      .flat()
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
