# Vectoriales

Las capas vectoriales nos permiten manipular su información de forma local, esto nos dá la posibilidad de pintar sus elementos de forma interactiva, incluso de clasificarlos.

> ⚠️ **Importante:** El uso excesivo de capas vectoriales en un solo mapa puede puede perjudicar el rendimiento de la página web.

## Propiedades

#### `estilo`

- Tipo: `Object`
- Valor por defecto: `{ relleno: { color: 'gray', }, contorno: { color: 'white', grosor: 1, }, radio: 7 }`
- Interactivo: ✅

Esta propiedad permite asignar un estilo a los elementos de la copa. Las propiedades que no sean definidas serán ignoradas.

#### `clasificacion`

- Tipo: `Object`
- Valor por defecto: `undefined`
- Interactivo: ✅

## Estilo interactivo

<capas-ColoresInteractivos />

```html{14-26}
<script setup>
import { ref } from 'vue'
import edos from './../../capas/ejemplo-edos.json'

const colores = ['no', 'red', 'white', 'black', 'gray']

const colorContorno = ref('white')
const colorRelleno = ref('gray')
const grosor = ref(1)
</script>

<template>
  <sisdai-mapa :vista="{ centro: [-102, 24], zoom: 4.5 }">
    <sisdai-capa-geojson
      id="capa-color"
      nombre="Capa con color interactivo"
      :datos="edos"
      :zIndex="1"
      :estilo="{
        contorno:
          colorContorno !== 'no'
            ? { color: colorContorno, grosor: grosor }
            : colorContorno,
        relleno: colorRelleno !== 'no' ? { color: colorRelleno } : colorRelleno,
      }"
    />

    <sisdai-mapa-encabezado>
      Interacón del estilo de una capa vectorial: <br />
      <div class="horizontal">
        Relleno:
        <select v-model="colorRelleno">
          <option
            v-for="(valor, idx) in colores"
            :key="`relleno_${idx}`"
            :value="valor"
          >
            {{ valor }}
          </option>
        </select>

        Contorno:
        <select v-model="colorContorno">
          <option
            v-for="(valor, idx) in colores"
            :key="`contorno_${idx}`"
            :value="valor"
          >
            {{ valor }}
          </option>
        </select>
      </div>

      <span class="horizontal">
        Grosor
        <input
          type="range"
          min="0"
          max="10"
          step=".5"
          v-model="grosor"
        />
        {{ grosor }}
      </span>
      <hr />

      <sisdai-mapa-leyenda para="capa-color" />
    </sisdai-mapa-encabezado>

    <sisdai-capa-xyz :zIndex="0" />
  </sisdai-mapa>
</template>
```
