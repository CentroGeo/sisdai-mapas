<script setup>
import { ref } from 'vue'

const mapa = ref()
</script>

<template>
  <SisdaiMapa
    ref="mapa"
    descripcion="Este mapa es un ejemplo simple de como configurar el mapa para ajustarlo conforme a las necesidades de cada proyecto."
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">
        Ejemplo de la configuración del mapa.
      </p>

      <p>
        Este mapa es un ejemplo simple de como configurar el mapa para ajustarlo
        conforme a las necesidades de cada proyecto.
      </p>
    </template>

    <SisdaiCapaXyz />

    <template #panel-pie-vis>
      <button
        class="boton-primario boton-chico"
        @click="mapa.exportarImagen('mapa-sisdai')"
      >
        Exportar mapa como imagen
      </button>
    </template>
  </SisdaiMapa>
</template>
