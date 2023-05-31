import { esNuemro, valorarArregloNumerico } from '@/utiles'

export function extension(valor) {
  if (valor === undefined) return false

  // tipos admitidos para extension: [N,N,N,N], ['N','N','N','N'], o 'N,N,N,N'
  return arregloLleno(
    valorarArregloNumerico(valor),
    4,
    'LA PROPIEDAD "extension" DE LA VISTA DEL MAPA NO ES VALIDA, SE ESPERABA: [Número, Número, Número, Número]'
  )
}

export function margenExtension(valor) {
  // tipos admitidos para margenExtension: N, [N, N, N, N], ['N', 'N', 'N', 'N'], o 'N,N,N,N'
  if (esNuemro(valor)) return true

  // tipos admitidos para margenExtension: [all], [y,x], [top, x, bottom], [top, left, bottom, right]
  return arregloLleno(
    valorarArregloNumerico(valor),
    'LA PROPIEDAD "margenExtension" DE LA VISTA DEL MAPA NO ES VALIDA, SE ESPERABA: [Número, Número, Número, Número]'
  )
}

/**
 * Valida si un valor es arreglo, contiene un tamaño mínumo y no contiene nulos o NaN.
 * @param {any} valor a evaluar.
 * @param {Number} tamanioMinimo tamaño mínimo que debe tener el arreglo.
 * @param {String} msgError Mensaje de error en caso de que el arreglo no sea valido.
 * @returns {Boolean} `ture` en caso de ser válido.
 */
export function arregloLleno(valor, tamanioMinimo = 0, msgError) {
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
