<script setup>
import { dependencies, devDependencies } from '@centrogeomx/sisdai-mapas/package.json';
</script>

# Comienza

<div>
  El proyecto <b>sisdai-mapas</b> es una biblioteca de componentes de
  <SisdaiEnlaceExterno
    enlace="https://vuejs.org"
    texto="Vue.js"
  /> para generar mapas interactivos con datos georeferenciados y forma parte del
  Sistema de Diseño y Accesibilidad para la Investigación (<SisdaiEnlaceExterno
    enlace="https://sisdai.conahcyt.mx"
    texto="Sisdai"
  />). Está creada con <SisdaiEnlaceExterno
    enlace="https://vuejs.org"
    texto="Vue.js"
  /> (<code>{{ devDependencies.vue }}</code>) y <SisdaiEnlaceExterno
    enlace="https://openlayers.org"
    texto="OpenLayers"
  /> (<code>{{ dependencies.ol }}</code>).
</div>

## Requisitos para su uso

<div>
  Se recomienda utilizar Vue 3 y asegurarse de contar con el soporte para
  <SisdaiEnlaceExterno
    enlace="https://vuejs.org/api/composition-api-setup.html"
    texto="Composition API"
  />.
</div>
