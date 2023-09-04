/**
 * @module composables/usarCapaVectorial
 */

import VectorEventType from 'ol/source/VectorEventType'
import GeoJSON from 'ol/format/GeoJSON'
import { scaleQuantile, scaleLinear } from 'd3'
import ss from './../utiles/_cortes_naturales'
import tiposEstatusCarga from './../defaults/estatusCarga'
import { crearEstiloOl } from './casificacion/json2estiloOl'
import estiloCapaPorDefecto from './../defaults/estiloCapa'
import usarCapa, { props as propsCapa, emits as emitsCapa } from './usarCapa'
import { toRefs, watch } from 'vue'

export const props = {
  /**
   * Fuente de datos de una capa GeoJSON
   */
  url: {
    type: String,
    default: '',
  },

  /**
   * Objetos que se convertiran en feature, dependera del tipo de capa la estructura que estos
   * deben tener (si esta definido, url se ignora )
   */
  datos: {
    type: [Array, Object],
    default: undefined,
  },

  /**
   *
   */
  clasificacion: {
    type: [Object, Array],
    default: () => undefined,
    validator: valor => {
      if (!(typeof valor === typeof {}) || valor === null) {
        // eslint-disable-next-line
        console.error(
          'Es necesario un objeto o un arreglo de objetos para realizar la clasificación de la capa'
        )
        return false
      }
      return true
    },
  },

  /**
   *
   */
  estilo: {
    type: Object,
    default: () => estiloCapaPorDefecto,
  },

  /**
   * Contenido del globo de información que aparecerá al pasar el cursor sobre la capa (hover).
   * Puede ser una funcion que accede a las propiedades del `feature` o un texto estatico.
   */
  globoInformativo: {
    type: [String, Function],
    default: undefined,
  },

  ...propsCapa,
}

export const emits = [...emitsCapa]

export default function usarCapaVectorial(propsParam, emitsParam) {
  let featuresTodos = '[]'

  const {
    estatusCarga,
    registrar: registrarCapa,
    vincular,
  } = usarCapa(propsParam, emitsParam)

  const { estilo, clasificacion, globoInformativo } = toRefs(propsParam)

  /**
   * Agrega los porps al objeto y propiedades de la capa.
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function asignarPorps(olCapa) {
    olCapa.set('estilo', JSON.stringify(estilo.value))
    olCapa.set('globoInfo', globoInformativo.value)
  }

  /**
   *
   * @param {*} olCapa
   */
  function agregarEmitsCarga(olCapa) {
    olCapa.getSource().on(VectorEventType.FEATURESLOADSTART, ({ target }) => {
      emitsParam('alIniciarCarga')
      estatusCarga.value = tiposEstatusCarga.ini

      // si los datos no son cargados mediante url, los datos yas se tienen al alcance.
      if (target.getUrl() === undefined) {
        emitsParam('alFinalizarCarga', true)
        estatusCarga.value = tiposEstatusCarga.fin
      }
    })
    olCapa.getSource().on(
      // Estos eventos solo se desencadenan cuando los datos son cargados por una url.
      [VectorEventType.FEATURESLOADEND, VectorEventType.FEATURESLOADERROR],
      ({ type }) => {
        emitsParam('alFinalizarCarga', type === VectorEventType.FEATURESLOADEND)
      }
    )
  }

  /**
   *
   * @param {*} olCapa
   */
  function asignarEstilo(olCapa) {
    olCapa.setStyle(crearEstiloOl(estilo.value))
  }

  function conseguirDatosParaClasificar() {
    return JSON.parse(featuresTodos).map(
      feature => feature.properties[clasificacion.value.columna]
    )
  }

  /**
   *
   * @returns
   */
  function conseguirClases() {
    const clases = {}

    switch (clasificacion.value.tipo) {
      case 'categorias': {
        const unicos = [...new Set(conseguirDatosParaClasificar())]

        clasificacion.value.colores.forEach((color, idx) => {
          clases[color] = unicos[idx]
        })

        return clases
      }

      case 'cuantiles': {
        const cuantiles = scaleQuantile()
          .domain(conseguirDatosParaClasificar())
          .range(clasificacion.value.colores)

        clasificacion.value.colores.forEach(color => {
          clases[color] = cuantiles.invertExtent(color)
        })

        return clases
      }

      case 'linear': {
        const datosParaClasificar = conseguirDatosParaClasificar()

        let linear = scaleLinear()
          .domain([
            Math.min(...datosParaClasificar),
            Math.max(...datosParaClasificar),
          ])
          .range([0, clasificacion.value.colores.length])

        clasificacion.value.colores.forEach((color, idx) => {
          clases[color] = [linear.invert(idx), linear.invert(idx + 1)]
        })

        return clases
      }

      case 'cortes-naturales': {
        const cortes = ss.jenks(
          conseguirDatosParaClasificar(),
          clasificacion.value.colores.length
        )

        clasificacion.value.colores.forEach((color, idx) => {
          clases[color] = [cortes[idx], cortes[idx + 1]]
        })

        return clases
      }

      case 'personalidada': {
        clasificacion.value.colores.forEach((color, idx) => {
          clases[color] = clasificacion.value.clasificacionPersonalizada[idx]
        })

        return clases
      }
    }

    return clases
  }

  function estiloPorClase(color) {
    let _estilo = { ...estilo.value }

    if (clasificacion.value.colores) {
      _estilo[clasificacion.value.propiedadEstilo] = {
        ..._estilo[clasificacion.value.propiedadEstilo],
        color: color,
      }
    }

    return _estilo
  }

  function conseguirEstilosClases() {
    const estilosClases = []
    const clases = conseguirClases()

    for (const color in clases) {
      if (Object.hasOwnProperty.call(clases, color)) {
        estilosClases.push({
          clase: String(clases[color]),
          etiqueta: Array.isArray(clases[color])
            ? `${Math.round(clases[color][0])} a ${Math.round(
                clases[color][1]
              )}`
            : String(clases[color]),
          regla: clases[color],
          estilo: estiloPorClase(color),
          cantidad: 0,
          // orden: idx,
        })
      }
    }

    return estilosClases
  }

  function asignarClasificacion(olCapa, estilosCalses) {
    const estilosCalsesOl = estilosCalses.map(clase => ({
      estilo: crearEstiloOl(clase.estilo),
      rango: clase.regla,
    }))

    function reglaEstilo(feature) {
      if (clasificacion.value.tipo === 'categorias') {
        feature.setStyle(
          estilosCalsesOl.find(
            clase => clase.rango === feature.get(clasificacion.value.columna)
          ).estilo
        )
      } else {
        // temp0.find(v=>x > v.rango[0] && x <= v.rango[1])
        feature.setStyle(
          estilosCalsesOl.find(
            clase =>
              feature.get(clasificacion.value.columna) >= clase.rango[0] &&
              feature.get(clasificacion.value.columna) <= clase.rango[1]
          ).estilo
        )
      }
    }

    olCapa.getSource().getFeatures().forEach(reglaEstilo)
  }

  /**
   *
   * @param {*} olCapa
   */
  function registrar(olCapa) {
    asignarPorps(olCapa)
    agregarEmitsCarga(olCapa)
    registrarCapa(olCapa)

    const { cambiarEstilo } = vincular()

    if (clasificacion.value !== undefined) {
      // console.log('clasificar')
      featuresTodos = JSON.stringify(
        new GeoJSON().writeFeaturesObject(olCapa.getSource().getFeatures())
          .features
      )

      const estilosCalses = conseguirEstilosClases(
        conseguirClases(clasificacion.value)
      )
      cambiarEstilo(estilosCalses, capa =>
        asignarClasificacion(capa, estilosCalses)
      )
    } else {
      cambiarEstilo(estilo.value, asignarEstilo)
    }

    watch(estilo, nuevoEstilo => cambiarEstilo(nuevoEstilo, asignarEstilo))
    watch(clasificacion, nuevaClasificacion => {
      const estilosCalses = conseguirEstilosClases(
        conseguirClases(nuevaClasificacion)
      )
      cambiarEstilo(estilosCalses, capa =>
        asignarClasificacion(capa, estilosCalses)
      )
    })
  }

  return {
    registrar,
  }
}
