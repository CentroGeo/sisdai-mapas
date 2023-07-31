/**
 *
 */

export const vista = {
  /**
   * - Tipo: `Array`
   * - Valor por defecto: `[0, 0]`
   * - Interactivo: ✅
   *
   * Coordenadas `[x, y]` del centro inicial de la vista.
   *
   * > ℹ️ **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.
   *
   * > ⚠️ **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.
   */
  centro: [0, 0],

  /**
   * - Tipo: `Array`
   * - Valor por defecto: `undefined`
   * - Interactivo: ✅
   *
   * Coordenadas extremas `[x1, y1, x2, y2]` de la caja envolvente de la vista.
   *
   * > ℹ️ **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.
   *
   * > ⚠️ **Importante:** Debe tener en cuenta que si esta propiedad es definida o diferente al valor por defecto, las propiedades `centro` y `zoom` serán ignoradas.
   */
  extension: undefined,

  /**
   *
   */
  margenExtension: [],

  /**
   * - Tipo: `Number`
   * - Valor por defecto: `1`
   * - Interactivo: ✅
   *
   * Nivel de zoom utilizado para calcular la resolución inicial de la vista.
   *
   * > ⚠️ **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.
   */
  zoom: 1.5,
}

/**
 * - Tipo: `String`
 * - Valor por defecto: `EPSG:4326`
 * - Interactivo: ❌
 *
 * Código de identificación SRS que define la proyección de la vista.
 *
 * > ℹ️ **Información:** El valor predeterminado es Universal Transversal de Mercator.
 */
export const proyeccion = 'EPSG:4326'
