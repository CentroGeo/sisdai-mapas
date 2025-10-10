<script setup>
import { valores } from '@centrogeomx/sisdai-mapas'
</script>

<template>
  <SisdaiMapa :vista="{ extension: valores.extensiones.nacional }">
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">
        Navegación de los elementos en la vista
      </p>

      <p>
        Acciona el botón "Navegación por teclado" para visualizar las
        instrucciones de naveación del mapa.
      </p>
    </template>

    <SisdaiCapaXyz />
  </SisdaiMapa>
</template>
