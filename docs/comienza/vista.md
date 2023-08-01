<script setup>
import EjemploVista from "./../.vitepress/components/vista.vue";
</script>

# Propiedad `vista`

Los atributos de la vista del mapa manipulan el espacio interactivo visible del mismo. Con estas propiedades se puede definir la posicion inicial de la vista o los cambios que puede tener.

## Atributos

#### `centro`

Coordenadas `[x, y]` del centro inicial de la vista.

- Tipo: `Array<Number>|String`
- Valor por defecto: `[0, 0]`
- Admite: `[N, N]`, `['N', 'N']` o `'N,N'`
- Interactivo: ✅

> ℹ️ **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.

> ⚠️ **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.

#### `extension`

Coordenadas extremas `[x1, y1, x2, y2]` de la caja envolvente de la vista.

- Tipo: `Array<Number>`
- Valor por defecto: `undefined`
- Admite: `[N,N,N,N]`, `['N','N','N','N']` o `'N,N,N,N'`
- Interactivo: ✅

> ℹ️ **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.

> ⚠️ **Importante:** Debe tener en cuenta que si esta propiedad es definida o diferente al valor por defecto, las propiedades `centro` y `zoom` serán ignoradas.

#### `extensionMargen`

Margen (en píxeles) que se agregará a la `extensión` de la vista. Los valores en la matriz son margen superior, derecho, inferior e izquierdo.

- Tipo: `Array<Number>|String`
- Valor por defecto: `[10, 10, 10, 10]`
- Admite: `N`, `[N,N,N,N]`, `['N','N','N','N']` o `'N,N,N,N'`
- Interactivo: ❌

> ℹ️ **Información:** Puede prescindir de algunos elementos de la matriz siguiendo la estructura: [todo], [vertical,horizontal], [arriba,horizontal,abajo] o [arriba, derecha, abajo, izquierda].

#### `zoom`

Nivel de zoom utilizado para calcular la resolución inicial de la vista.

- Tipo: `Number`
- Valor por defecto: `1`
- Interactivo: ✅

> ⚠️ **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.

## Funciones

A continuación se describen las funciones que pueden modificar el estado de la vista en el mapa.

#### `ajustarVista()`

Ajusta la vista del mapa a los valores definidos en la propiedad vista.

## Eventos

A continuación se describen los eventos que desencadena el mapa relacionados con los cambios de la vista.

#### `@alCambiarCentro`

Ejecutado cuando se detecta que el centro de la vista del mapa ha cambiado.

**Parámetros:**

- `Array`: Nuevo valor del centro.

#### `@alCambiarZoom`

Ejecutado cuando se detecta que el zoom de la vista del mapa ha cambiado.

**Parámetros:**

- `Number`: Nuevo valor de zoom.

## Ejemplo

<EjemploVista />

<<< @/.vitepress/components/vista.vue
