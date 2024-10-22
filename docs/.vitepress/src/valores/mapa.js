/**
 *
 */

export const vista = {
  /**
   * Nivel de acercamiento utilizado para calcular la resolución inicial de la vista.
   *
   * - Tipo: `Number`
   * - Valor por defecto: `1`
   * - Reactivo: Si.
   *
   * >  **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.
   */
  acercamiento: 1.5,

  /**
   *
   */
  ajustarVistaAlCambiarParametros: true,

  /**
   * Coordenadas `[x, y]` del centro inicial de la vista.
   *
   * - Tipo: `Array<Number>|String`
   * - Valor por defecto: `[0, 0]`
   * - Admite: `[N, N]`, `['N', 'N']` o `'N,N'`
   * - Reactivo: Si.
   *
   * >  **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.
   *
   * >  **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.
   */
  centro: [0, 0],

  /**
   * Coordenadas extremas `[x1, y1, x2, y2]` de la caja envolvente de la vista.
   *
   * - Tipo: `Array<Number>`
   * - Valor por defecto: `undefined`
   * - Admite: `[N,N,N,N]`, `['N','N','N','N']` o `'N,N,N,N'`
   * - Reactivo: Si.
   *
   * >  **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.
   *
   * >  **Importante:** Debe tener en cuenta que si esta propiedad es definida o diferente al valor por defecto, las propiedades `centro` y `acercamiento` serán ignoradas.
   */
  extension: undefined,

  /**
   * Margen (en píxeles) que se agregará a la `extensión` de la vista. Los valores en la matriz son margen superior, derecho, inferior e izquierdo.
   *
   * - Tipo: `Array<Number>|String`
   * - Valor por defecto: `[10, 10, 10, 10]`
   * - Admite: `N`, `[N,N,N,N]`, `['N','N','N','N']` o `'N,N,N,N'`
   * - Reactivo: No.
   *
   * >  **Información:** Puede prescindir de algunos elementos de la matriz siguiendo la estructura: [todo], [vertical,horizontal], [arriba,horizontal,abajo] o [arriba, derecha, abajo, izquierda].
   */
  extensionMargen: 10
}

/**
 * Código de identificación SRS que define la proyección de la vista.
 *
 * - Tipo: `String`
 * - Valor por defecto: `EPSG:4326`
 * - Reactivo: No.
 *
 * >  **Información:** El valor predeterminado es Universal Transversal de Mercator.
 */
export const proyeccion = 'EPSG:4326'

/**
 * Claves para atajos en la navegación por teclado
 */
export const teclasAtajo = {
  IZQUIERDA: 'arrowleft',
  ARRIBA: 'arrowup',
  DERECHA: 'arrowright',
  ABAJO: 'arrowdown',
  INFORMACION: 'i',
  NORTE: 'n',
  ROTAR_IZQUIERDA: 'a',
  ROTAR_DERECHA: 'd',
  AJUSTAR: 'h',
  ESCAPAR: 'escape',
  LISTAR_ANTERIORES: '8',
  LISTAR_SIGUIENTES: '9',
  TABULADOR: 'tab'
}
