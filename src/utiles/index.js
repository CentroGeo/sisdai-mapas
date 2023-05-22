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
 *
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

/**
 * Busca el atributo `sisdai-mapa` en el elemnto padre del html de un componente.
 * @param {HTMLElement} html de cualquier elemento.
 * @returns {String} id del mapa contenedor.
 */
export function buscarIdContenedorHtmlSisdaiMapa({ parentElement }) {
  // console.log('buscarIdContenedorHtmlSisdaiMapa', parentElement)

  if (parentElement.getAttribute('sisdai-mapa') !== null) {
    // console.log('es SisdaiMapas')
    return parentElement.getAttribute('sisdai-mapa')
  }

  if (parentElement.parentElement !== null) {
    // console.log('buscar un nivel abajo', parentElement.parentElement)
    return buscarIdContenedorHtmlSisdaiMapa(parentElement)
  } else {
    // console.log('ya no hay más hijos')
    // eslint-disable-next-line
    console.warn(`No se encontro el mapa para agregar la capa`)
  }
}

/**
 *
 * @param {import("ol/Map").default} mapa
 * @param {String} idCapa
 * @returns
 */
export function buscarCapaEnMapa(mapa, idCapa) {
  return mapa.getAllLayers().find(capa => capa.get('id') === idCapa)
}
