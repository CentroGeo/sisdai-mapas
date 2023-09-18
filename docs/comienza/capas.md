<script setup>
import CapasVectoriales from "./../.vitepress/components/capas/vectoriales.vue";
</script>

# Capas

## Propiedades

#### `id`

Identificador único de la capa. Si no es detectado, se asignará una cadena de texto aleatorea. Para hacer uso de la leyenda esta propiedad pasa a ser obligatoria.

- Tipo: `String`
- Valor por defecto: Aleatorio
- Interactivo: ❌

#### `nombre`

Nombre de la capa que aparecerá en el control de la leyenda.

- Tipo: `String`
- Valor por defecto: `'Nombre no asignado'`.
- Interactivo: ✅

#### `opacidad`

Un valor que va de 0 a 1, para indicar la opacidad de la capa. 0 es totalmente invisible y 1 es la opacidad completa.

- Tipo: `Number`
- Valor por defecto: `1`
- Interactivo: ✅

#### `posicion`

Indica la posición respecto a otras capas. Las capas con un valor mayor en este parámetro se mostrarán enfrente.

- Tipo: `Number`
- Valor por defecto: `undefined`
- Interactivo: ✅

#### `visible`

Visibilidad de la capa.

- Tipo: `Boolean`
- Valor por defecto: `true`
- Interactivo: ✅

### Vectoriales

Las capas vectoriales nos permiten manipular su información de forma local, esto nos dá la posibilidad de pintar sus elementos de forma interactiva, incluso de clasificarlos.

<CapasVectoriales />

<!-- <<< @/.vitepress/components/capas/vectoriales.vue -->

### WMS

Componenete para desplegar capas desde servicios wms publicos o privados.

### XYZ

Capa de mosaicos xyz, consume servicios que dentro del ulr incluyen el nivel de zoom y la coordenada x/y de una imagen (mosaico), regularmente se usa para desplegar mapas base como los de OSM, ESRI, etc.
