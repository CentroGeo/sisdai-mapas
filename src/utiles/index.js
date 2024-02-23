// This file is part of sisdai-mapas.
//
//   sisdai-mapas is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Lesser General Public License as published by the
//   Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//   sisdai-mapas is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
//   Public License for more details.
//
//   You should have received a copy of the GNU Lesser General Public License along
//   with sisdai-mapas. If not, see <https://www.gnu.org/licenses/>.


/**
 * @module utiles/index
 */

import ImageLayer from 'ol/layer/Image'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorImageLayer from 'ol/layer/VectorImage'
import { tipoGeometria, tiposCapa } from '../valores/capa'
import { vista } from './../valores/mapa'

/**
 * Devuelve una cadena de texto aleatoreo.
 * @returns {String}
 */
export function idAleatorio() {
  return Math.random().toString(36).substring(2)
}

/**
 * Busca el atributo `sisdai-{tipo}` en los elemntos padre del html de un componente y deviuelve
 * su valor.
 * @param {String} tipo puede ser contenedor de grafica, mapa o algun derivado de los mismos.
 * @param {HTMLElement} html de cualquier elemento.
 * @returns {String} valor del atrubutos sisdai-contenedor.
 */
export function buscarIdContenedorHtmlSisdai(tipo, { parentElement }) {
  // console.log('buscarIdContenedorHtmlSisdai', parentElement)
  const atributo = `sisdai-${tipo}`

  if (parentElement.getAttribute(atributo) !== null) {
    // console.log('es sisdai-contenedor')
    return parentElement.getAttribute(atributo)
  }

  if (parentElement.parentElement !== null) {
    // console.log('buscar un nivel abajo', parentElement.parentElement)
    return buscarIdContenedorHtmlSisdai(tipo, parentElement)
  } else {
    // console.log('ya no hay más hijos')
    // eslint-disable-next-line
    console.warn(`No se encontro el contenedor con el atributo: ${atributo}`)
  }
}

/**
 * Ejecuta los metodos de un array en un objeto.
 * @param {Object} obj
 * @param {Function} funcion
 * @param {String} metodo map | filter | find | some | every | etc
 * @returns {Object}
 */
export function ejecutarMetodoArrayEnObjeto(obj, funcion, metodo = 'map') {
  return Object.fromEntries(Object.entries(obj)[metodo](funcion))
}

/**
 * Valida si un valor es de tipo número.
 * @param {any} valor a evaluar
 * @returns {Boolean} `ture` en caso de ser número.
 */
export function esNuemro(valor) {
  return typeof valor === typeof Number()
}

/**
 * Valida si un valor es de tipo Objeto.
 * @param {any} valor a evaluar
 * @returns {Boolean} `ture` en caso de ser objeto.
 */
export function esObjeto(valor) {
  return (
    typeof valor === typeof Object() && valor !== null && !Array.isArray(valor)
  )
}

/**
 * Valida si un valor es de tipo texto.
 * @param {any} valor a evaluar
 * @returns {Boolean} `ture` en caso de ser texto.
 */
export function esTexto(valor) {
  return typeof valor === typeof String()
}

/**
 * Devuelve una petición fetch con promesa de un JSON si la respuesta http es correcta, en caso
 * contrario devolverá el objetoEsperado que se esperaba de la respuesta.
 * @param {String} url
 * @param {Object|Array} objetoEsperado
 * @returns {Promise}
 */
export async function fetchJSON(url, objetoEsperado = {}) {
  const response = await fetch(url)

  if (response.ok) {
    return response.json()
  }

  // eslint-disable-next-line
  console.error(`no se pudieron cargar los datos de: ${url}`)
  return objetoEsperado
}

/**
 * Devuelve una petición fetch con promesa de un JSON si la respuesta http es correcta, en caso
 * contrario devolverá el objetoEsperado que se esperaba de la respuesta.
 * @param {String} parametros
 * @param {Object|Array} objetoEsperado
 * @returns
 */
export async function consultarJSON(parametros, objetoEsperado = {}) {
  try {
    const r = await fetch(parametros)

    if (r.ok) {
      return r.json()
    }

    return {
      error: `No se pudieron cargar los datos de: ${parametros}`,
      resultado: objetoEsperado,
    }
  } catch (e) {
    return { error: e.message, resultado: objetoEsperado }
  }
}

/**
 * Devuelve un objeto en texto con sintaxis de reglas css.
 * @param {Object} obj
 * @returns {String}
 */
export function objEnSintaxisCss(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `${k}:${v};`)
    .join('')
}

/**
 * Compara si dos objetos son iguales utilisando la función `stringify` de la clase `JSON`.
 * @param {Object} a
 * @param {Object} b
 * @returns {Boolean}
 */
export function stringifyIguales(a, b) {
  return JSON.stringify(a) !== JSON.stringify(b)
}

/**
 * Convierte un  valor a un arreglo de valores numericos. Si llega un número, devuelve ese valor
 * dentro de un array de tamaño 1, si el valor es una cadena lo separa por comas y evalua cada
 * elemnto como número. En caso de no poder generar el arreglo numérico no devolverá algún valor.
 * @param {any} valor a evaluar.
 * @returns {Array<Number>|undefined}
 */
export function valorarArregloNumerico(valor) {
  if (esNuemro(valor)) return [valor]

  const arreglo = esTexto(valor) ? valor.split(',') : valor

  if (Array.isArray(arreglo)) return arreglo.map(n => Number(n))

  console.warn(`${valor} NO SE PUEDE VALORAR COMO ARREGLO NUMÉRICO`)
}

/**
 * Estructura los valores de forma adecueda para el margen de la extención (como lo necesita la
 * opción padding del fit de la vista del mapa). Los valores pueden llegar en los ordenes:
 * - [todo]
 * - [vertical, horizontal]
 * - [arriba, horizontal, abajo]
 * - [arriba, derecha, abajo, izquierda]
 * @see https://openlayers.org/en/latest/apidoc/module-ol_View-View.html#fit
 *
 * @param {Array|String|Number} valor a evaluar.
 * @returns {Array<Number>} extensionMargen válido: [arriba, derecha, abajo, izquierda].
 */
export function valorarExtensionMargen(valor) {
  const arreglo = valor !== undefined ? valorarArregloNumerico(valor) : []

  // tipos admitidos para extensionMargen: [all], [y,x], [top, x, bottom], [top, left, bottom, right]
  if (arreglo.length === 1) {
    return [arreglo[0], arreglo[0], arreglo[0], arreglo[0]]
  }

  if (arreglo.length === 2) {
    return [arreglo[0], arreglo[1], arreglo[0], arreglo[1]]
  }

  if (arreglo.length === 3) {
    return [arreglo[0], arreglo[1], arreglo[2], arreglo[1]]
  }

  if (arreglo.length >= 4) {
    return arreglo
  }

  return vista.extensionMargen
}

/**
 * @param {String} valor
 * @returns
 */
export function valorarTipoGeometriaTexo(valor) {
  const diccionario = {
    Polygon: tipoGeometria.poligono,
    Line: tipoGeometria.linea,
    Point: tipoGeometria.punto,
  }

  return diccionario[valor]
}

/**
 *
 * @param {import("ol/layer/Layer").default} capa
 * @returns {String|undefined}
 */
export function valorarTipoCapa(capa) {
  if (capa instanceof VectorLayer || capa instanceof VectorImageLayer) {
    return tiposCapa.vectorial
  }

  if (capa instanceof ImageLayer) {
    return tiposCapa.wms
  }

  if (capa instanceof TileLayer) {
    return tiposCapa.xyz
  }
}

// * * * * * * * * * * * * * * * * * * //

/** D E P R E C A D O -> buscarIdContenedorHtmlSisdai
 * getCurrentInstance
 * @param {*} param0
 * @returns
 */
export function buscarIdContenedorSisdaiMapa({ parent }) {
  // console.log('buscarIdContenedorSisdaiMapa', parent)

  if (parent.type.__name === 'SisdaiMapa') {
    // console.log('es SisdaiMapas')
    return parent.props.id
  }

  if (parent.parent) {
    // console.log('buscar un nivel abajo', parent.parent)
    return buscarIdContenedorSisdaiMapa(parent)
  } else {
    // console.log('ya no hay más hijos')
    // eslint-disable-next-line
    console.warn(`No se encontro el mapa para agregar la capa ${props.id}`)
  }
}
/** D E P R E C A D O -> (import("clases/Mapa").default).buscarCapa
 *
 * @param {import("ol/Map").default} mapa
 * @param {String} idCapa
 * @returns
 */
export function buscarCapaEnMapa(mapa, idCapa) {
  return mapa.getAllLayers().find(capa => capa.get('id') === idCapa)
}
/** D E P R E C A D O -> valorarArregloNumerico
 *
 * @param {String} texto
 * @returns {Array}
 */
export function numerosTextoComoArreglo(texto) {
  return texto.split(',').map(n => Number(n))
}
