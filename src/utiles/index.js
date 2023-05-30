/**
 * @module utiles/index
 */

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
 *
 * @param {any} esto
 * @returns {Boolean}
 */
export function esTexto(esto) {
  return typeof esto === typeof String()
}

/**
 *
 * @param {any} esto
 * @returns {Boolean}
 */
export function esNuemro(esto) {
  return typeof esto === typeof Number()
}

/**
 *
 * @param {String} esto
 * @returns {Array|undefined}
 */
export function valorarArregloNumerico(esto) {
  if (esNuemro(esto)) return [esto]

  const arreglo = esTexto(esto) ? esto.split(',') : esto

  if (Array.isArray(arreglo)) return arreglo.map(n => Number(n))

  console.warn(`${esto} NO SE PUEDE VALORAR COMO ARREGLO NUMÉRICO`)
}

/**
 *
 * @param {*} esto
 * @returns
 */
export function valorarMargenExtension(esto) {
  const arreglo = esto !== undefined ? valorarArregloNumerico(esto) : []

  // tipos admitidos para margenExtension: [all], [y,x], [top, x, bottom], [top, left, bottom, right]
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

  return [0, 0, 0, 0]
}

// * * * * * * * * * * * * * * * * * * //

/** D E P R E C A D O
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
/** D E P R E C A D O
 *
 * @param {import("ol/Map").default} mapa
 * @param {String} idCapa
 * @returns
 */
export function buscarCapaEnMapa(mapa, idCapa) {
  return mapa.getAllLayers().find(capa => capa.get('id') === idCapa)
}
/** D E P R E C A D O
 *
 * @param {String} texto
 * @returns {Array}
 */
export function numerosTextoComoArreglo(texto) {
  return texto.split(',').map(n => Number(n))
}
