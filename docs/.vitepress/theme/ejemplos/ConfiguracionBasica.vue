<template>
  <SisdaiMapa
    descripcion="Este mapa es un ejemplo simple de como configurar el mapa para ajustarlo conforme a las necesidades de cada proyecto."
    :vista="{ extension: valores.extensiones.nacional }"
    @clickVista="clickVista"
    @clickCentrar="clickCentrar"
    @alMoverVista="alMoverVista"
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

<script setup>
import { valores } from '@centrogeomx/sisdai-mapas'

function alMoverVista(vista) {
  console.log('alMoverVista:', vista)
}

function clickCentrar() {
  console.log('clickCentrar')
}

function clickVista(coordenadas) {
  console.log('clickVista', coordenadas)
}
</script>
