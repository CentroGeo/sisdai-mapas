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

**Uso:**

```html
<!-- centro de la República Mexicana -->
<SisdaiMapa :vista="{ centro: [-102, 24], ... }"> ... </SisdaiMapa>
```

#### `extension`

Coordenadas extremas `[x1, y1, x2, y2]` de la caja envolvente de la vista.

- Tipo: `Array<Number>`
- Valor por defecto: `undefined`
- Admite: `[N,N,N,N]`, `['N','N','N','N']` o `'N,N,N,N'`
- Interactivo: ✅

> ℹ️ **Información:** La proyección de estas coordenadas deben coincidir con la `proyeccion` definida en el mapa.

> ⚠️ **Importante:** Debe tener en cuenta que si esta propiedad es definida o diferente al valor por defecto, las propiedades `centro` y `zoom` serán ignoradas.

**Uso:**

```html
<!-- extensión de la República Mexicana -->
<SisdaiMapa
  :vista="{ extension: [-118.3651, 14.5321, -86.7104, 32.7187], ... }"
>
  ...
</SisdaiMapa>
```

#### `extensionMargen`

Margen (en píxeles) que se agregará a la `extensión` de la vista. Los valores en la matriz son margen superior, derecho, inferior e izquierdo.

- Tipo: `Array<Number>|String`
- Valor por defecto: `[10, 10, 10, 10]`
- Admite: `N`, `[N,N,N,N]`, `['N','N','N','N']` o `'N,N,N,N'`
- Interactivo: ❌

> ℹ️ **Información:** Puede prescindir de algunos elementos de la matriz siguiendo la estructura: [todo], [vertical,horizontal], [arriba,horizontal,abajo] o [arriba, derecha, abajo, izquierda].

**Uso:**

```html
<SisdaiMapa :vista="{ extensionMargen: [15, 15, 15, 15], ... }">
  ...
</SisdaiMapa>
```

#### `zoom`

Nivel de zoom utilizado para calcular la resolución inicial de la vista.

- Tipo: `Number`
- Valor por defecto: `1.5`
- Interactivo: ✅

> ⚠️ **Importante:** Debe tener en cuenta que si la propiedad `extension` se define, esta propiedad será ignorada.

**Uso:**

```html
<!-- zoom de la República Mexicana -->
<SisdaiMapa :vista="{ zoom: 4.4, ... }"> ... </SisdaiMapa>
```

## Funciones

A continuación se describen las funciones que pueden modificar el estado de la vista en el mapa.

#### `ajustarVista()`

Ajusta la vista del mapa a los valores definidos en la propiedad vista.

**Uso:**

```js
import { ref } from 'vue'
const mapa = ref()
```

```html
<SisdaiMapa ref="mapa"> ... </SisdaiMapa>

<button @click="mapa.ajustarVista()">Ajustar vista con boton externo</button>
```

## Eventos

A continuación se describen los eventos que desencadena el mapa relacionados con los cambios de la vista.

#### `@alAjustarVista`

Ejecutado cuado se detecta que se ha ajustado la vista del mapa a los valores iniciales de la propiedad vista mediante el control AjustarVista.

**Parámetros:**

- `Object`: Nuevo valor de la vista de OpenLayers.

**Uso:**

```html
<SisdaiMapa @alMoverVista="(objetoOlVista) => `ejecutar una funcion`">
  ...
</SisdaiMapa>
```

#### `@alCambiarCentro`

Ejecutado cuando se detecta que el centro de la vista del mapa ha cambiado.

**Parámetros:**

- `Array`: Nuevo valor del centro.

**Uso:**

```html
<SisdaiMapa @alCambiarCentro="(nuevoCentro) => `ejecutar una funcion`">
  ...
</SisdaiMapa>
```

#### `@alCambiarZoom`

Ejecutado cuando se detecta que el zoom de la vista del mapa ha cambiado.

**Parámetros:**

- `Number`: Nuevo valor de zoom.

**Uso:**

```html
<SisdaiMapa @alCambiarZoom="(nuevoZoom) => `ejecutar una funcion`">
  ...
</SisdaiMapa>
```

#### `@alMoverVista`

Ejecutado cuando se detecta que la vista del mapa ha cambiado.

**Parámetros:**

- `Object`: Nuevo valor de la vista de OpenLayers.

**Uso:**

```html
<SisdaiMapa @alMoverVista="(objetoOlVista) => `ejecutar una funcion`">
  ...
</SisdaiMapa>
```

## Ejemplo

<EjemploVista />

<<< @/.vitepress/components/vista.vue
