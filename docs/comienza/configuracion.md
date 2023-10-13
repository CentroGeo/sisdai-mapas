<script setup>
import EjemploConfiguracion from "./../.vitepress/components/configuracion.vue";
</script>

# Configuración

## SisdaiMapa

El componente `SisdaiMapa` es el componente princial de esta librería. Dentro de el se pueden agregar componentes de capas, leyendas y slots de paneles.

**Uso:**

```html
<SisdaiMapa>
  <!-- Aquí van las capas, leyendas y slots de paneles que quedarán dentro del mapa -->
</SisdaiMapa>
```

## Propiedades

#### `elementosDescriptivos`

Recíbe los ID, separados por espacios, de los elementos que describen al mapa como título, descripciones cortas o largas.

- Tipo: `String`
- Valor por defecto: `''`
- Reactivo: ✅

> ℹ️ **Información:** Esta propiedad hace uso del atributo `aria-describedby` para establecer una relación entre el mapa y el texto que los describe.

**Uso:**

```html
<h2 id="titulo-mapa">Titulo del mapa.</h2>
<p id="descripcion-corta-mapa">Descripción corta del mapa.</p>

<SisdaiMapa elementosDescriptivos="titulo-mapa descripcion-corta-mapa">
  ...
</SisdaiMapa>
```

#### `escalaGrafica`

Define si se agrega la escala grafica en el mapa.

- Tipo: `Boolean`
- Valor por defecto: `true`
- Reactivo: ✅

**Uso:**

```html
<SisdaiMapa :escalaGrafica="<Boolean>"> ... </SisdaiMapa>
```

#### `id`

Identificador único del mapa. Si no es definido se asignará un valor aleatorio.

- Tipo: `String`
- Valor por defecto: Aleatorio
- Reactivo: ❌

**Uso:**

```html
<SisdaiMapa :id="<String>"> ... </SisdaiMapa>
```

#### `proyeccion`

Código de identificación SRS que define la proyección de la vista.

- Tipo: `String`
- Valor por defecto: `'EPSG:4326'`
- Reactivo: ❌

> ℹ️ **Información:** El valor predeterminado es Universal Transversal de Mercator.

> ⚠️ **Importante:** Las coordenadas y capas que integre en el componente deben coincidir con la `proyeccion` definida en el mapa.

**Uso:**

```html
<SisdaiMapa proyeccion="EPSG:3857"> ... </SisdaiMapa>
```

#### `vista`

Objeto que define la vista del mapa. Revisa los detalles de la vista en la [sección vista](/comienza/vista.html) de esta documentación.

- Tipo: `Object`
- Valor por defecto: `{ centro: [0, 0], zoom: 1.5 }`
- Reactivo: ✅

## Funciones ​

A continuación se describen las funciones que pueden modificar el estado del mapa.

#### `exportarImagen`

Permite descargar la vista actual del mapa, con las capas visibles y zoom mostrado en pantalla, sin controles. El formato de descargá es PNG.

**Parametros:**

- `String`: Nombre del archivo que se descargara del navegador (no debe incluir extensión).

**Uso:**

```js
import { ref } from 'vue'
const mapa = ref()
```

```html
<SisdaiMapa ref="mapa"> ... </SisdaiMapa>

<button @click="mapa.exportarImagen('mapa-sisdai')">
  Exportar mapa como imagen
</button>
```

## Ejemplo

<EjemploConfiguracion />

<<< @/.vitepress/components/configuracion.vue
