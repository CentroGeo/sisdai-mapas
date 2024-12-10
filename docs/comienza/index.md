<script setup>
import MapaBasico from "./../.vitepress/ejemplos/MapaBasico.vue";
import { dependencies, version } from './../../package.json'
</script>

# sisdai-mapas

**sisdai-mapas** es una biblioteca de componentes de
[Vue.js](https://vuejs.org/) para generar mapas interactivos con datos
georeferenciados. Está creada con [Vue.js](https://vuejs.org/) y la versión
`{{ dependencies.ol.replace('^', '') }}` de
[OpenLayers](https://openlayers.org/).

## Requisitos para su uso

Se recomienda utilizar Vue 3 o superior y asegurarse de contar con el soporte
para [Composition API](https://vuejs.org/api/composition-api-setup.html).
