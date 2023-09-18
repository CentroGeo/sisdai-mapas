import { esNuemro, valorarArregloNumerico } from './'

/**
 * Valida si un valor es arreglo, contiene un tamaño mínumo y no contiene nulos o NaN.
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

export function extension(valor) {
  if (valor === undefined) return false

  // tipos admitidos para extension: [N,N,N,N], ['N','N','N','N'], o 'N,N,N,N'
  return arregloSinVacios(
    valorarArregloNumerico(valor),
    'LA PROPIEDAD "extension" DE LA VISTA DEL MAPA NO ES VALIDA, SE ESPERABA: [Número, Número, Número, Número]',
    4
  )
}

export function extensionMargen(valor) {
  // tipos admitidos para extensionMargen: N, [N, N, N, N], ['N', 'N', 'N', 'N'], o 'N,N,N,N'
  if (esNuemro(valor)) return true

  // tipos admitidos para extensionMargen: [all], [y,x], [top, x, bottom], [top, left, bottom, right]
  return arregloSinVacios(
    valorarArregloNumerico(valor),
    'LA PROPIEDAD "extensionMargen" DE LA VISTA DEL MAPA NO ES VALIDA, SE ESPERABA: [Número, Número, Número, Número]'
  )
}

export function vista(valor) {
  if (extension(valor.extension)) {
    if (
      valor.extensionMargen !== undefined &&
      !extensionMargen(valor.extensionMargen)
    ) {
      return false
    }
    return true
  }

  if (!valor.zoom || !valor.centro) {
    // eslint-disable-next-line
    console.error(
      'LA PROPIEDAD ZOOM O CENTRO DE LA VISTA DEL MAPA NO HAN SIDO DEFINIDOS'
    )
    return false
  }

  const zoomValido = Number(valor.zoom)
  // tipos admitidos para zoom: N o "N"
  if (isNaN(zoomValido) || (zoomValido < 1 && zoomValido > 22)) {
    // eslint-disable-next-line
    console.error(
      'LA PROPIEDAD "zoom" DE LA VISTA DEL MAPA DEBE SER ENTRE 1 Y 22'
    )
    return false
  }

  // tipos admitidos para centro: [N, N], ['N', 'N'], o 'N,N'
  if (
    !arregloSinVacios(
      valorarArregloNumerico(valor.centro),
      'LA PROPIEDAD "centro" DE LA VISTA DEL MAPA NO ES VALIDA, SE ESPERABA: [Número, Número]',
      2
    )
  ) {
    return false
  }

  return true
}
