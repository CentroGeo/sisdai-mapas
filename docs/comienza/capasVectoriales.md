<script setup>
import CapasVectoriales from "./../.vitepress/components/capas/vectoriales.vue";
</script>

# Capas Vectoriales

## Propiedades

Hereda las propiedades definidad en la sección Capas más las siguientes:

#### `formato`

Define el formato de los datos fuente, los valores admitidos son: 'geojson' y 'topojson'.

- Tipo: `String`
- Valor por defecto: `'geojson'`.
- Interactivo: ❌

#### `fuente`

Origen de la capa. Puede ser una url externa o relativa a las carpetas del proyecto, e incluso un objeto en formato geojson o topojson con coordenadas y atributos.

- Tipo: `String` o `Object`
- Valor obligatorio.
- Interactivo: ✅

<CapasVectoriales />

<<< @/.vitepress/components/capas/vectoriales.vue
