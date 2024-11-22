<script setup>
import EjemploConfiguracion from "/.vitepress/ejemplos/ConfiguracionBasica.vue";
</script>

# Configuración

El componente `SisdaiMapa` es el componente principal de esta librería. Dentro
de el se pueden agregar componentes de capas, leyendas y slots de paneles.

**Uso:**

```html
<SisdaiMapa>
  <!-- Aquí van las capas, leyendas y slots de paneles que quedarán dentro del mapa -->
</SisdaiMapa>
```

## Ejemplo

<EjemploConfiguracion />

<<< @/.vitepress/ejemplos/ConfiguracionBasica.vue

## Propiedades

#### `descripcion`

Descripción corta del mapa, la cual es visible en el modo solo texto y audible
con herramientas de lectura por voz.

- Tipo: `String`
- Valor por defecto: `'Mapa interactivo'`
- Reactivo: si

<div class="nota-contenedor">
  <p class="nota-titulo">Información:</p>
  <p class="nota">
    Esta propiedad hace uso del atributo `aria-describedby` para establecer una relación entre el mapa y el texto que lo describe.
  </p>
</div>

**Uso:**

```html
<SisdaiMapa descripcion="Descripción corta del mapa.">...</SisdaiMapa>
```

#### `escalaGrafica`

Define si se agrega la escala grafica en el mapa.

- Tipo: `Boolean`
- Valor por defecto: `true`
- Reactivo: si

**Uso:**

```html
<SisdaiMapa :escalaGrafica="true">...</SisdaiMapa>
```

#### `id`

Identificador único del mapa. Si no es definido se asignará un valor aleatorio.

- Tipo: `String`
- Valor por defecto: Texto aleatorio
- Reactivo: no

**Uso:**

```html
<SisdaiMapa id="identificador">...</SisdaiMapa>
```

#### `proyeccion`

Código de identificación SRS que define la proyección de la vista.

- Tipo: `String`
- Valor por defecto: `'EPSG:4326'` (Universal Transversal de Mercator)
- Reactivo: no

<div class="nota-contenedor">
  <p class="nota-titulo">Importante:</p>
  <p class="nota">
    Las coordenadas y capas que integre en el componente deben coincidir con la `proyeccion` definida en el mapa.
  </p>
</div>

**Uso:**

```html
<SisdaiMapa proyeccion="EPSG:3857">...</SisdaiMapa>
```

#### `vista`

Objeto que define la vista del mapa. Revisa los detalles de la vista en la
[sección vista](/documentacion/vista.html) de esta documentación.

- Tipo: `Object`
- Valor por defecto: `{ centro: [0, 0], acercamiento: 1.5 }`
- Reactivo: si

## Funciones ​

A continuación se describen las funciones que pueden modificar el estado del
mapa.

#### `exportarImagen`

Permite descargar la vista actual del mapa, con las capas visibles y
acercamiento mostrado en pantalla, sin controles. El formato de descargá es PNG.

**Parametros:**

- `String`: Nombre del archivo que se descargara del navegador (no debe incluir
  extensión).

**Uso:**

```js
import { ref } from 'vue'
const mapa = ref()
```

```vue
<SisdaiMapa ref="mapa">...</SisdaiMapa>

<button @click="mapa.exportarImagen('mapa-sisdai')">
  Exportar mapa como imagen
</button>
```
