<script setup>
import { ref } from 'vue'

const mapa = ref()
</script>

<template>
  <SisdaiMapa
    class="sin-cargador con-panel-pie-vis con-panel-encabezado-vis"
    ref="mapa"
    elementosDescriptivos="titulo-mapa descripcion-corta-mapa"
    proyeccion="EPSG:3857"
  >
    <template #panel-encabezado-vis>
      <div class="m-2">
        <p
          class="vis-titulo-visualizacion"
          id="titulo-mapa"
        >
          Ejemplo de la configuración del mapa.
        </p>

        <p id="descripcion-corta-mapa">
          Este mapa es un ejemplo de como configurar el mapa para tener un mapa
          adecuado a tus necesidades.
        </p>
      </div>
    </template>
    <SisdaiCapaXyz />

    <template #panel-pie-vis>
      <div class="m-1">
        <button
          class="boton-primario boton-chico"
          @click="mapa.exportarImagen('mapa-sisdai')"
        >
          Exportar mapa como imagen
        </button>
      </div>
    </template>
  </SisdaiMapa>
</template>
