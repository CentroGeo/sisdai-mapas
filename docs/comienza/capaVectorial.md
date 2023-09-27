<script setup>
import CapasVectoriales from "./../.vitepress/components/capas/vectoriales.vue";
</script>

# Capa Vectorial

Las capas vectoriales nos permiten manipular su información de forma local, esto nos da la posibilidad de pintar sus elementos de forma interactiva, incluso de clasificarlos.

**Uso:**

```html{2}
<SisdaiMapa>
  <SisdaiCapaVectorial />
</SisdaiMapa>
```

## Propiedades

Hereda las propiedades definidas en la sección Capas más las siguientes:

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

#### `globoInformativo`

Contenido del globo de información que aparecerá al pasar el cursor sobre la capa. Puede ser un texto estático o una función que accede a las propiedades del elemento al que se sobrepone.

- Tipo: `String` o `Function`
- Valor por defecto: `undefined`.
- Interactivo: ✅

## Ejemplo

<CapasVectoriales />

<<< @/.vitepress/components/capas/vectoriales.vue
