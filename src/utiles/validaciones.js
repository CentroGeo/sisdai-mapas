import { esNuemro, valorarArregloNumerico } from '@/utiles'

export function extension(esto) {
  if (esto === undefined) return false

  // tipos admitidos para extension: [N,N,N,N], ['N','N','N','N'], o 'N,N,N,N'
  const estoComoArreglo = valorarArregloNumerico(esto)

  if (
    !Array.isArray(estoComoArreglo) ||
    estoComoArreglo.includes(NaN) ||
    estoComoArreglo.includes(null)
  ) {
    // eslint-disable-next-line
    console.error(
      'LA PROPIEDAD "extension" DE LA VISTA DEL MAPA NO ES VALIDA, SE ESPERABA: [Number, Number, Number, Number]'
    )
    return false
  }

  return true
}

export function margenExtension(esto) {
  // tipos admitidos para margenExtension: N, [N, N, N, N], ['N', 'N', 'N', 'N'], o 'N,N,N,N'
  if (esNuemro(esto)) return true

  // tipos admitidos para margenExtension: [all], [y,x], [top, x, bottom], [top, left, bottom, right]
  const estoComoArreglo = valorarArregloNumerico(esto)

  if (
    !Array.isArray(estoComoArreglo) ||
    estoComoArreglo.includes(NaN) ||
    estoComoArreglo.includes(null)
  ) {
    // eslint-disable-next-line
    console.error(
      'LA PROPIEDAD "margenExtension" DE LA VISTA DEL MAPA NO ES VALIDA, SE ESPERABA: [Number, Number, Number, Number]'
    )
    return false
  }

  return true
}
