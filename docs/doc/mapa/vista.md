# Vista

Las propiedades de la vista del mapa manipulan el espacio interactivo visible del mismo. Con estas propiedades se puede definir la posicion inicial de la vista o los cambios que puede tener.

## Uso

```html
<SisdaiMapa :vista="{}"></SisdaiMapa>
```

## Propiedades

#### `centro`

- Tipo: `Array`
- Valor por defecto: `[0, 0]`
- Interactivo: ✅

Coordenadas `[x, y]` del centro inicial de la vista.

> ℹ️ **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.

> ⚠️ **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.

#### `extension`

- Tipo: `Array`
- Valor por defecto: `[0, 0, 0, 0]`
- Interactivo: ✅

Coordenadas extremas `[x1, y1, x2, y2]` de la caja envolvente de la vista.

> ℹ️ **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.

> ⚠️ **Importante:** Debe tener en cuenta que si esta propiedad es definida o diferente al valor por defecto, las propiedades `centro` y `zoom` serán ignoradas.

#### `extensionPorCapasVisibles`

- Tipo: `Boolean`
- Valor por defecto: `false`
- Interactivo: ✅

Define si al presionar el botón que ajusta la vista, se aplicará el zoom a las capas visibles que tengan una extensión definida.

#### `proyeccion`

- Tipo: `String`
- Valor por defecto: `EPSG:4326`
- Interactivo: ❌

Código de identificación SRS que define la proyección de la vista.

> ℹ️ **Información:** El valor predeterminado es Universal Transversal de Mercator.

#### `zoom`

- Tipo: `Number`
- Valor por defecto: `1`
- Interactivo: ✅

Nivel de zoom utilizado para calcular la resolución inicial de la vista.

> ⚠️ **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.

## Funciones

A continuación se describen las funciones que pueden modificar el estado de la vista en el mapa.

#### `ajustarVista()`

Ajusta la vista del mapa a los valores definidos en la propiedad vista.

## Eventos

A continuación se describen los eventos que desencadena el mapa relacionados con los cambios de la vista.

#### `@alAjustarVista`

Ejecutado cuado se detecta que se ha ajustado la vista del mapa a los valores de la propiedad vista.

#### `@alCambiarZoom`

Ejecutado cuado se detecta que el zoom de la vista del mapa ha cambiado.

**Valores recibidos:**

- Nuevo valor de zoom: `Number`.

## Ejemplo

<mapa-Vista />
