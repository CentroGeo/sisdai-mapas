# Primeros pasos

## Importación y registro

En el archivo que se desee utilizar el componente:

```javascript
import Vue from 'vue'
import SisdaiMapas from 'sisdai-mapas'
Vue.use(SisdaiMapas)
```

Si se utiliza el componente sisdai-mapas en dos archivos o más, se recomienda registrar el componente en el archivo `src/main.js` del proyecto.

## Crear un mapa básico

Dentro del componente en el que se desee crear mapas con el diseño sisdai, usa la etiqueta `SisdaiMapa` dentro del `template` del HTML y agrega las capas y directivas que necesites:

Código:

```html
<template>
  <SisdaiMapa :vista="{ centro: [0, 0], zoom: 2 }">
    <SisdaiCapaXyz />
  </SisdaiMapa>
</template>
```

Resultado:

<mapa-Basico />
