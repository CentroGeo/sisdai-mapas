<script setup>
import { valores } from '@centrogeomx/sisdai-mapas'
</script>

<template>
  <SisdaiMapa
    descripcion="Este mapa es un ejemplo simple de como configurar el mapa para ajustarlo conforme a las necesidades de cada proyecto."
    :vista="{ extension: valores.extensiones.nacional }"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">
        Ejemplo de la configuración del mapa
      </p>
      <p>
        Este mapa es un ejemplo simple de como configurar el mapa para ajustarlo
        conforme a las necesidades de cada proyecto
      </p>
    </template>

    <SisdaiCapaXyz />
  </SisdaiMapa>
</template>
