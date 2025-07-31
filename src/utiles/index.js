import { vista } from '../componentes/mapa/valores'

/**
 * Ejecuta los metodos de un array en un objeto.
 * @param {Object} obj
 * @param {Function} funcion
 * @param {String} metodo map | filter | find | some | every | etc.
 * @returns {Object}
 */
export function ejecutarMetodoArrayEnObjeto(obj, funcion, metodo = 'map') {
  return Object.fromEntries(Object.entries(obj)[metodo](funcion))
}

/**
 * Valida si un valor es de tipo función.
 * @param {any} valor a evaluar.
 * @returns `ture` en caso de ser función.
 */
export function esFuncion(valor) {
  return typeof valor === typeof Function
}

/**
 * Valida si un valor es de tipo número.
 * @param {any} valor a evaluar.
 * @returns {Boolean} `ture` en caso de ser número.
 */
export function esNuemro(valor) {
  return typeof valor === typeof Number()
}

/**
 * Valida si un valor es de tipo Objeto.
 * @param {any} valor a evaluar.
 * @returns {Boolean} `ture` en caso de ser objeto.
 */
export function esObjeto(valor) {
  return (
    typeof valor === typeof Object() && valor !== null && !Array.isArray(valor)
  )
}

/**
 * Valida si un valor es de tipo Promesa.
 * @param {any} valor a evaluar.
 * @returns {Boolean} `ture` en caso de ser Promesa.
 */
export function esPromesa(valor) {
  return (esObjeto(valor) && esFuncion(valor.then))
}

/**
 * Valida si un valor es de tipo texto.
 * @param {any} valor a evaluar.
 * @returns {Boolean} `ture` en caso de ser texto.
 */
export function esTexto(valor) {
  return typeof valor === typeof String()
}

/**
 * Devuelve una cadena de texto aleatoreo.
 * @returns {String}
 */
export function idAleatorio() {
  return Math.random().toString(36).substring(2)
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
