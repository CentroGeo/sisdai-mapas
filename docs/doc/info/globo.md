# Globo de información

Muestra la información de una capa vectorial en dentro de un tooltip, el texto a mostrar es configurable.


## Uso

```html
<SisdaiCapaGeojson
  globoInformativo="Contenido del globo informativo"
  ...
/>
```

## Parámetros

- __Texto:__ El texto (string) que se defina como parámetro se mostrará en toda la capa que se asigne sin interactividad.
- __Función:__ Permite obtener la información del elemento de la capa al que señala el cursor por medio de una función. Esta función tiene como parámetro las propiedades de dicho elemento, la estructura de sus es el siguiente: 
```javascript
(f) => `Propiedad de la capa: ${f['nombre_propiedad']}
```
- __HTML:__ Define elementos html dentro del globo de información utilizando etiquetas nativas de html. Se recomienda no utilizar elementos de formulario dentro del globo (`input`, `textarea`, `select`, etc).

## Ejemplo

<info-Globo />

```html
<script setup>
import edos from './../../capas/ejemplo-edos.json'

const contenidoGloboInformativo = feature => `Estdo: <b>${feature.nom_edo}</b>`
</script>

<template>
  <SisdaiMapa :vista="{ centro: [-102, 24], zoom: 4.5 }">
    <SisdaiCapaXyz />

    <SisdaiCapaGeojson
      :datos="edos"
      :zIndex="1"
      :globoInformativo="contenidoGloboInformativo"
    />
  </SisdaiMapa>
</template>

```