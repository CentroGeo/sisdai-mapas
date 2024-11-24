<script setup>
import { ref } from 'vue'
const mapa = ref()
</script>

<template>
  <SisdaiMapa
    descripcion="Este mapa es un ejemplo de como configurar la vista del mapa para ajustarlo conforme a las necesidades de cada proyecto."
    ref="mapa"
    :vista="{ extension: '-118.3651,14.5321,-86.7104,32.7187' }"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">
        Ejemplo de la configuración de la vista del mapa
      </p>
    </template>

    <SisdaiCapaXyz />

    <template #panel-pie-vis>
      <div class="flex flex-contenido-equidistante">
        <button
          class="boton-primario boton-chico"
          @click="mapa.ajustarVista({ centro: '-115.0969,30.5499', acercamiento: 6.3 })"
        >
          Ajustar vista en Baja California
        </button>

        <button class="boton-primario boton-chico" @click="mapa.ajustarVista({ extension: [-92.3263, 19.5512, -87.5331, 22.586] })">
          Ajustar vista a Yucatán con extensión
        </button>

        <button class="boton-primario boton-chico" @click="mapa.ajustarVista({ extensionMargen: 50 })">
          Ajustar vista definida en el mapa con margen 50
        </button>
      </div>
    </template>
  </SisdaiMapa>
</template>
