import { esNuemro, valorarArregloNumerico } from './../../utiles'

/**
 * Valida si un valor es arreglo, contiene un tamaño mínimo y no contiene nulos o NaN.
 * @param {any} valor a evaluar.
 * @param {String} msgError Mensaje de error en caso de que el arreglo no sea valido.
 * @param {Number} tamanioMinimo tamaño mínimo que debe tener el arreglo.
 * @returns {Boolean} `ture` en caso de ser válido.
 */
export function arregloSinVacios(valor, msgError, tamanioMinimo = 0) {
  if (
    !Array.isArray(valor) ||
    valor.length < tamanioMinimo ||
    valor.includes(NaN) ||
    valor.includes(null) ||
    valor.includes(undefined)
  ) {
    // eslint-disable-next-line
    console.error(msgError)
    return false
  }

  return true
}

/**
 * Valida que la extensión de la vista del mapa sea asignada con el formato adecuado.
 * - Arreglo de cuatro posiciones: [N,N,N,N], ['N','N','N','N'], o 'N,N,N,N'.
 * @param {Array|String} valor extensión de la vista del mapa.
 * @returns {Boolean} `ture` en caso de ser válido.
 */
export function extension(valor) {
  if (valor === undefined) return false

  // tipos admitidos para `extension`: [N,N,N,N], ['N','N','N','N'], o 'N,N,N,N'
  return arregloSinVacios(
    valorarArregloNumerico(valor),
    'LA PROPIEDAD "extension" DE LA VISTA DEL MAPA NO ES VALIDA, SE ESPERABA: [Número, Número, Número, Número]',
    4
  )
}

/**
 * Valida que el margen de la extensión de la vista del mapa sea asignada con el formato adecuado.
 * - Arreglo de cuatro posiciones: [N,N,N,N], ['N','N','N','N'], o 'N,N,N,N'.
 * - También permite abreviar los valores con el formato:
 *    - N: [todo],
 *    - [N,N]: [vertical, horizontal],
 *    - [N,N,N]: [arriba, horizontal, abajo],
 *    - [N,N,N,N]: [arriba, izquierda, abajo, derecha]
 * @param {Array|String|Number} valor margen de la extensión de la vista del mapa.
 * @returns {Boolean} `ture` en caso de ser válido.
 */
export function extensionMargen(valor) {
  // tipos admitidos para extensionMargen: N, [N, N, N, N], ['N','N','N','N'], o 'N,N,N,N'
  if (esNuemro(valor)) return true

  // tipos admitidos para extensionMargen: [all], [y,x], [top, x, bottom], [top, left, bottom, right]
  return arregloSinVacios(
    valorarArregloNumerico(valor),
    'LA PROPIEDAD "extensionMargen" DE LA VISTA DEL MAPA NO ES VALIDA, SE ESPERABA: [Número, Número, Número, Número]'
  )
}

/**
 * Valida que el acercamiento de la vista del mapa sea asignada con el formato adecuado.
 * @param {Number|String} valor acercamiento de la vista del mapa.
 * @returns {Boolean} `ture` en caso de ser válido.
 */
export function acercamiento(valor) {
  // if (valor === undefined) return false

  // tipos admitidos para acercamiento: N o "N"
  const acercamientoNumerico = Number(valor)
  if (isNaN(acercamientoNumerico) || !(acercamientoNumerico >= 1 && acercamientoNumerico <= 22)) {
    // eslint-disable-next-line
    console.error('LA PROPIEDAD "acercamiento" DE LA VISTA DEL MAPA DEBE SER ENTRE 1 Y 22')
    return false
  }

  return true
}

/**
 * Valida que el centro de la vista del mapa sea asignado con el formato adecuado:
 * - Arreglo de dos posiciones: [N, N], ['N', 'N'], o 'N,N'.
 * @param {Array|String} valor centro de la vista del mapa.
 * @returns {Boolean} `ture` en caso de ser válido.
 */
export function centro(valor) {
  // if (valor === undefined) return false

  // tipos admitidos para centro: [N, N], ['N', 'N'], o 'N,N'
  return arregloSinVacios(
    valorarArregloNumerico(valor),
    'LA PROPIEDAD "centro" DE LA VISTA DEL MAPA NO ES VALIDA, SE ESPERABA: [Número, Número]',
    2
  )
}

/**
 * Validad que los atributos del objeto de la vista del mapa sean correctos.
 * @param {Object} valor objeto de la vista del mapa.
 * @returns {Boolean} `ture` en caso de ser válido.
 */
export function vista(valor) {
  if (extension(valor.extension)) {
    if (valor.extensionMargen !== undefined && !extensionMargen(valor.extensionMargen)) {
      return false
    }
    return true
  }

  // if (!valor.acercamiento || !valor.centro) {
  //   // eslint-disable-next-line
  //   console.error(
  //     'LA PROPIEDAD "acercamiento" O "centro" DE LA VISTA DEL MAPA NO HAN SIDO DEFINIDOS'
  //   )
  //   return false
  // }

  if (valor.acercamiento !== undefined) return acercamiento(valor.acercamiento)

  if (valor.centro !== undefined) return centro(valor.centro)

  return true
}
