# Propiedad `vista`

Los atributos de la vista del mapa manipulan el espacio interactivo visible del
mismo. Con estas propiedades se puede definir la posicion inicial de la vista o
los cambios que puede tener.

## Vista general

<VisorCodigo archivo="ConfiguracionVista.vue" />

## Atributos

### `acercamiento`

Nivel de acercamiento utilizado para calcular la resolución inicial de la vista.

- Tipo: `Number`
- Valor por defecto: `1.5`
- Reactivo: si

<div class="nota-contenedor">
  <p class="nota-titulo">Importante:</p>
  <p class="nota">
    Debe tener en cuenta que si la propiedad <code>extension</code> se define, esta propiedad será ignorada.
  </p>
</div>

**Uso:**

```vue
<!-- acercamiento de la República Mexicana -->
<SisdaiMapa :vista="{ acercamiento: 4.4, ... }">...</SisdaiMapa>
```

### `centro`

Coordenadas `[x, y]` del centro inicial de la vista.

- Tipo: `Array<Number>|String`
- Valor por defecto: `[0, 0]`
- Admite: `[N, N]`, `['N', 'N']` o `'N,N'`
- Reactivo: si

<div class="nota-contenedor m-b-2">
  <p class="nota-titulo">Información:</p>
  <p class="nota">
    La proyección de estas coordenadas deben coincidir con la <code>proyeccion</code> definida en el mapa.
  </p>
</div>

<div class="nota-contenedor">
  <p class="nota-titulo">Importante:</p>
  <p class="nota">
    Debe tener en cuenta que si la propiedad <code>extension</code> se define, esta propiedad será ignorada.
  </p>
</div>

**Uso:**

```vue
<!-- centro de la República Mexicana -->
<SisdaiMapa :vista="{ centro: [-102, 24], ... }">...</SisdaiMapa>
```

### `extension`

Coordenadas extremas `[x1, y1, x2, y2]` de la caja envolvente de la vista.

- Tipo: `Array<Number>`
- Valor por defecto: `undefined`
- Admite: `[N,N,N,N]`, `['N','N','N','N']` o `'N,N,N,N'`
- Reactivo: si

<div class="nota-contenedor m-b-2">
  <p class="nota-titulo">Información:</p>
  <p class="nota">
    La proyección de estas coordenadas deben coincidir con la <code>proyeccion</code> definida en el mapa.
  </p>
</div>

<div class="nota-contenedor">
  <p class="nota-titulo">Importante:</p>
  <p class="nota">
    Debe tener en cuenta que si esta propiedad es definida o diferente al valor por defecto, las propiedades <code>centro</code> y <code>acercamiento</code> serán ignoradas.
  </p>
</div>

**Uso:**

```vue
<!-- extensión de la República Mexicana -->
<SisdaiMapa
  :vista="{ extension: [-118.3651, 14.5321, -86.7104, 32.7187], ... }"
> ... </SisdaiMapa>
```

### `extensionMargen`

Margen (en píxeles) que se agregará a la `extensión` de la vista. Los valores en
la matriz son margen superior, derecho, inferior e izquierdo.

- Tipo: `Array<Number>|String`
- Valor por defecto: `[10, 10, 10, 10]`
- Admite: `N`, `[N,N,N,N]`, `['N','N','N','N']` o `'N,N,N,N'`
- Reactivo: no

<div class="nota-contenedor">
  <p class="nota-titulo">Información:</p>
  <p class="nota">
    Puede prescindir de algunos elementos de la matriz siguiendo la estructura: [todo], [vertical,horizontal], [arriba,horizontal,abajo] o [arriba, derecha, abajo, izquierda].
  </p>
</div>

**Uso:**

```vue
<SisdaiMapa :vista="{ extensionMargen: [15, 15, 15, 15], ... }">...</SisdaiMapa>
```

## Funciones

A continuación se describen las funciones que pueden modificar el estado de la
vista en el mapa.

### `ajustarVista()`

Ajusta la vista del mapa a valores que llegen como parametro con la estructura
de la propiedead vista (`{ acercamiento, centro, extension, extensionMargen }`),
si este parámetro no es definido, la vista se ajustará a los valores definidos
en el mapa al ejecutar esta función.

**Parámetros:**

- `Object`: Objeto con la estructura de la propiedead vista
  (`{ acercamiento, centro, extension, extensionMargen }`).

**Uso:**

```js
import { ref } from 'vue'
const mapa = ref()
```

```html
<SisdaiMapa ref="mapa">...</SisdaiMapa>

<button
  @click="mapa.ajustarVista({ extension: [-118.3651, 14.5321, -86.7104, 32.7187] })"
>
  Ajustar vista diferente a la definida en el mapa con boton externo
</button>

<button @click="mapa.ajustarVista()">
  Ajustar vista definida en el mapa con boton externo
</button>
```

<!-- ## Eventos

A continuación se describen los eventos que desencadena el mapa relacionados con
los cambios de la vista.

### `@alAjustarVista`

Ejecutado cuado se detecta que se ha ajustado la vista del mapa a los valores iniciales de la propiedad vista mediante el control AjustarVista.

**Parámetros:**

- `Object`: Nuevo valor de la vista de OpenLayers.

**Uso:**

```html
<SisdaiMapa @alMoverVista="(objetoOlVista) => `ejecutar una funcion`">
  ...
</SisdaiMapa>
``` -->
