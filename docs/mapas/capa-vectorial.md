<script setup>
import CapaVectorial from "./../.vitepress/ejemplos/CapaVectorial.vue";
</script>

# Capa Vectorial

Las capas vectoriales permiten manipular su información de forma local, esto da
la posibilidad de pintar sus elementos de forma interactiva, incluso de
clasificarlos.

**Uso:**

```html{2}
<SisdaiMapa>
  <SisdaiCapaVectorial />
</SisdaiMapa>
```

## Vista general

<CapaVectorial />

<<< @/.vitepress/ejemplos/CapaVectorial.vue

## Propiedades

Hereda las propiedades definidas en la [sección capas](/mapas/capas.html) más
las siguientes:

### `formato`

Define el formato de los datos fuente, los valores admitidos son: 'geojson' y
'topojson'.

- Tipo: `String`
- Valor por defecto: `'geojson'`
- Reactivo: no

### `fuente`

Origen de la capa. Puede ser una url externa o relativa a las carpetas del
proyecto, e incluso un objeto en formato geojson o topojson con coordenadas y
atributos.

- Tipo: `String` o `Object`
- Valor obligatorio: si
- Reactivo: no

### `globoInformativo`

Contenido del globo de información que aparecerá al pasar el cursor sobre la
capa. Puede ser un texto estático o una función que accede a las propiedades del
elemento al que se sobrepone.

- Tipo: `String` o `Function`
- Valor por defecto: `undefined`
- Reactivo: si

<!-- ### `cuadroInformativo`

Contenido del cuadro de información que aparecerá al pasar el cursor sobre la capa. Puede ser un texto estático o una función que accede a las propiedades del elemento al que se sobrepone.

- Tipo: `String` o `Function`
- Valor por defecto: `undefined`
- Reactivo: si -->
