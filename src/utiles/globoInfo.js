/**
 * Prosesa el contenido del globo, en caso de ser una función que accede a los features, se
 * ejecuta la función regresando el texto final
 * @param {any} contenido
 * @param {import("ol/Feature.js").default} feature
 * @returns {String}
 */
export function procesarContenido(contenido, feature) {
  return typeof contenido === 'function'
    ? `${contenido(feature.getProperties())}`
    : contenido
}

/**
 * Busca si hay contenido del globo de información en un pixel determinado del mapa.
 * @param {Array<Number>} pixel
 * @param {import("ol/Map.js").default} mapa
 * @param {String} atributo
 * @returns {String|undefined} Contenido del globo, si es `undefined` significa que no se
 * encontro contenido del tooltip.
 */
export function buscarContenidoCapaEnPixel(pixel, mapa, atributo) {
  return mapa.forEachFeatureAtPixel(pixel, (feature, capa) => {
    const contenido = capa.get(atributo)

    return contenido !== undefined
      ? procesarContenido(contenido, feature)
      : undefined
  })
}

/**
 * Calcula la posición que podría tomar el globo de información considerando el margen definido
 * en el globo así como la posición del pixel original en relación con el mapa:
 *
 * - Si la posición original está por debajo de la mitad del alto del mapa, la posición
 * calculada será considerada para mostrar el globo encima de la posicion original.
 * - Si la posición original está por encima de la mitad del alto del mapa, la posición
 * calculada será considerada para mostrar el globo debajo de la posicion original.
 * - Si la posición original está a la izquierda de la mitad del ancho del mapa, la posición
 * calculada será considerada para mostrar el globo a la derecha de la posicion original.
 * - Si la posición original está a la derecha de la mitad del ancho del mapa, la posición
 * calculada será considerada para mostrar el globo a la izquierda de la posicion original.
 *
 * @param {Array<Number>} coordenadas
 * @param {HTMLElement} contenedor
 * @param {Number} margen
 * @returns {Object}
 */
export function calcularPosicionInfo(coordenadas, contenedor, margen = 8) {
  var x = coordenadas[0],
    y = coordenadas[1]

  if (contenedor === undefined) return { x, y }

  x =
    x -
    (x > contenedor.parentElement.clientWidth / 2
      ? contenedor.clientWidth + margen
      : -margen)

  y =
    y -
    (y > contenedor.parentElement.clientHeight / 2
      ? contenedor.clientHeight + margen
      : -margen)

  return { x, y }
}
